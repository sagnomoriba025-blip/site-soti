// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { client_name, client_email, subject, message } = body;

    // Check if Resend is properly configured. If not, log it and simulate success.
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_resend_api_key') {
      console.warn('Resend API key is not configured. Simulating successful email send.');
      return NextResponse.json({ success: true, simulated: true });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.NOTIFICATION_RECEIVER_EMAIL || 'sotiguineepro@gmail.com';

    // Trigger email send
    const { data, error } = await resend.emails.send({
      from: `SoTI Contact <${fromEmail}>`,
      to: toEmail,
      subject: `[Nouveau Message SoTI] ${client_name} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0A2540; border-bottom: 2px solid #10B981; padding-bottom: 10px;">Nouveau Message de Contact</h2>
          <p style="font-size: 14px; color: #475569;">Une demande d'information ou de contact a été envoyée via le site web officiel de SoTI.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; width: 45%;">Nom / Expéditeur</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${client_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">E-mail</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${client_email}">${client_email}</a></td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Sujet</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #0A2540;">${subject}</td>
            </tr>
          </table>

          <h3 style="color: #0A2540; font-size: 16px;">Contenu du Message</h3>
          <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #10B981; border-radius: 4px; font-size: 13px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">
            ${message}
          </div>

          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            Ce message a été généré automatiquement par le serveur de messagerie SoTI.
            <br />
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/dashboard" style="color: #2563EB; font-weight: bold; text-decoration: none; margin-top: 10px; display: inline-block;">Accéder au Dashboard Admin</a>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error from Resend service:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('Server error inside contact API route:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
