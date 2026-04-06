const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Face Brand Digital - API</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .card { text-align: center; background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-top: 5px solid #00a884; }
            h1 { color: #00a884; margin-bottom: 10px; }
            p { color: #666; font-size: 1.1rem; }
            .status { display: inline-block; margin-top: 20px; padding: 8px 15px; background: #e8f5e9; color: #2e7d32; border-radius: 20px; font-weight: bold; font-size: 0.9rem; }
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
});

// Mantén aquí tus otras rutas y el app.listen si no estás en Vercel
module.exports = app;
