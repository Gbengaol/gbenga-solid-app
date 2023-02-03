import { Accessor, Component, createResource, For, Setter } from "solid-js";
import { Todo } from "./TodoApp";

type AddNewTodoProps = {
  newTodo: Todo;
  setNewTodo: Setter<Todo>;
  onSubmit: (
    e: MouseEvent & {
      currentTarget: HTMLButtonElement;
      target: Element;
    }
  ) => void;
  todos: Accessor<Todo[]>;
};

export const AddNewTodo: Component<AddNewTodoProps> = (props) => {
  const [todosData] = createResource<Array<Todo>>(async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((result) => result);
  });
  return (
    <div class="w-full flex flex-col justify-between">
      <div class="flex mb-5">
        <input
          type="text"
          class="w-3/4 p-2 mr-5 border-green-300 hover:border-green-500 focus-visible:border-green-700 border-2 rounded-lg"
          value={props.newTodo.title}
          onInput={(e) =>
            props.setNewTodo({
              ...props.newTodo,
              title: e.currentTarget.value,
            })
          }
          placeholder="Enter new todo item..."
        />

        <button
          type="submit"
          class="bg-green-200 px-8 py-3 rounded-lg hover:bg-green-500 disabled:cursor-not-allowed"
          onClick={props.onSubmit}
          disabled={!props.newTodo.title?.length}
        >
          Add Todo
        </button>
      </div>
      <div>
        <h4 class="font-bold mb-3">Suggestions below: </h4>
        <div class="max-h-80 overflow-y-auto py-2">
          {todosData.loading ? (
            <div class="text-center p-20 text-lg uppercase text-green-300 animate-wiggle">
              Loading...
            </div>
          ) : todosData.error ? (
            <div class="text-center p-20 text-lg uppercase text-red-700">
              An error occured
            </div>
          ) : (
            <For
              each={todosData()
                ?.filter(
                  (el: Todo) =>
                    !props.todos().some((item) => item.title === el.title)
                )
                ?.slice(0, 20)}
            >
              {(todo) => (
                <div
                  onClick={() =>
                    props.setNewTodo({
                      ...props.newTodo,
                      title: todo.title,
                    })
                  }
                  class={`cursor-pointer p-2 mb-2 hover:bg-gray-100 ${
                    props.newTodo.title === todo.title
                      ? "bg-gray-400 text-white rounded-sm"
                      : ""
                  }`}
                >
                  {todo.title}
                </div>
              )}
            </For>
          )}
        </div>
      </div>
    </div>
  );
};
