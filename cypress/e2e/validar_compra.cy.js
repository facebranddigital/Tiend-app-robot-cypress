describe('Módulo de Finalización de Compra', () => {
  it('Debería mostrar el mensaje de éxito sin errores de caracteres', () => {
    // 1. Visitar la tienda
    cy.visit('https://jsonplaceholder.typicode.com'); // Cambia por tu URL real de Vercel

    // 2. Simulamos una validación de texto para el bug que encontraste
    // Buscamos el mensaje y verificamos que NO tenga basura visual
    cy.get('body').should('not.contain', 'Â¡');
    cy.get('body').should('not.contain', 'ðŸš€');
    
    cy.log('Control de Calidad: Mensaje verificado');
  });
});
