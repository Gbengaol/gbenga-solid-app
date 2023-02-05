import { Component } from "solid-js";
import { useTodoContext } from "../context/todo.context";
import { Todo } from "../types";
import { RiDesignPencilLine, RiSystemDeleteBin2Fill } from "solid-icons/ri";

export const TodoItem: Component<Todo> = (props) => {
  const {
    actions: { toggleItem, setItemToDelete, setItemToEdit, onTextChange },
  } = useTodoContext();

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
          onClick={() => toggleItem(props.id)}
        >
          <input
            type="checkbox"
            class="mr-5 h-6 w-6 rounded accent-green-600 cursor-pointer"
            checked={props.completed}
          />
        </label>
        <div>{props.title}</div>
      </div>
      <div class="text-black flex justify-end mb-2">
        <RiDesignPencilLine
          class="text-2xl ml-3 cursor-pointer hover:scale-125"
          onClick={() => {
            setItemToEdit(props.id);
            onTextChange(props.title);
          }}
        />
        <RiSystemDeleteBin2Fill
          class="text-2xl ml-3 cursor-pointer hover:scale-125"
          onClick={() => setItemToDelete(props.id)}
        />
      </div>
    </li>
  );
};
