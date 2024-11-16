class Cadastro {
  preencherFormulario() {
    const timestamp = new Date().getTime();
    const signUpName = "Tester QA";

    Cypress.env("signUpName", signUpName);

    cy.get('[data-qa="signup-name"]').type(Cypress.env("signUpName"));
    cy.get('[data-qa="signup-email"]').type(`tester-${timestamp}@mail.com`);
    cy.contains("button", "Signup").click();

    cy.get("input[type=radio]").check("Mrs");

    cy.get("input[type=radio]").eq(1).check();

    //Inserindo Password
    cy.get("[type=password]").type("12345", { log: false });

    //Preenchendo o campo de seleção de datas - dia
    cy.get('[data-qa="days"]').select("5");

    //Preenchendo o campo de seleção de mês
    cy.get('[data-qa="months"]').select("January");

    //Preenchendo o campo de seleção de ano
    cy.get('[data-qa="years"]').select("1993");

    //Marcando as checkboxes
    cy.get("input[type=checkbox]#newsletter").check();
    cy.get("input[type=checkbox]#optin").check();

    //Preenchendo o endereço
    cy.get('[data-qa="first_name"]').type("Marieta");
    cy.get('[data-qa="last_name"]').type("Severo");
    cy.get('[data-qa="company"]').type("Tigrinho Tabajara");
    cy.get('[data-qa="address"]').type("Rua treze, n 14");
    cy.get('[data-qa="country"]').select("United States");
    cy.get('[data-qa="state"]').type("Califórnia");
    cy.get('[data-qa="city"]').type("Los Angeles");
    cy.get('[data-qa="zipcode"]').type("90001");
    cy.get('[data-qa="mobile_number"]').type("111 222 333");

    //Clicando no botão de salvar
    cy.get('[data-qa="create-account"]').click();

    cy.url().should("includes", "account_created");

    cy.get('[data-qa="account-created"]').should("be.visible");

    cy.get('[data-qa="continue-button"]').click();

    return this;
  }

  iniciarCadastro(usuario) {
    cy.get('[data-qa="signup-name"]').type("Tester QA");
    cy.get('[data-qa="signup-email"]').type(usuario);
    cy.contains("button", "Signup").click();

    return this;
  }

  verificarSeCadastroFoiConcluido() {
    cy.get("i.fa-user").parent().should("contain", Cypress.env("signUpName"));

    return this;
  }
}

export default new Cadastro();
