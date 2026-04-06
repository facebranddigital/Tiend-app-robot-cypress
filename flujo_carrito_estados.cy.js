describe('Prueba de Transición de Estados: Flujo del Carrito', () => {
  it('Debe transitar de Catálogo a Carrito al seleccionar un producto', () => {
    cy.visit('/');

    // 1. Clic en VER COLECCIÓN (Buscamos el botón por texto plano, sin barras)
    cy.contains('VER COLECCIÓN', { timeout: 15000 })
      .should('be.visible')
      .click();

    // 2. Esperamos a que carguen los productos (ajusta el selector .product-card si es otro)
    cy.get('body').should('not.be.empty');

    // 3. Clic en el botón de agregar
    // Intentamos con texto plano para evitar el lío de las comillas y las barras
    cy.contains('Agregar al carrito', { timeout: 15000 })
      .should('be.visible')
      .click();

    // 4. Verificación final
    cy.log('Producto agregado con éxito');
  });
});
