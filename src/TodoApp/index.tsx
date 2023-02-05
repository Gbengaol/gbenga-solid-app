import { TodoProvider } from "../context/todo.context";
import TodoApp from "./TodoApp";

const TodoAppLanding = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default TodoAppLanding;
