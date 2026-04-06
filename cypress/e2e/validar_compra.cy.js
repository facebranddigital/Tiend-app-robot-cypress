describe('Módulo de Finalización de Compra', () => {
  it('Debería mostrar la interfaz principal correctamente', () => {
    cy.visit('/');

    // Validamos el texto que sí sale en tu captura
    cy.contains(/THE FUTURE OF STYLE/i, { timeout: 15000 })
      .should('be.visible');
      
    // Validamos que el botón de Ver Colección existe
    cy.contains(/VER COLECCIÓN/i).should('be.visible');
  });
});
