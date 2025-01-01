import { generateRandomString } from '../utils';

describe('New chat page', () => {
  it('should create a new chat', () => {
    cy.visit('/');

    cy.get('input[name="userName"]').type('julian');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/chats');
    cy.contains('Your chats').should('be.visible');

    cy.contains('New chat').click();

    cy.get('input[name="chatName"]').type(generateRandomString());
    cy.get('button[type="submit"]').click();

    cy.contains('new chat').should('be.visible');
  });
});
