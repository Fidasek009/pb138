import { Resend } from "resend";
import {
	passwordResetEmailTemplate,
	quotaAlertEmailTemplate,
	verificationEmailTemplate,
} from "./templates";

const FROM = "onboarding@resend.dev";

function createClient(): Resend {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		throw new Error("RESEND_API_KEY environment variable is not set");
	}
	return new Resend(apiKey);
}

async function send(to: string, subject: string, html: string): Promise<void> {
	const resend = createClient();
	const { error } = await resend.emails.send({ from: FROM, to, subject, html });
	if (error) {
		throw new Error(`Failed to send email to ${to}: ${error.message}`);
	}
}

export async function sendVerificationEmail(
	to: string,
	token: string,
): Promise<void> {
	const { subject, html } = verificationEmailTemplate(token);
	await send(to, subject, html);
}

export async function sendPasswordResetEmail(
	to: string,
	token: string,
): Promise<void> {
	const { subject, html } = passwordResetEmailTemplate(token);
	await send(to, subject, html);
}

export async function sendQuotaAlertEmail(
	to: string,
	usagePercent: number,
): Promise<void> {
	const { subject, html } = quotaAlertEmailTemplate(usagePercent);
	await send(to, subject, html);
}
