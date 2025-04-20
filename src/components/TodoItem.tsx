
import React from "react";
import { Check, Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div
      className={`flex items-center justify-between gap-2 px-4 py-3 rounded-lg shadow-sm bg-white mb-2 transition-all duration-200 animate-fade-in ${
        todo.completed ? "opacity-60" : ""
      }`}
      data-testid="todo-item"
    >
      <button
        className={`flex items-center gap-2 select-none group`}
        aria-label={todo.completed ? "Desmarcar tarefa" : "Concluir tarefa"}
        onClick={() => onToggle(todo.id)}
      >
        <span
          className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors
            ${todo.completed ? "border-green-500 bg-green-50" : "border-gray-300"}
            group-hover:border-purple-400
          `}
        >
          {todo.completed && <Check size={16} className="text-green-500" />}
        </span>
        <span
          className={`ml-2 text-base ${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      </button>
      <button
        className="ml-2 p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
        aria-label="Excluir"
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TodoItem;
