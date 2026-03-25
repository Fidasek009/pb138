// Matches the CLIENT entity in the ERD
export type Client = {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	balanceUsd: number;
	monthlyUsageLimit: number;
	lastActive: Date | null;
	createdAt: Date;
};

// Not in the ERD — transient storage for unverified registrations.
// A CLIENT record is only created after email verification, so no verified flag is needed.
export type PendingRegistration = {
	token: string;
	name: string;
	email: string;
	passwordHash: string;
	expiresAt: Date;
};

export interface IAuthRepository {
	findClientByEmail(email: string): Promise<Client | null>;
	findClientById(id: string): Promise<Client | null>;
	// TODO: enforce a unique index on clients.email in the DB migration
	// so the DB itself rejects duplicates and throws EMAIL_TAKEN on conflict.
	createClient(
		data: Pick<Client, "name" | "email" | "passwordHash">,
	): Promise<Client>;
	updateLastActive(clientId: string): Promise<void>;
	// Overwrites any existing pending registration for the same email
	savePendingRegistration(record: PendingRegistration): Promise<void>;
	// Atomically claims and removes the pending registration for the given token.
	// Throws EMAIL_TAKEN if the token does not exist.
	// Implementations MUST make this a single atomic operation (e.g., a DB transaction
	// with SELECT ... FOR UPDATE) so concurrent calls with the same token can only
	// succeed once — the second caller must get INVALID_TOKEN.
	consumePendingRegistration(token: string): Promise<PendingRegistration>;
}

// TODO: replace InMemoryAuthRepository with a DrizzleAuthRepository that reads/writes
// the CLIENT and a pending_registrations table (or equivalent) from packages/db.
export class InMemoryAuthRepository implements IAuthRepository {
	private clients = new Map<string, Client>();
	private pendingRegistrations = new Map<string, PendingRegistration>();

	async findClientByEmail(email: string): Promise<Client | null> {
		for (const client of this.clients.values()) {
			if (client.email === email) return client;
		}
		return null;
	}

	async findClientById(id: string): Promise<Client | null> {
		return this.clients.get(id) ?? null;
	}

	async createClient(
		data: Pick<Client, "name" | "email" | "passwordHash">,
	): Promise<Client> {
		for (const client of this.clients.values()) {
			if (client.email === data.email) throw new Error("EMAIL_TAKEN");
		}
		const client: Client = {
			...data,
			id: crypto.randomUUID(),
			balanceUsd: 0,
			monthlyUsageLimit: 0,
			lastActive: null,
			createdAt: new Date(),
		};
		this.clients.set(client.id, client);
		return client;
	}

	async updateLastActive(clientId: string): Promise<void> {
		const client = this.clients.get(clientId);
		if (client)
			this.clients.set(clientId, { ...client, lastActive: new Date() });
	}

	async savePendingRegistration(record: PendingRegistration): Promise<void> {
		// Remove any existing pending entry for the same email before saving
		for (const [token, pending] of this.pendingRegistrations.entries()) {
			if (pending.email === record.email) {
				this.pendingRegistrations.delete(token);
				break;
			}
		}
		this.pendingRegistrations.set(record.token, record);
	}

	// Safe in this single-threaded implementation because there are no await points
	// between the get and delete — the two operations are effectively atomic.
	async consumePendingRegistration(
		token: string,
	): Promise<PendingRegistration> {
		const record = this.pendingRegistrations.get(token);
		if (!record) throw new Error("INVALID_TOKEN");
		this.pendingRegistrations.delete(token);
		return record;
	}
}
