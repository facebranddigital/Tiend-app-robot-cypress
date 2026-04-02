describe('Validación de Navbar', () => {
  
  beforeEach(() => {
    // Asegúrate de visitar la página antes de cada test
    cy.visit('https://tiend-app-mu.vercel.app/', { timeout: 30000 });
    // Esperamos a que el cuerpo de la página exista
    cy.get('body').should('exist');
  });

  it('Scenario 1: Verificar existencia de Navbar 🐞', () => {
    // Usamos un timeout más largo y verificamos si existe antes de contar
    cy.get('body').then(($body) => {
      if ($body.find('nav').length > 0) {
        cy.get('nav').then(($navs) => {
          if ($navs.length > 1) {
            cy.log('⚠️ BUG DETECTADO: Se encontraron navbars duplicados');
          }
          expect($navs.length).to.be.at.least(1);
        });
      } else {
        // Si no encuentra 'nav', buscamos por la clase común de navbars
        cy.get('.navbar', { timeout: 15000 }).should('be.visible');
      }
    });
  });

  it('Scenario 2: Verificar contenido de la Navbar', () => {
    // Forzamos la espera de la navbar antes de entrar al .within()
    cy.get('nav', { timeout: 15000 }).should('be.visible').last().within(() => {
      cy.get('a, button').should('have.length.at.least', 1).then(($els) => {
        cy.log('Elementos encontrados:', $els.text());
      });
    });
  });
});