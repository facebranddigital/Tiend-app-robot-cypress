const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "eversozinho@gmail.com", // Tu correo de destino
  from: "facebranddigital@gmail.com",
  subject: "🚀 Reporte QA: Tiend-App Status OK",
  html: `
    <div style="font-family: sans-serif; border: 1px solid #4CAF50; padding: 20px; border-radius: 10px;">
      <h1 style="color: #4CAF50;">✅ ¡Pruebas Superadas!</h1>
      <p>El robot de Cypress terminó la ejecución en <strong>brXeon</strong> con éxito.</p>
      <hr>
      <p><strong>Resultado:</strong> 1 Test Pasado (100%)</p>
      <p style="font-size: 12px; color: #888;">Enviado automáticamente por el Sistema de Automatización.</p>
    </div>
  `,
};

(async () => {
  try {
    await sgMail.send(msg);
    console.log("🚀 ¡Reporte enviado exitosamente al correo!");
  } catch (error) {
    console.error(
      "❌ Error al enviar:",
      error.response ? error.response.body : error,
    );
  }
})();
