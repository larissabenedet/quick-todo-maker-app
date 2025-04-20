describe("Todo List - Adicionar Tarefas", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Ao adicionar uma nova tarefa", () => {
    it("deve exibir notificação de sucesso com os detalhes corretos", () => {
      const newTask = "Comprar roupas";

      cy.get('[data-testid="input-todo"]').should("be.visible").type(newTask);

      cy.get('[data-component-name="button"]').click();

      cy.get('[data-component-name="Toast"]').as("toast").should("be.visible");

      cy.get("@toast").contains("Tarefa adicionada!").should("be.visible");

      cy.get('[data-component-name="ToastDescription"]')
        .contains(newTask)
        .should("be.visible");
    });

    it("deve exibir a tarefa na lista de to-dos", () => {
      const newTask = "Criar testes em Cypress";

      cy.get('[data-testid="input-todo"]').should("be.visible").type(newTask);

      cy.get('[data-component-name="button"]').click();

      cy.get('[data-testid="todo-item"]')
        .contains(newTask)
        .should("be.visible");
    });
  });
});
