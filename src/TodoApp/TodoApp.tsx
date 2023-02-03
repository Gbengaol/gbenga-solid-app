import { createSignal, For, createMemo, Show } from "solid-js";
import { AddNewTodo } from "./AddNewTodo";
import { TodoItem } from "./TodoItem";

export type Todo = {
  title: string;
  completed: boolean;
  id: string;
};

const emptyTodo: Todo = {
  title: "",
  completed: false,
  id: "",
};

export const TodoApp = () => {
  const [todos, setTodos] = createSignal<Array<Todo>>([]);
  const [newTodo, setNewTodo] = createSignal<Todo>(emptyTodo);

  const onSubmit = (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => {
    e.preventDefault();
    setTodos([{ ...newTodo(), id: Date.now().toString() }, ...todos()]);
    setNewTodo(emptyTodo);
  };

  const toggleItem = (id: string) => {
    setTodos((oldTodos) => {
      return oldTodos.map((oldTodo) => ({
        ...oldTodo,
        completed: oldTodo.id === id ? !oldTodo.completed : oldTodo.completed,
      }));
    });
  };

  const todoElements = createMemo(() =>
    todos()?.filter((el) => el.title?.length)
  );

  return (
    <div class="w-full border-green-900 border-2 p-8 rounded-3xl">
      <div class="grid grid-cols-3 gap-8">
        <form class="col-span-2">
          <AddNewTodo
            onSubmit={onSubmit}
            newTodo={newTodo()}
            setNewTodo={setNewTodo}
            todos={todos}
          />
        </form>
        <div class="bg-gray-100 rounded-lg p-3">
          <div class="text-center font-bold text-lg">Added todo items</div>
          <div class=" max-h-96 overflow-y-auto">
            <Show
              when={todoElements().length}
              fallback={
                <div class="text-xl p-10 text-center uppercase text-black mt-20">
                  No item added yet...
                </div>
              }
            >
              <ul class="mt-5">
                <For each={todoElements()}>
                  {(todo) => <TodoItem {...todo} toggleItem={toggleItem} />}
                </For>
              </ul>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};
