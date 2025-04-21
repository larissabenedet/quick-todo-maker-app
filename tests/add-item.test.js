import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../src/components/TodoList";

describe("Todo List - Adicionar Tarefas", () => {
  it("deve adicionar uma nova tarefa quando o formulário é submetido", () => {
    render(<TodoList />);

    // Encontra o input e o botão
    const input = screen.getByTestId("input-todo");
    const addButton = screen.getByRole("button", { name: /adicionar/i });

    // Digite o texto da tarefa
    fireEvent.change(input, { target: { value: "Nova tarefa de teste" } });

    // Submeta o formulário
    fireEvent.click(addButton);

    // Verifica se a tarefa foi adicionada
    expect(screen.getByText("Nova tarefa de teste")).toBeInTheDocument();
  });

  it("não deve adicionar uma tarefa vazia", () => {
    render(<TodoList />);

    const input = screen.getByTestId("input-todo");
    const addButton = screen.getByRole("button", { name: /adicionar/i });

    // Tenta adicionar uma tarefa vazia
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(addButton);

    // Verifica se a mensagem de lista vazia ainda está presente
    expect(screen.getByTestId("empty-list")).toBeInTheDocument();
  });

  it("deve limpar o input após adicionar uma tarefa", () => {
    render(<TodoList />);

    const input = screen.getByTestId("input-todo");
    const addButton = screen.getByRole("button", { name: /adicionar/i });

    // Adiciona uma tarefa
    fireEvent.change(input, { target: { value: "Tarefa para testar" } });
    fireEvent.click(addButton);

    // Verifica se o input foi limpo
    expect(input.value).toBe("");
  });
});
