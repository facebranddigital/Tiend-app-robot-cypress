const { Resend } = require('resend');
const axios = require('axios');

const resend = new Resend(process.env.RESEND_API_KEY);
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

export default async function handler(req, res) {
  
  // --- ESTO ES LO QUE QUITA EL "API SERVER RUNNING" ---
  if (req.method === 'GET') {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Face Brand Digital | API</title>
          <style>
              body { font-family: 'Segoe UI', sans-serif; background: #f4f7f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
              .card { text-align: center; background: white; padding: 50px; border-radius: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border-top: 8px solid #00a884; }
              h1 { color: #00a884; font-size: 2.5rem; margin: 0; }
              p { color: #555; font-size: 1.2rem; margin: 10px 0 25px; }
              .status-ready { display: inline-block; padding: 10px 20px; background: #e8f5e9; color: #2e7d32; border-radius: 50px; font-weight: bold; }
          </style>
      </head>
      <body>
          <div class="card">
              <h1>Face Brand Digital 🚀</h1>
              <p>Robot de Automatización QA & CRM</p>
              <div class="status-ready">● SERVIDOR OPERATIVO EN CALI</div>
          </div>
      </body>
      </html>
    `);
  }

  // --- LÓGICA DEL REGISTRO (POST) ---
  if (req.method === 'POST') {
    const { email, nombre, apellido } = req.body;
    try {
      await axios.post('https://api.hubapi.com/crm/v3/objects/contacts', 
        { properties: { email: email, firstname: nombre, lastname: apellido } },
        { headers: { Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`, 'Content-Type': 'application/json' } }
      );

      await resend.emails.send({
        from: 'Face Brand Digital <onboarding@resend.dev>',
        to: email,
        subject: `¡Bienvenido(a) a la familia, ${nombre}! 🚀`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 15px; overflow: hidden;">
            <div style="background: #00a884; padding: 30px; text-align: center; color: white;">
              <h1 style="margin:0;">¡Registro Exitoso!</h1>
            </div>
            <div style="padding: 30px; color: #333; line-height: 1.6;">
              <p>Hola <strong>${nombre}</strong>,</p>
              <p>Tu contacto ha sido sincronizado correctamente con nuestro sistema de Face Brand Digital.</p>
              <br>
              <p>Saludos,<br><strong>Equipo Face Brand Digital</strong></p>
            </div>
          </div>`
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(error.response?.status || 500).json({ success: false, error: error.message });
    }
  }
}
