///<reference types="cypress" />

describe("Service is available", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should open start constructor page", () => {
    cy.get("h1").contains("Соберите бургер")
  });

  it("Should move ingredients to constructor", () => {
    const dataTransfer = new DataTransfer();

    cy.get("a[href*='/ingredients/60d3b41abdacab0026a733c6']").as("bun").trigger("dragstart", { dataTransfer });
    cy.get("div[data-testid='bun1']").as("constructorBun1").trigger("drop", { dataTransfer });
    cy.get("@bun").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorBun1").contains(target.text());
      cy.get("div[data-testid='bun2']").contains(target.text());
    });

    cy.get("a[href*='/ingredients/60d3b41abdacab0026a733cb']").as("ingredient1").trigger("dragstart", { dataTransfer });
    cy.get("ul[data-testid='ingredients']").as("constructorIngredients").trigger("drop", { dataTransfer });
    cy.get("@ingredient1").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorIngredients").children().eq(0).contains(target.text());
    });

    cy.get("a[href*='/ingredients/60d3b41abdacab0026a733ce']").as("ingredient2").trigger("dragstart", { dataTransfer });
    cy.get("@constructorIngredients").trigger("drop", { dataTransfer });
    cy.get("@ingredient2").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorIngredients").children().eq(1).contains(target.text());
    });

    cy.get("a[href*='/ingredients/60d3b41abdacab0026a733d0']").as("ingredient3").trigger("dragstart", { dataTransfer });
    cy.get("@constructorIngredients").trigger("drop", { dataTransfer });
    cy.get("@ingredient3").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorIngredients").children().eq(2).contains(target.text());
    });

    cy.get("@constructorIngredients").children().should('have.length', 3);

    cy.get("@constructorIngredients").children().eq(2).trigger("dragstart", { dataTransfer });
    cy.get("@constructorIngredients").children().eq(1).trigger("dragover", { dataTransfer }).trigger("drop", { dataTransfer });
    cy.get("@constructorIngredients").children().eq(2).trigger("dragend", { dataTransfer });
    cy.get("@constructorIngredients").children().should('have.length', 3);
    cy.get("@ingredient1").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorIngredients").children().eq(0).contains(target.text());
    });
    cy.get("@ingredient3").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorIngredients").children().eq(1).contains(target.text());
    });
    cy.get("@ingredient2").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorIngredients").children().eq(2).contains(target.text());
    });

    cy.get("@constructorIngredients").children().eq(1).find(".constructor-element__action > svg").click();
    cy.get("@constructorIngredients").children().should('have.length', 2);
    cy.get("@ingredient1").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorIngredients").children().eq(0).contains(target.text());
    });
    cy.get("@ingredient2").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorIngredients").children().eq(1).contains(target.text());
    });
  });

  it("Should open and close ingredient modal", () => {
    cy.get("a[href*='/ingredients/60d3b41abdacab0026a733c6']").as("ingredient1").click();
    cy.get("#react-modals div[class*='Modal_content_']").as("modalContent").find("h1").contains("Детали ингредиента");
    cy.get("@ingredient1").children("p.text.text_type_main-default").then(target => {
      cy.get("@modalContent").find("p.text.text_type_main-medium").contains(target.text());
    });
    cy.get("@modalContent").contains("Калории,ккал");
    cy.get("@modalContent").contains("Белки, г");
    cy.get("@modalContent").contains("Жиры, г");
    cy.get("@modalContent").contains("Углеводы, г");
    cy.get("#react-modals div[class*='Modal_closeButton_']").click();
    cy.get("#react-modals").children().should('have.length', 0);

    cy.get("a[href*='/ingredients/60d3b41abdacab0026a733cb']").as("ingredient2").click();
    cy.get("@modalContent").find("h1").contains("Детали ингредиента");
    cy.get("@ingredient2").children("p.text.text_type_main-default").then(target => {
      cy.get("@modalContent").find("p.text.text_type_main-medium").contains(target.text());
    });
    cy.get("@modalContent").contains("Калории,ккал");
    cy.get("@modalContent").contains("Белки, г");
    cy.get("@modalContent").contains("Жиры, г");
    cy.get("@modalContent").contains("Углеводы, г");
    cy.get("#react-modals div[class*='ModalOverlay_modalOverlay_']").click("left", { force: true });
    cy.get("#react-modals").children().should('have.length', 0);
  });

  it("Should send an order", () => {
    const dataTransfer = new DataTransfer();

    cy.get("a[href*='/ingredients/60d3b41abdacab0026a733c6']").as("bun").trigger("dragstart", { dataTransfer });
    cy.get("div[data-testid='bun1']").as("constructorBun1").trigger("drop", { dataTransfer });
    cy.get("@bun").children("p.text.text_type_main-default").then(target => {
      cy.get("@constructorBun1").contains(target.text());
      cy.get("div[data-testid='bun2']").contains(target.text());
    });

    cy.get("button:contains('Оформить заказ')").click();
    cy.get("h1").contains("Вход");

    cy.get("input[name*='email']").type("vas1979temp@bk.ru");
    cy.get("input[name*='password']").type("123456");
    cy.get("button:contains('Войти')").click();

    cy.wait(5000);

    cy.get("button:contains('Оформить заказ')").click();
    cy.wait(25000);

    cy.get("#react-modals p.text.text_type_main-medium").contains("идентификатор заказа");
    cy.get("#react-modals div[class*='Modal_closeButton_']").click();
    cy.get("#react-modals").children().should('have.length', 0);

    cy.clearCookies();
  });
});