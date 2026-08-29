import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const { name, email, phone, message, destination, package: packageName, purpose, website } = await request.json();
  if (website) return NextResponse.json({ ok: true });
  if (!name || !email || !message) return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 });
  if ((destination || packageName) && !purpose) return NextResponse.json({ error: 'Please select your purpose before submitting.' }, { status: 400 });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });
  const details = [`Name: ${name}`, `Email: ${email}`, `WhatsApp Number: ${phone || 'Not provided'}`, destination ? `Destination: ${destination}` : null, packageName ? `Package: ${packageName}` : null, purpose ? `Purpose: ${purpose}` : null, '', 'Message:', message].filter(Boolean).join('\n');
  try {
    await new Resend(process.env.RESEND_API_KEY).emails.send({ from: 'Risosoo Website <onboarding@resend.dev>', to: process.env.CONTACT_TO_EMAIL, replyTo: email, subject: `New Risosoo enquiry from ${name}`, text: details });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to send your enquiry.' }, { status: 500 });
  }
}
