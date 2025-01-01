import { generateRandomString } from '../utils';

const randomUserName = generateRandomString();

describe('Register page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should register a new user', () => {
    cy.get('input[name="userName"]').type(randomUserName);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/chats');
    cy.contains('Your chats').should('be.visible');
    cy.contains('No chat histories found').should('be.visible');
  });

  it('should not register a user with an existing username', () => {
    cy.get('input[name="userName"]').type(randomUserName);
    cy.get('button[type="submit"]').click();

    cy.visit('/register');
    cy.get('input[name="userName"]').type(randomUserName);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/register');
    cy.contains('User already exists').should('be.visible');
  });
});
