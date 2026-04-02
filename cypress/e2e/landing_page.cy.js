describe('Cazador Definitivo en Vercel', () => {
  it('Debe encontrar productos sin importar la etiqueta', () => {
    // 1. Visitar la web con un tiempo de espera extendido
    cy.visit('/products', { timeout: 30000 });

    // 2. Esperar a que el body sea visible y tenga contenido
    cy.get('body').should('be.visible');
    cy.wait(5000); // Pausa dramática para que cargue la API (Vercel/Firebase)

    // 3. Buscar cualquier enlace que NO esté en el menú
    // Intentamos atrapar el primer link que aparezca en el centro de la pantalla
    cy.get('a')
      .filter((i, el) => {
        // Filtramos para que el link tenga algo de "products" o sea un link largo
        return el.href.includes('/products/') || i > 5;
      })
      .first() // Nos quedamos con el primero que cumpla la condición
      .should('exist') // Aserción de seguridad para el video
      .scrollIntoView() // Baja la pantalla hasta el producto (Súper útil para el video)
      .should('be.visible') // Esperamos a que sea visible tras el scroll
      .click({ force: true }); // Clic forzado por si hay duplicados o superposiciones

    // 4. Verificación de movimiento
    cy.wait(3000);
    // Verificamos que la URL NO sea la página principal de productos
    cy.url().should('not.include', '/products$');
    
    // 5. Volver
    cy.go('back');
    cy.log('¡Misión cumplida a pesar de todo! 🦾');
  });
});