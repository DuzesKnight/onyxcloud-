describe('Marketing site', () => {
  it('loads the homepage', () => {
    cy.visit('/');
    cy.contains('Game & VPS hosting');
  });
});
