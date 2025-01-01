import { generateRandomString } from '../utils';

describe('New message page', () => {
  const randomUserName = generateRandomString();
  const randomChatName = generateRandomString();

  beforeEach(() => {
    cy.visit('/register');
    cy.get('input[name="userName"]').type(randomUserName);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/chats');
    cy.contains('Your chats').should('be.visible');

    cy.contains('New chat').click();
    cy.get('input[name="chatName"]').type(randomChatName);
    cy.get('button[type="submit"]').click();
    cy.contains(randomChatName).should('be.visible');
  });

  it('should send a new message', () => {
    cy.contains(randomChatName).click();

    const messageContent = 'Hello, world!';
    cy.get('input[name="message"]').type(messageContent);
    cy.get('button[type="submit"]').click();

    cy.contains(messageContent).should('be.visible');
  });
});
