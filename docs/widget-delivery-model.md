# Widget Delivery Model

## Overview

This document captures the architecture for how our AI agent widget is delivered to client web apps, how requests are authenticated and routed, and how usage is tracked for billing.

---

## Delivery

The widget is published as an npm package and consumed as a React component.

```bash
npm install @pagepal/widget
```

```jsx
import { AIWidget } from '@pagepal/widget'

<AIWidget
  projectKey="pk_live_abc123xyz"
  userId="user_789"
/>
```

- `projectKey` — identifies which client (developer) owns this deployment. Issued when the client signs up on our platform. Safe to include in frontend code.
- `userId` — the end user's ID within the client's own app. Passed by the client so we can attribute usage to individual users and report back to the client.

---

## Request Flow

```
👤 End User types a message
        ↓
🧩 Widget (running in client's browser)
   Sends: { projectKey, userId, message }
        ↓
🔀 Our Backend (api.pagepal.com/chat)
   1. Validate projectKey → identify client
   2. Check client's plan and quota
   3. Log usage (clientId, userId, tokens, timestamp)
   4. Forward request to AI provider using OUR secret key
        ↓
🤖 AI Provider (OpenAI / Anthropic / etc.)
        ↓
🔀 Our Backend
   Returns AI response to widget
        ↓
🧩 Widget displays response to end user
```

The AI provider API key never leaves our backend. Clients never see it, and it is never embedded in the widget.

---

## Data Model

### clients
| field | type | description |
|---|---|---|
| id | uuid | internal ID |
| name | string | company or developer name |
| projectKey | string | public key issued at signup (`pk_live_...`) |
| secretKey | string | server-side key for dashboard API (`sk_live_...`) |
| plan | enum | `starter`, `pro`, `enterprise` |
| status | enum | `active`, `suspended` |

### usage_logs
| field | type | description |
|---|---|---|
| id | uuid | internal ID |
| clientId | uuid | references clients.id |
| userId | string | end user ID passed by client |
| tokens | int | tokens consumed |
| estimatedCost | decimal | cost in USD |
| timestamp | datetime | when the request occurred |

### billing_periods
| field | type | description |
|---|---|---|
| clientId | uuid | references clients.id |
| month | string | e.g. `2026-03` |
| totalMessages | int | total requests in period |
| totalCost | decimal | total cost in USD |
| invoiced | boolean | whether invoice has been issued |

---

## Billing Logic

- We bill the **client** (the developer), not the end user.
- Usage is tracked per `projectKey` and broken down by `userId`.
- At the end of each billing period, we roll up `usage_logs` into `billing_periods` and generate an invoice.
- Clients can view their own usage breakdown (including per-user) in our dashboard.

---

## Security Considerations

### ✅ What is safe
- `projectKey` is a **public identifier** — it is fine to be visible in frontend code, the same way Stripe's publishable key or a Google Maps API key is.
- All sensitive AI provider keys live **only on our backend** and are never exposed.

### ⚠️ Risks and mitigations

**1. projectKey abuse (most critical)**

Anyone who sees a client's `projectKey` in the browser can copy it and send requests to our API on the client's behalf, running up their usage bill.

Mitigations:
- **Domain allowlisting** — clients register which domains are allowed to use their `projectKey`. Our backend rejects requests where the `Origin` header does not match.
- **Rate limiting** — per-project and per-userId limits to cap abuse impact.
- **Anomaly alerts** — flag unusual spikes in usage and notify the client.

**2. userId spoofing**

The client controls what `userId` they pass into the widget. A malicious end user could not spoof this themselves, but a poorly implemented client might expose gaps. This is the client's responsibility — we document it clearly.

**3. Message injection / prompt injection**

End users may try to manipulate the AI via crafted messages.

Mitigations:
- Input validation and length limits on our backend before forwarding to the AI provider.
- System prompt is set server-side by us (and optionally by the client), not by the end user.

**4. Data privacy**

End user messages pass through our backend before reaching the AI provider.

Mitigations:
- Document clearly in our privacy policy and client contracts what we log and for how long.
- Offer a no-log mode for enterprise clients if needed.
- Consider whether messages need to be stored at all — for billing we only need token counts, not message content.

**5. Transport security**

- All communication between widget and our backend must be over **HTTPS only**.
- Set `Strict-Transport-Security` headers on our API.

---

## Key Separation

| Key | Held by | Exposed in browser | Purpose |
|---|---|---|---|
| AI provider API key | Us (backend only) | Never | Call OpenAI / Anthropic |
| `pk_live_...` (projectKey) | Client | Yes — in React component | Identify client in widget requests |
| `sk_live_...` (secretKey) | Client (server-side) | Never | Client's server-to-server calls to our dashboard API |
