import { resend } from '../lib/resend';

export default async function handler(req, res) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'tu-correo@ejemplo.com', // <--- CAMBIA ESTO POR TU CORREO REAL
      subject: 'Hola desde Vercel',
      html: '<strong>El robot de Cypress ha terminado.</strong>'
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
