import { generateRandomString } from '../utils';

describe('Register page', () => {
  it('should register a new user', () => {
    cy.visit('/register');

    cy.get('input[name="userName"]').type(generateRandomString());
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/chats');
    cy.contains('Your chats').should('be.visible');
    cy.contains('No chat histories found').should('be.visible');
  });

  it('should not register a user with an existing username', () => {
    cy.visit('/register');

    cy.get('input[name="userName"]').type('julian');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/register');
  });
});
