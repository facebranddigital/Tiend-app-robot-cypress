describe('Automatización de Registro - Flujo Autónomo 🤖', () => {
  it('Debe crear una cuenta nueva automáticamente', () => {
    const emailUnico = `robot_${Date.now()}@test.com`; 

    cy.visit('https://tiend-app-mu.vercel.app/register'); 

    // Usamos .eq() para seleccionar los campos por orden si no tienen nombre
    cy.get('input').eq(0).type('Robot Ever', { force: true }); // Primer cuadro: Nombre
    cy.get('input').eq(1).type(emailUnico, { force: true });    // Segundo cuadro: Email
    cy.get('input').eq(2).type('EverPass123!', { force: true }); // Tercer cuadro: Password
    
    // Buscamos el botón que diga Registrar o Sign Up
    cy.get('button').contains(/Registrar|Sign Up|Crear/i).click({ force: true });

    // Esperamos a ver si nos manda al login o al dashboard
    cy.log('Registro intentado con: ' + emailUnico);
  });
});