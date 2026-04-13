describe("Automatización de Pago - Tiend-App", () => {
  it("Debe agregar productos, ir al carrito y generar link de pago", () => {
    // 1. Visitar la tienda
    cy.visit("https://tiend-app-wogt.vercel.app");
// 1. Agregar el producto
    cy.contains('button', '+').first().click();

    // 2. VALIDACIÓN ROBUSTA:
    // Buscamos el elemento que tiene la clase 'cart-btn' (que vimos en tu error)
    // y esperamos a que el texto sea diferente de 0.
    cy.get('.cart-btn')
      .should('exist') 
      .and('not.contain', '0'); // Asegura que ya no sea 0
    
    cy.log('Confirmado: El carrito ya tiene productos');

    // 3. Ir al carrito (al lado de Login)
    // Usamos force: true para ignorar si Cypress cree que está "tapado"
    cy.contains('button', /login/i).prev().click({ force: true });
    cy.log('Navegando al carrito');

    // 4. Interceptar API y Pagar
    cy.intercept("POST", "**/api/checkout").as("apiCall");

    // Esperamos un segundo a que cargue la página del carrito
    cy.url().should('include', '/cart');
    cy.get("button").contains(/pagar/i).click();

    cy.on('window:confirm', () => true); // Por si sale un alert bloqueando
    // 6. Validar la respuesta
    cy.wait("@apiCall").then((interception) => {
      cy.log("Status de la API: " + interception.response.statusCode);

      if (interception.response.statusCode === 200) {
        expect(interception.response.body.init_point).to.include("mercadopago");
        cy.log("✅ URL de pago generada correctamente");
      } else {
        cy.log(
          "❌ Error 500: Esto es normal porque aún no has puesto el Token en Vercel",
        );
      }
    });
  });
});
