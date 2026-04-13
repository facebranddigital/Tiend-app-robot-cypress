describe("Prueba de Registro de Usuario - Tienda App", () => {
  it("Debería completar el formulario de registro", () => {
    // 1. Visitar la página (Asegúrate de que la URL sea exactamente esta)

    // Intenta quitar el 'auth' si no funciona, a veces es solo /register

    // 1. Visitar la página (Asegúrate de cerrar bien los paréntesis)
    cy.visit('https://tiend-app-wogt.vercel.app/register', { timeout: 30000 });

    // 2. Esperar a que el elemento sea visible (esto evita el timeout de 4000ms)

    // Usaremos el ID que vimos en tu HTML

    cy.get("#name", { timeout: 10000 })
      .should("be.visible")
      .type("Ever QA Engineer");

    cy.get("#email").type("eversozinho@gmail.com");

    cy.get("#password").type("Admin123!"); 

    cy.get("#confirmPassword").type("Admin123!");

    // 3. Click en el botón

    cy.get("button.btn-submit").click();

    // 4. Verificar que redirija al login

    cy.url().should('include', '/products');
  });
});
