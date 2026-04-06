import { Client } from '@hubspot/api-client';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // LOGS INICIALES PARA VER EN TU TERMINAL DE UBUNTU
  console.log("--- INICIANDO PROCESO ---");
  console.log("Token HubSpot:", process.env.HUBSPOT_ACCESS_TOKEN ? "✅ OK" : "❌ FALTA");
  console.log("Key Resend:", process.env.RESEND_API_KEY ? "✅ OK" : "❌ FALTA");

  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const { email, nombre, apellido } = req.body;

    const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. HubSpot
    const hResponse = await hubspotClient.crm.contacts.basicApi.create({
      properties: { email, firstname: nombre, lastname: apellido }
    });
    console.log("HubSpot OK:", hResponse.id);

    // 2. Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Test Cali',
      html: `<h1>Hola ${nombre}</h1>`
    });
    console.log("Resend OK");

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("ERROR DETECTADO:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
