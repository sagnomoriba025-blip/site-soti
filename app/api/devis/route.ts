// app/api/devis/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      client_name,
      client_email,
      client_phone,
      company_name,
      client_type,
      service_requested,
      project_description,
      budget_estimate,
    } = body;

    // Check if Resend is properly configured. If not, log it and simulate success.
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_resend_api_key') {
      console.warn('Resend API key is not configured. Simulating successful email send.');
      return NextResponse.json({ success: true, simulated: true });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.NOTIFICATION_RECEIVER_EMAIL || 'sotiguineepro@gmail.com';

    // Trigger email send
    const { data, error } = await resend.emails.send({
      from: `SoTI Site Web <${fromEmail}>`,
      to: toEmail,
      subject: `[Nouveau Devis SoTI] ${client_name} - ${service_requested}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0A2540; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">Nouveau Devis Reçu</h2>
          <p style="font-size: 14px; color: #475569;">Une nouvelle demande d'ingénierie a été soumise sur le site web officiel de SoTI.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; width: 40%;">Nom du Client</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${client_name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">E-mail</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${client_email}">${client_email}</a></td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Téléphone</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="tel:${client_phone}">${client_phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Entreprise</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${company_name || 'Non spécifié'}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Type d'Entité</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${client_type}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Service Demandé</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; color: #2563EB; font-weight: bold;">${service_requested}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Enveloppe Budget</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${budget_estimate || 'Non spécifié'}</td>
            </tr>
          </table>

          <h3 style="color: #0A2540; font-size: 16px;">Description du Projet</h3>
          <div style="background-color: #f1f5f9; padding: 15px; border-left: 4px solid #2563EB; border-radius: 4px; font-size: 13px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">
            ${project_description}
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
    console.error('Server error inside API route:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
