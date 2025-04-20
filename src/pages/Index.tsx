
// Página principal: inclui o TodoList centralizado em um fundo suave

import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F1F0FB]">
      <TodoList />
    </main>
  );
};

export default Index;
