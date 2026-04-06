import jsforce from 'jsforce';

export default async function handler(req, res) {
  // Solo permitimos peticiones POST (registros)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { firstName, lastName, email, phone } = req.body;

  // Creamos la conexión
  const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com' // Usa 'https://test.salesforce.com' si es Sandbox
  });

  try {
    // Login con las variables que configuraste en Vercel
    await conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);

    // Insertar el Lead en Salesforce
    const result = await conn.sobject('Lead').create({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Phone: phone,
      Company: 'Tienda App Autoregister', // OBLIGATORIO en Salesforce
      Status: 'Open - Not Contacted'
    });

    if (result.success) {
      console.log('Lead creado exitosamente:', result.id);
      return res.status(200).json({ success: true, id: result.id });
    } else {
      return res.status(400).json({ success: false, errors: result.errors });
    }
  } catch (err) {
    console.error('Error de conexión con Salesforce:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
// Update: Sun 05 Apr 2026 11:18:10 PM -05
// Re-deploy con settings corregidos
// Force update Mon 06 Apr 2026 01:04:09 AM -05
