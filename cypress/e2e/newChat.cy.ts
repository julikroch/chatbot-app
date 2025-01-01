import { generateRandomString } from '../utils';

describe('New chat page', () => {
  beforeEach(() => {
    // Creating a new user
    cy.visit('/register');
    cy.get('input[name="userName"]').type(generateRandomString());
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/chats');
    cy.contains('Your chats').should('be.visible');
  });

  it('should create a new chat', () => {
    cy.contains('New chat').click();

    const newChatName = generateRandomString();
    cy.get('input[name="chatName"]').type(newChatName);
    cy.get('button[type="submit"]').click();

    cy.contains(newChatName).should('be.visible');
  });
});
