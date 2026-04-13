describe('DCCF: Flujo Completo de Registro y Notificación', () => {
  // Datos del usuario con timestamp para evitar colisiones en BD
  const nuevoUsuario = {
    nombre: 'Ever QA',
    email: `ever_${Date.now()}@facebrand.com`,
    password: 'D4rk4rm4deus2026'
  };

  it('Debe crear la cuenta exitosamente vía UI y validar el flujo', () => {
    // 1. Visitar la ruta real que editamos en el HTML
    cy.visit('https://tiend-app.vercel.app/auth/register');
    cy.url().should('include', '/register');

    // 2. Interacción de Usuario Real (Usando los data-testid que cuadramos)
    cy.get('[data-testid="reg-name"]').type(nuevoUsuario.nombre);
    cy.get('[data-testid="reg-email"]').type(nuevoUsuario.email);
    cy.get('[data-testid="reg-password"]').type(nuevoUsuario.password);

    // 3. Control de Flujo: Asegurar que el botón esté activo antes de hacer clic
    cy.get('[data-testid="reg-submit"]').should('not.be.disabled').click();

    // 4. Verificación de éxito (Redirección esperada a Login o Dashboard)
    // Cambia '/auth/login' por la ruta a la que redirige tu app
    cy.url().should('contain', '/login');
    
    cy.log('✅ Registro exitoso para: ' + nuevoUsuario.email);
  });
});
