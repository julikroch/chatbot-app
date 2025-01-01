describe('New message page', () => {
  it('should send a new message', () => {
    cy.visit('/');

    cy.get('input[name="userName"]').type('julian');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/chats');
    cy.contains('Your chats').should('be.visible');

    cy.contains('My first chat').click();

    cy.get('input[name="message"]').type('Hello, world!');
    cy.get('button[type="submit"]').click();

    cy.contains('Hello, world!').should('be.visible');
  });
});
