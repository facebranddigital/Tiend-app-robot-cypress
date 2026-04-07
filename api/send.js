import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'facebranddigital@gmail.com', // <--- PON TU CORREO AQUÍ
      subject: 'Reporte Robot Cypress',
      html: '<strong>Envío exitoso desde la raíz de la API</strong>'
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
