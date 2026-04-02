describe('Suite de Pruebas - Tienda Virtual', () => {

  beforeEach(() => {
    cy.visit('https://tiend-app-mu.vercel.app/');
  });

  it('Validar navegación y visibilidad de la Navbar', () => {
    cy.contains(/Inicio|Home/i).should('be.visible');
    cy.contains(/Categorías|Productos/i).should('be.visible');
  });

  it('Simular flujo de Registro de Usuario', () => {
    // 1. Ir al login
    cy.contains(/Login/i).click({ force: true });

    // 2. Clic en "Regístrate aquí"
    cy.contains('Regístrate aquí', { timeout: 10000 }).click({ force: true });

    // 3. Llenamos los campos de la nueva cuenta
    cy.get('input[placeholder*="tu@ejemplo.com"]')
      .type(`ever.tester${Date.now()}@prueba.com`, { force: true }); // Usamos Date.now() para que el correo siempre sea único
    
    cy.get('input[placeholder*="Mínimo 6 caracteres"]')
      .type('Password123!', { force: true });
    
    cy.get('input[placeholder*="Repite tu contraseña"]')
      .type('Password123!', { force: true });

    // 4. Clic en el botón de registro
    cy.get('button').contains(/Registrarse|Crear cuenta/i).click({ force: true });

    // 5. VALIDACIÓN FINAL: Según tu captura, la app redirige a Productos
    // Esperamos a que la URL cambie y aparezca el título del inventario
    cy.url({ timeout: 15000 }).should('include', '/products');
    cy.contains('Inventario de Productos', { timeout: 15000 }).should('be.visible');
  });
});