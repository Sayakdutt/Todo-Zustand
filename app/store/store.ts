import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

type states = {
  todos: Array<TodoType> | [];
};
type Actions = {
  addTodo: (todo: TodoType) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
  toggleComplete: (id: number) => void;
};

export const todoStore = create<states & Actions>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        addTodo: (todo: TodoType) =>
          set((state) => ({ todos: [todo, ...state.todos] })),
        deleteTodo: (id: number) =>
          set((state) => ({
            todos: state.todos.filter((item) => item.id !== id),
          })),
        updateTodo: (
          id: number,
          text: string // Updated parameter name
        ) =>
          set((state) => ({
            todos: state.todos.map((item) =>
              item.id === id
                ? { ...item, text } // Preserve other properties
                : item
            ),
          })),

        toggleComplete: (id: number) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          }));
        },
      }),
      { name: "todoStore" }
    )
  )
);
