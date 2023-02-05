import { For, createMemo, Show } from "solid-js";
import Modalcomponent from "../components/Modal.component";
import { useTodoContext } from "../context/todo.context";
import { AddNewTodo } from "./AddNewTodo";
import { TodoItem } from "./TodoItem";

export const TodoApp = () => {
  const { state } = useTodoContext();

  const todoElements = createMemo(() =>
    state.todos?.filter((el) => el.title?.length)
  );

  return (
    <div class="border-green-900 border-2 p-8 rounded-3xl">
      <div class="flex flex-wrap md:flex-nowrap justify-center gap-8 w-full">
        <div class="w-full md:w-2/3">
          <AddNewTodo />
        </div>
        <div class="w-full md:w-1/3 bg-gray-100 rounded-lg p-3 col-span-1">
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
                  {(todo) => <TodoItem {...todo} />}
                </For>
              </ul>
            </Show>
          </div>
          {state.deleteId?.length ? <Modalcomponent /> : null}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
