import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const brand = { navy: '#0A1B3D', gold: '#D4A537', cream: '#F7F5F0', ink: '#1B2433' };

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function detailRow(label: string, value: string) {
  return `<tr><td style="width:38%;padding:13px 16px;border-bottom:1px solid #E8E5DE;color:#6B7280;font-family:Arial,sans-serif;font-size:13px;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:13px 16px;border-bottom:1px solid #E8E5DE;color:${brand.ink};font-family:Arial,sans-serif;font-size:14px;line-height:20px;vertical-align:top;">${escapeHtml(value)}</td></tr>`;
}

function enquiryEmailHtml({ name, email, phone, message, destination, packageName, purpose }: { name: string; email: string; phone?: string; message: string; destination?: string; packageName?: string; purpose?: string }) {
  const travelDetail = destination ? detailRow('Destination', destination) : packageName ? detailRow('Holiday package', packageName) : '';
  const purposeDetail = purpose ? detailRow('Purpose', purpose) : '';
  return `<!doctype html><html lang="en"><body style="margin:0;padding:0;background-color:${brand.cream};"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${brand.cream};"><tr><td align="center" style="padding:32px 16px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;"><tr><td style="padding:26px 32px;background-color:${brand.navy};"><p style="margin:0;color:${brand.gold};font-family:Georgia,serif;font-size:26px;font-weight:700;">Risosoo Travels</p><p style="margin:6px 0 0;color:#FFFFFF;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;">International Travel Guidance</p></td></tr><tr><td style="padding:32px;"><h1 style="margin:0 0 10px;color:${brand.navy};font-family:Georgia,serif;font-size:30px;font-weight:400;">New Enquiry Received</h1><p style="margin:0 0 26px;color:#6B7280;font-family:Arial,sans-serif;font-size:14px;line-height:22px;">A visitor has submitted an enquiry through the Risosoo Travels website.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #E8E5DE;border-radius:10px;overflow:hidden;">${detailRow('Name', name)}${detailRow('Email', email)}${detailRow('WhatsApp Number', phone || 'Not provided')}${travelDetail}${purposeDetail}</table><p style="margin:28px 0 10px;color:${brand.navy};font-family:Arial,sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Message</p><div style="padding:18px;background-color:${brand.cream};border-left:4px solid ${brand.gold};color:${brand.ink};font-family:Arial,sans-serif;font-size:14px;line-height:22px;white-space:pre-wrap;">${escapeHtml(message)}</div></td></tr><tr><td style="padding:20px 32px;background-color:${brand.navy};"><p style="margin:0;color:#C7CFDD;font-family:Arial,sans-serif;font-size:12px;line-height:18px;">Sent from the Risosoo Travels website.</p></td></tr></table></td></tr></table></body></html>`;
}

export async function POST(request: Request) {
  const { name, email, phone, message, destination, package: packageName, purpose, website } = await request.json();
  if (website) return NextResponse.json({ ok: true });
  if (!name || !email || !message) return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 });
  if ((destination || packageName) && !purpose) return NextResponse.json({ error: 'Please select your purpose before submitting.' }, { status: 400 });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 });
  const text = [`Name: ${name}`, `Email: ${email}`, `WhatsApp Number: ${phone || 'Not provided'}`, destination ? `Destination: ${destination}` : null, packageName ? `Package: ${packageName}` : null, purpose ? `Purpose: ${purpose}` : null, '', 'Message:', message].filter(Boolean).join('\n');
  try {
    await new Resend(process.env.RESEND_API_KEY).emails.send({ from: 'Risosoo Website <onboarding@resend.dev>', to: process.env.CONTACT_TO_EMAIL, replyTo: email, subject: `New Risosoo enquiry from ${name}`, text, html: enquiryEmailHtml({ name, email, phone, message, destination, packageName, purpose }) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to send your enquiry.' }, { status: 500 });
  }
}
