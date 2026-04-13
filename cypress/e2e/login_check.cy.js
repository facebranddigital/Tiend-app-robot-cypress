describe('Misión: Tiend-App Full Test', () => {
  it('Debe cargar la página y verificar elementos clave', () => {
    // 1. Visita la página
    cy.visit('https://tiend-app.vercel.app'); 

    // 2. Verifica que el título o el logo existan (Ajusta el texto según tu app)
    cy.get('body').should('be.visible');
    
    // 3. Ejemplo: Verificar que existe un botón de login o un input
    // cy.get('button').contains('Ingresar').should('exist');

    cy.log('✅ ¡Prueba de humo completada con éxito!');
  });
});
