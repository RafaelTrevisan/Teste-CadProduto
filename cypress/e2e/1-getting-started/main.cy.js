/// <reference types="cypress" />

describe('Teste QuikDev', () => {
  before(() => {
    cy.homePage()
    cy.viewport(1920, 1080)
  });

  context('Cadastro de Produto', () => {
    it.only('Validar cadastro', () => {
      const produto = 'Produto teste';
      const preco = '20';
      const validadeNA = '2020-02-10'
      const validadeBR = '10/02/2020'

      cy.get('#inputNome').type(produto).should('be.visible')

      cy.get('#inputPreco').type(preco).should('be.visible')

      cy.get('#inputValidade').type(validadeNA).should('be.visible', validadeNA)

      cy.contains('button', 'Adicionar').click()
       
      cy.get('td').eq(1).should('contain', produto, 'be.visible')
      cy.get('td').eq(2).should('contain', preco, 'be.visible')
      cy.get('td').eq(3).should('contain', validadeBR, 'be.visible')

    });

    it('Validar campos obrigatórios', () => {
      
      cy.contains('button', 'Adicionar').click()

      cy.get('.invalid-feedback').should('be.visible').should('contain', 'Nome invalido')
      cy.get('.invalid-feedback').should('be.visible').should('contain', 'Preço invalido')
      cy.get('.invalid-feedback').should('be.visible').should('contain', 'Validade Invalida')

      cy.contains('.table table-striped').should('not.exist')
      cy.contains('#conteudoTabela').should('not.exist')
    });
  });
});