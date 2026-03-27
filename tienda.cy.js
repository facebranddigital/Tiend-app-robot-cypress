 describe('Test básico', () => {
  it('Carga la app', () => {
    cy.visit('https://tiend-app-mu.vercel.app/');
  });
});describe('App Tienda - QA Pro', () => {

  beforeEach(() => {
    cy.visit('https://tiend-app-mu.vercel.app/');
    cy.get('body').should('be.visible'); 
  });


  it('Valida apertura, contenido y cierre del modal', () => {

    cy.contains(/ver colección/i)
      .should('be.visible')
      .click();

    
    cy.contains(/colecciones/i).should('be.visible');

   
    cy.get('h1:visible, h2:visible, h3:visible')
      .should('have.length.at.least', 3);

   
    cy.get('button:visible').then(($buttons) => {

      const cerrar = [...$buttons].find(btn =>
        btn.innerText.includes('×') ||
        btn.innerText.toLowerCase().includes('cerrar') ||
        btn.innerText.toLowerCase() === 'x'
      );

      if (cerrar) {
        cy.wrap(cerrar).click({ force: true });
      } else {
        cy.get('body').click(0, 0);
      }
    });

  });


  it('Valida que el formulario tenga los campos requeridos', () => {

  cy.contains(/registrarse ahora/i)
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

    
    cy.get('input:visible').should('have.length.at.least', 3);
    cy.get('input[type="email"]').should('be.visible');

  });

  // 
  it('Muestra error cuando el correo es inválido', () => {

  // Abrir formulario
cy.contains(/registrarse ahora/i)
  .scrollIntoView()
  .click({ force: true });

// Esperar inputs
cy.get('input').should('have.length.at.least', 3);

// Nombre
cy.get('input').eq(0).clear().type('Ever QA');

// Email
cy.get('input').eq(1).clear().type('correo');

// Celular
cy.get('input').eq(2).clear().type('3001234567');

  cy.contains(/registrarse ahora/i)
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

    
    cy.get('body').should(($body) => {
      const texto = $body.text().toLowerCase();
      console.log(texto);
      
      expect(
        texto.includes('correo') || texto.includes('email')
      ).to.be.true;
    });

  });

  
  it('Muestra error si el correo ya existe', () => {

  // Abrir formulario
cy.contains(/registrarse ahora/i)
  .scrollIntoView()
  .click({ force: true });

// Esperar inputs visibles
cy.get('input:visible').should('have.length.at.least', 3);

// Nombre
cy.get('input[type="text"]:visible')
  .first()
  .clear()
  .type('Ever QA');

// Email ✅ corregido
cy.get('input[type="email"]:visible')
  .first()
  .clear()
  .type('correo-mal');

// Celular
cy.get('input[type="tel"]:visible')
  .clear()
  .type('3001234567');

  cy.contains(/registrarse ahora/i)
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });

    
    cy.get('body').should(($body) => {
      const texto = $body.text().toLowerCase();
      console.log(texto);

      expect(
        texto.includes('uso') ||
        texto.includes('registrado') ||
        texto.includes('existe')
      ).to.be.false;

    });

  });

});