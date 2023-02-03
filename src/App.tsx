import { Component } from "solid-js";
import { TodoApp } from "./TodoApp/TodoApp";

const App: Component = () => {
  return (
    <div class="px-10 py-4">
      <img src="../logo.png" alt="Logo" class="h-24 w-24 mb-3 mx-auto" />
      <div class="flex justify-center ">
        <TodoApp />
      </div>
    </div>
  );
};

export default App;
