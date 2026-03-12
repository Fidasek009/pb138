# Project Overview

Bun + Turborepo monorepo (PB138). Four workspaces: `apps/api`, `apps/web`, `packages/shared`, `packages/widget`.

## Commands

```bash
bun install                # install deps
bun run dev                # all workspaces
bun run dev:web            # web only
bun run dev:api            # api only
bun run build              # build all (turbo handles dependency order)
bun run check              # biome check via turbo
bun run format             # biome format --write
bun run type-check         # tsc --noEmit via turbo
bun run test               # tests via turbo

# single workspace tests
cd apps/api && bun test src/index.test.ts
```

## Key Non-Obvious Details

- **Bun only** — never use npm/yarn/pnpm.
- **`packages/shared` must build before dependents** — turbo handles this, but if you run a workspace directly and get import errors from `shared`, build it first with `cd packages/shared && bun run build`.
- **Pre-commit hook** runs `bun run check` (Biome). Commit-msg hook runs commitlint.
- **Biome formatting:** tabs, double quotes. Enforced automatically — don't override.
- **`verbatimModuleSyntax`** is enabled — use `import type` for type-only imports.
- **Commit format:** conventional commits (`type(scope): subject`), max 100 char header, no trailing period.
- **Documentation:** inside `docs/`, markdown files, mermaid diagrams. Keep it up to date with code changes.
