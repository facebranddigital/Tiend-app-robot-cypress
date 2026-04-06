Cypress.Commands.add('loginMock', (email, pass = 'robot123') => {
    cy.visit('/login')
    cy.get('input[type="email"]').first().clear().type(email)
    cy.get('input[type="password"]').first().clear().type(pass)
    cy.get('button').contains('Iniciar Sesión').click()
    // Wait for login to complete and dashboard to appear
    cy.contains(/Inventario|Productos|Cerrar/i, { timeout: 15000 }).should('be.visible')
});

// 🔹 Validador global de codificación (Encoding/Mojibake)
Cypress.Commands.add('validateEncoding', { prevSubject: true }, (subject) => {
    cy.wrap(subject)
      .invoke('text')
      .then((text) => {
        // Busca caracteres típicos de errores de UTF-8 (Â, ð, , etc)
        expect(text).to.not.match(/[Âð]/);
      });
});