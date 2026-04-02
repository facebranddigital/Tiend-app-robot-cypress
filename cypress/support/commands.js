Cypress.Commands.add('loginMock', (email, pass = 'robot123') => {
    cy.visit('/login')
    cy.get('input[type="email"]').first().clear().type(email)
    cy.get('input[type="password"]').first().clear().type(pass)
    cy.get('button').contains('Iniciar Sesión').click()
    // Wait for login to complete and dashboard to appear
    cy.contains(/Inventario|Productos|Cerrar/i, { timeout: 15000 }).should('be.visible')
});