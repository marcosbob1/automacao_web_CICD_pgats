class Menu {
  menus = {
    PRODUTOS: "Products",
  };

  irParaProdutos() {
    cy.contains(`Products`).click();
  }

  irParaLoginCadastro() {
    cy.contains("Signup").click();
  }

  irParaContactUsForm() {
    cy.contains("Contact us").click();
  }

  irPara(menu) {
    cy.contains(menu).click();
  }
}

export default new Menu();
