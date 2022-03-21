describe('Cart', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('displays the default state', () => {
    cy.findByRole('combobox', { name: 'Select a currency' }).should(
      'have.value',
      'USD'
    );

    cy.findAllByRole('row').should('have.length', 3);

    cy.findAllByRole('row')
      .first()
      .within(() => {
        cy.findAllByRole('cell').eq(0).should('contain', 'Apple iPhone 12');
        cy.findAllByRole('cell')
          .eq(1)
          .should('have.text', '1')
          .within(() => {
            cy.findByLabelText('Decrease amount').should('be.disabled');
            cy.findByLabelText('Increase amount').should('not.be.disabled');
          });
        cy.findAllByRole('cell').eq(2).should('have.text', '$899.00');
        cy.findAllByRole('cell').eq(3).should('have.text', '$899.00');
      });

    cy.findAllByRole('row')
      .eq(1)
      .within(() => {
        cy.findAllByRole('cell').eq(0).should('contain', 'Apple AirPods Pro');
        cy.findAllByRole('cell')
          .eq(1)
          .should('have.text', '1')
          .within(() => {
            cy.findByLabelText('Decrease amount').should('be.disabled');
            cy.findByLabelText('Increase amount').should('not.be.disabled');
          });
        cy.findAllByRole('cell').eq(2).should('have.text', '$174.95');
        cy.findAllByRole('cell').eq(3).should('have.text', '$174.95');
      });

    cy.findAllByRole('row')
      .last()
      .within(() => {
        cy.findAllByRole('cell')
          .eq(0)
          .should('contain', 'Apple Lightning to USB-C Cable');
        cy.findAllByRole('cell')
          .eq(1)
          .should('have.text', '2')
          .within(() => {
            cy.findByLabelText('Decrease amount').should('not.be.disabled');
            cy.findByLabelText('Increase amount').should('not.be.disabled');
          });
        cy.findAllByRole('cell').eq(2).should('have.text', '$17.00');
        cy.findAllByRole('cell').eq(3).should('have.text', '$34.00');
      });

    cy.contains('4 items in the cart').should('be.visible');

    cy.contains('Subtotal').next().should('have.text', '$1,107.95');
    cy.contains('VAT (20%)').next().should('have.text', '$221.59');

    cy.findByRole('combobox', { name: 'Shipping' }).should(
      'have.value',
      'Standard'
    );

    cy.contains('Order total').next().should('have.text', '$1,334.54');
  });

  it('changes the quantity of an item', () => {
    cy.findAllByRole('row')
      .first()
      .within(() => {
        cy.findByLabelText('Increase amount').click();

        cy.findAllByRole('cell').eq(2).should('have.text', '$899.00');
        cy.findAllByRole('cell').eq(3).should('have.text', '$1,798.00');
      });

    cy.contains('5 items in the cart').should('be.visible');

    cy.contains('Subtotal').next().should('have.text', '$2,006.95');
    cy.contains('VAT (20%)').next().should('have.text', '$401.39');

    cy.contains('Order total').next().should('have.text', '$2,413.34');

    cy.findAllByRole('row')
      .last()
      .within(() => {
        cy.findByLabelText('Decrease amount').click();

        cy.findAllByRole('cell').eq(2).should('have.text', '$17.00');
        cy.findAllByRole('cell').eq(3).should('have.text', '$17.00');
      });

    cy.contains('4 items in the cart').should('be.visible');

    cy.contains('Subtotal').next().should('have.text', '$1,989.95');
    cy.contains('VAT (20%)').next().should('have.text', '$397.99');

    cy.contains('Order total').next().should('have.text', '$2,392.94');
  });

  it('removes an item', () => {
    cy.findAllByRole('row')
      .first()
      .within(() => {
        cy.findByText('Remove').click();
      });

    cy.findAllByRole('row').should('have.length', 2);

    cy.contains('3 items in the cart').should('be.visible');

    cy.contains('Subtotal').next().should('have.text', '$208.95');
    cy.contains('VAT (20%)').next().should('have.text', '$41.79');

    cy.contains('Order total').next().should('have.text', '$255.74');

    cy.contains('Apple iPhone 12').should('not.exist');
  });

  it('changes the shipping method', () => {
    cy.findByRole('combobox', { name: 'Shipping' }).select('Expedite');

    cy.contains('Order total').next().should('have.text', '$1,344.54');
  });
});
