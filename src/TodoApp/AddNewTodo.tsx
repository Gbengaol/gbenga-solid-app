import { createResource, For, Match, Switch } from "solid-js";
import { useTodoContext } from "../context/todo.context";
import { Todo } from "../types";
import { RiSystemCheckDoubleFill } from "solid-icons/ri";
import { TiTimes } from "solid-icons/ti";

let inputFieldRef: HTMLInputElement;

export const AddNewTodo = () => {
  const {
    state,
    actions: { onSubmit, onTextChange, setItemToEdit },
  } = useTodoContext();

  const [todosData] = createResource<Array<Todo>>(async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((result) => result);
  });
  return (
    <div class="w-full flex flex-col justify-between">
      <form>
        <div class="flex mb-5">
          <input
            type="text"
            class="w-3/4 p-2 mr-5 border-green-300 hover:border-green-500 focus-visible:border-green-700 border-2 rounded-lg focus:outline-0"
            value={state.newTodo.title}
            onInput={(e) => {
              onTextChange(e.currentTarget.value);
            }}
            ref={inputFieldRef}
            autofocus
            placeholder="Enter new todo item..."
          />

          {state.editId && (
            <button
              type="button"
              class="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg hover:bg-green-500 mr-2 text-white"
              onClick={() => setItemToEdit("")}
            >
              <TiTimes />
            </button>
          )}
          <button
            type="submit"
            class="bg-green-500 px-8 py-3 rounded-lg hover:bg-green-600 disabled:cursor-not-allowed text-white"
            disabled={!state.newTodo.title?.length}
            onClick={(e) => {
              e.preventDefault();
              onSubmit();
              inputFieldRef.focus();
            }}
          >
            {state.editId ? <RiSystemCheckDoubleFill /> : "Add Todo"}
          </button>
        </div>
      </form>
      <div>
        <h4 class="font-bold mb-3">Suggestions below: </h4>
        <div class="max-h-80 overflow-y-auto py-2">
          <Switch
            fallback={
              <For
                each={todosData()
                  ?.filter(
                    (el: Todo) =>
                      !state.todos.some((item) => item.title === el.title)
                  )
                  ?.slice(0, 20)}
              >
                {(todo) => (
                  <div
                    onClick={() => {
                      if (state.editId) return;
                      onTextChange(todo.title);
                    }}
                    class={`${
                      state.editId ? "cursor-not-allowed" : "cursor-pointer"
                    } p-2 mb-2 hover:bg-gray-100 ${
                      state.newTodo.title === todo.title
                        ? "bg-gray-400 text-white rounded-sm"
                        : ""
                    }`}
                  >
                    {todo.title}
                  </div>
                )}
              </For>
            }
          >
            <Match when={todosData.loading}>
              <div class="text-center p-20 text-lg uppercase text-green-300 animate-wiggle">
                Loading...
              </div>
            </Match>
            <Match when={todosData.error}>
              <div class="text-center p-20 text-lg uppercase text-red-700">
                An error occured
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};
