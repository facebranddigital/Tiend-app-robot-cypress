const { Resend } = require('resend');
const axios = require('axios');

// Configuración de las llaves (Vercel las toma de Environment Variables)
const resend = new Resend(process.env.RESEND_API_KEY);
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

export default async function handler(req, res) {
  // 1. RUTA PRINCIPAL (Lo que se ve al entrar al link)
  if (req.method === 'GET') {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Face Brand Digital - API</title>
          <style>
              body { font-family: 'Segoe UI', sans-serif; background-color: #f4f7f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
              .card { text-align: center; background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-top: 5px solid #00a884; max-width: 400px; }
              h1 { color: #00a884; margin: 0 0 10px 0; }
              p { color: #666; font-size: 1.1rem; margin-bottom: 20px; }
              .status { display: inline-block; padding: 8px 15px; background: #e8f5e9; color: #2e7d32; border-radius: 20px; font-weight: bold; font-size: 0.9rem; }
          </style>
      </head>
      <body>
          <div class="card">
              <h1>Face Brand Digital 🚀</h1>
              <p>Servidor de Automatización QA & Sincronización</p>
              <div class="status">● Sistema Operativo en Cali</div>
          </div>
      </body>
      </html>
    `);
  }

  // 2. RUTA DE REGISTRO (POST /api/sync-hubspot)
  if (req.method === 'POST') {
    const { email, nombre, apellido } = req.body;

    try {
      console.log("--- INICIANDO PROCESO ---");

      // A. SINCRONIZACIÓN CON HUBSPOT
      await axios.post(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        {
          properties: {
            email: email,
            firstname: nombre,
            lastname: apellido,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Token HubSpot: ✅ OK");

      // B. ENVÍO DE EMAIL ELEGANTE CON RESEND
      await resend.emails.send({
        from: 'Face Brand Digital <onboarding@resend.dev>',
        to: email,
        subject: `¡Bienvenido(a) a Face Brand Digital, ${nombre}! 🚀`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #00a884; padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0;">¡Hola, ${nombre}!</h1>
            </div>
            <div style="padding: 30px; color: #333; line-height: 1.6;">
              <h2 style="color: #00a884;">¡Tu registro fue exitoso!</h2>
              <p>Es un gusto saludarte. Te confirmamos que hemos recibido tus datos y el proceso de sincronización con nuestro CRM ha finalizado correctamente.</p>
              <p><strong>Detalles del registro:</strong></p>
              <ul style="list-style: none; padding: 0;">
                <li>✅ <strong>Nombre:</strong> ${nombre} ${apellido}</li>
                <li>✅ <strong>Estado:</strong> Sincronizado en HubSpot</li>
              </ul>
              <p>Pronto un miembro de nuestro equipo se pondrá en contacto contigo.</p>
              <br>
              <p>Saludos desde Cali,<br><strong>Equipo Face Brand Digital</strong></p>
            </div>
            <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #999;">
              © 2026 Face Brand Digital - Automatización QA.
            </div>
          </div>
        `
      });
      console.log("Key Resend: ✅ OK");

      return res.status(200).json({ success: true, message: "Contacto sincronizado y email enviado" });

    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // Si no es GET ni POST
  return res.status(405).json({ message: "Método no permitido" });
}
