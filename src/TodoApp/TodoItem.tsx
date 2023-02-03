import { Component } from "solid-js";
import { Todo } from "./TodoApp";

type TodoItemProps = Todo & {
  toggleItem: (id: string) => void;
};

export const TodoItem: Component<TodoItemProps> = (props) => {
  return (
    <li
      class={`border-b-2 mb-4 border-grey-900 ${
        props.completed
          ? "text-yellow-800 line-through"
          : "text-green-800 no-underline"
      }`}
    >
      <div class="mb-2 w-full flex items-start">
        <label
          class="inline-flex cursor-pointer"
          onClick={() => props.toggleItem(props.id)}
        >
          <input
            type="checkbox"
            class="mr-5 h-6 w-6 rounded accent-green-600 cursor-pointer"
            checked={props.completed}
          />
          <div>{props.title}</div>
        </label>
      </div>
    </li>
  );
};
