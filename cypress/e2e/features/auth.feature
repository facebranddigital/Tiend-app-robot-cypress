Feature: Módulo de autenticación en Cypress
  Como desarrollador
  Quiero crear un módulo de autenticación
  Para poder ejecutar solicitudes privadas que requieren autenticación en Firebase

  Scenario: Autenticación exitosa
    Given que el usuario tiene credenciales válidas
    When el usuario inicia sesión
    Then el sistema debe autenticar al usuario
    And el usuario debe poder realizar solicitudes privadas

  Scenario: Autenticación fallida
    Given que el usuario tiene credenciales inválidas
    When el usuario intenta iniciar sesión
    Then el sistema debe rechazar la autenticación
    And el usuario no debe poder realizar solicitudes privadas

  Scenario: Cierre de sesión
    Given que el usuario ha iniciado sesión
    When el usuario cierra sesión
    Then el sistema debe cerrar la sesión del usuario
    And el usuario no debe poder realizar solicitudes privadas