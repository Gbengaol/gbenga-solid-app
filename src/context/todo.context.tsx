import {
  createContext,
  useContext,
  ParentComponent,
  createEffect,
  onMount,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Todo } from "../types";

export type TodoContextState = {
  todos: Array<Todo>;
  newTodo: Todo;
  deleteId: string;
  editId: string;
};

export type TodoContextValue = {
  state: TodoContextState;
  actions: {
    onSubmit: () => void;
    toggleItem: (id: string) => void;
    onTextChange: (value: string) => void;
    setItemToDelete: (value: string) => void;
    deleteItem: (value: string) => void;
    setItemToEdit: (value: string) => void;
  };
};

const emptyTodo = {
  title: "",
  completed: false,
  id: "",
};

const emptyState = {
  todos: [],
  newTodo: emptyTodo,
  deleteId: "",
  editId: "",
};

export const TodoContext = createContext<TodoContextValue>({
  state: emptyState,
  actions: {
    onSubmit: () => undefined,
    toggleItem: () => undefined,
    onTextChange: () => undefined,
    setItemToDelete: () => undefined,
    deleteItem: () => undefined,
    setItemToEdit: () => undefined,
  },
});

export const TodoProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<TodoContextState>(emptyState);

  onMount(() => {
    const savedTodos = localStorage.getItem("cached-todos");
    setState(
      produce((s) => (s.todos = savedTodos ? JSON.parse(savedTodos) : []))
    );
  });

  createEffect(() => {
    localStorage.setItem("cached-todos", JSON.stringify(state.todos));
  });

  const onTextChange = (value: string) => {
    setState(produce((s) => (s.newTodo.title = value)));
  };

  const setItemToDelete = (value: string) => {
    setState(produce((s) => (s.deleteId = value)));
  };

  const setItemToEdit = (value: string) => {
    setState(produce((s) => (s.editId = value)));
  };

  const onSubmit = () => {
    setState(
      produce((s) => {
        if (s.editId) {
          const itemIndex = state.todos.findIndex((el) => el.id === s.editId);
          s.todos[itemIndex].title = s.newTodo.title;
          s.newTodo.title = "";
          s.editId = "";
          return;
        }

        const newTodo = { ...s.newTodo, id: Date.now().toString() };
        s.newTodo.title = "";
        s.todos.push(newTodo);
      })
    );
  };

  const toggleItem = (id: string) => {
    const itemIndex = state.todos.findIndex((el) => el.id === id);
    setState(
      produce(
        (s) => (s.todos[itemIndex].completed = !s.todos[itemIndex].completed)
      )
    );
  };

  const deleteItem = (id: string) => {
    const itemIndex = state.todos.findIndex((el) => el.id === id);
    setState(produce((s) => s.todos.splice(itemIndex, 1)));
  };

  return (
    <TodoContext.Provider
      value={{
        state,
        actions: {
          toggleItem,
          onSubmit,
          onTextChange,
          setItemToDelete,
          deleteItem,
          setItemToEdit,
        },
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
