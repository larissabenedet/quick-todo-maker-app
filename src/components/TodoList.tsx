
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import TodoItem from "./TodoItem";
import { Plus } from "lucide-react";

let nextId = 1;

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);
  const [input, setInput] = useState("");

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const value = input.trim();
    if (!value) {
      toast({ title: "Insira um texto para criar uma tarefa." });
      return;
    }
    setTodos((prev) => [
      { id: nextId++, text: value, completed: false },
      ...prev,
    ]);
    setInput("");
    toast({
      title: "Tarefa adicionada!",
      description: value,
    });
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
    const todo = todos.find((t) => t.id === id);
    if (todo)
      toast({
        title: todo.completed ? "Tarefa marcada como pendente" : "Tarefa concluída!",
        description: todo.text,
      });
  };

  const handleDelete = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    toast({
      title: "Tarefa excluída.",
      description: todo ? todo.text : undefined,
      variant: "destructive",
    });
  };

  return (
    <div className="max-w-md w-full mx-auto py-8 px-2">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 animate-fade-in">
        To-Do List
      </h2>

      <form
        onSubmit={handleAdd}
        className="flex gap-2 mb-6 animate-fade-in"
        autoComplete="off"
      >
        <input
          type="text"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-purple-400 shadow-sm focus:outline-none text-base bg-white"
          placeholder="Adicione uma nova tarefa..."
          value={input}
          data-testid="input-todo"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleAdd();
          }}
        />
        <button
          type="submit"
          className="h-10 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold flex items-center gap-1 hover-scale shadow transition-all"
          aria-label="Adicionar"
        >
          <Plus size={18} />
          <span className="sr-only sm:not-sr-only">Adicionar</span>
        </button>
      </form>
      <div className="mb-2">
        {todos.length === 0 ? (
          <div className="text-gray-400 text-center text-base animate-fade-in" data-testid="empty-list">
            Nenhuma tarefa ainda. Adicione a primeira!
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
