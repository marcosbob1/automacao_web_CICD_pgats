/// <reference types="cypress" />
// pom - page object model
import cadastro from "../pages/cadastro";
import login from "../pages/login";
import menu from "../pages/menu";

import { faker } from "@faker-js/faker";

//HOOKS
//acoes que executam
//antes de todos ou antes de cada teste    - before e beforeEach
//depois de todos ou depois de cada teste  - after e afterEach
//beforeAll e afterAll

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Test Case 1: Cadastrar um usuário", () => {
    menu.irParaLoginCadastro();
    //cadastro.preencherFormulario()
    //cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))   //Comentando para usar o padrão Fluent Pages abaixo                       // (alternativa 4) - pegando a classe pai do elemento do íconede usuário que aparece na pág.

    cadastro.preencherFormulario().verificarSeCadastroFoiConcluido();
  });

  it("Test Case 2: Login User with correct email and password", () => {
    // arrange - preparacao
    menu.irParaLoginCadastro();

    // act - ação principal
    login.preencherLogin("tester-1721346302730@mail.com", "12345");

    // assert - verificacao da saída do teste / comportamento esperado
    cy.get("i.fa-user").parent().should("contain", "Tester QA");
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    // Triplo A - Arrange, Act, Assert

    // arrange - preparacao
    //cy.contains('Signup').click()
    menu.irParaLoginCadastro();

    // act - ação principal
    login.preencherLogin("tester-1721346302730@mail.com", "54321");

    // assert - verificacao da saída do teste / comportamento esperado
    cy.get(`.login-form form p`).should(
      "contain",
      "Your email or password is incorrect!",
    );
  });

  it("Test Case 4: Logout User", () => {
    // Triplo A - Arrange, Act, Assert

    // arrange - preparacao
    //cy.contains('Signup').click()
    menu.irParaLoginCadastro();

    // act - ação principal
    login.preencherLogin("tester-1721346302730@mail.com", "12345");

    cy.get("i.fa-user").parent().should("contain", "Tester QA");

    // act - ação principal
    cy.contains("Logout").click();

    // assert - verificacao da saída do teste / comportamento esperado
    cy.url().should("contain", "login");
    cy.contains("Login to your account").should("be.visible");
  });

  it("Test Case 5: Register User with existing email", () => {
    // arrange - preparacao
    // cy.contains('Signup').click()
    menu.irParaLoginCadastro();

    cadastro.iniciarCadastro(`tester-1721346302730@mail.com`);

    // assert
    cy.get(`.signup-form form p`)
      .should("be.visible")
      .and("contain", "Email Address already exist!");
  });

  it("Test Case 6: Contact Us Form", () => {
    // Triplo A - Arrange, Act, Assert

    // arrange - preparacao
    //cy.contains(`Contact Us`).click()
    menu.irParaContactUsForm();

    cy.get(`.contact-form h2`)
      .should("be.visible")
      .and("have.text", "Get In Touch");

    cy.get('[data-qa="name"]').type(`Tester`);
    cy.get('[data-qa="email"]').type(`tester-qa@mail.com`);
    cy.get('[data-qa="subject"]').type(`Test Automation`);
    cy.get('[data-qa="message"]').type(`Learning Test Automation`);

    cy.fixture("example.json").as("arquivo"); // pegando o arquivo que tem o usuário e senha
    cy.get('input[name="upload_file"]').selectFile("@arquivo");

    cy.get('[data-qa="submit-button"]').click();

    cy.get(".status").should(
      "have.text",
      "Success! Your details have been submitted successfully.",
    );
  });

  it("Test Case 8: Verify All Products and product detail page", () => {
    // cy.contains(`Products`).click()
    menu.irParaProdutos();

    cy.url().should("contain", "products");
    cy.get(".title").should("be.visible").and("contain", "All Products");

    cy.get(".single-products")
      .should("be.visible")
      .and("have.length.at.least", 1) //verificandoo que tem pelo menos 1 na lista
      .first() // navegando pro primeiro produto da lista
      .parent() // navegando pro elemento do nível acima, aonde tem o view product
      .contains("View Product")
      .click();

    // tb poderia fazer :
    // cy.contains ('View Product').first().click()

    //product name, category, price, availability, condition, brand
    cy.get(".product-information > h2").should("be.visible");
    cy.get(".product-information p").should("be.visible").and("have.length", 4);
    cy.get(".product-information span span").should("be.visible");
  });

  it("Test Case 9: Search Product", () => {
    menu.irParaProdutos();

    cy.url().should("contain", "products");
    cy.get(".title").should("be.visible").and("contain", "All Products");

    cy.get("input#search_product").type("Shirt");
    cy.get("button#submit_search").click();

    cy.get(".title").should("be.visible").and("contain", "Searched Products");

    cy.get(".single-products")
      .should("be.visible")
      .and("have.length.at.least", 1);
  });

  it("Test Case 10:  Verify Subscription in home page", () => {
    cy.get("input#susbscribe_email")
      .scrollIntoView()
      .type("tester-qa@mail.com");

    cy.get("button#subscribe").click();

    cy.contains("You have been successfully subscribed!").should("be.visible");
  });

  it("Test Case 15: Place Order: Register before Checkout", () => {
    menu.irParaLoginCadastro();
    cadastro.preencherFormulario();

    cy.contains("Add to cart").click();
    cy.contains("View Cart").click();
    cy.get(".btn-default.check_out").should("be.visible");
    cy.get(".btn-default.check_out").click();
    cy.get(".heading").first().should("have.text", "Address Details");
    cy.get(".heading").last().should("have.text", "Review Your Order");
    cy.get(".form-control").type("378 98562-8781");
    cy.get(".btn-default.check_out").click();
    cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
    cy.get('[data-qa="expiry-month"]').type(12);
    cy.get('[data-qa="expiry-year"]').type(2035);
    cy.get('[data-qa="pay-button"]').click();
    cy.get('[data-qa="order-placed"]').should("be.visible");
    cy.get('[href *="delete"]').click();
    cy.get("b").should("contain", "Account Deleted!");
    cy.get('[data-qa="continue-button"]').click();
  });
});
