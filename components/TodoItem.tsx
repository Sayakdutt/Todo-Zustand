"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SquarePen,
  Trash,
} from "lucide-react";
import { todoStore } from "@/app/store/store";
import { useState } from "react";

const TodoItem = () => {
  const [toggle, setToggle] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const { todos, deleteTodo, updateTodo, toggleComplete } = todoStore();
  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };
  const handleSaveEdit = () => {
    setToggle(!toggle);
    if (editText.trim() != "") {
      updateTodo(editId!, editText);
      setEditId(null);
      setEditText("");
    }
  };
  return (
    <div className="w-full pt-8 max-h-96">
      {todos.length > 0 &&
        todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center space-x-2 mb-3 w-5/6 mx-auto md:w-1/3"
          >
            {editId === todo.id ? (
              <>
                <Input
                  type="text"
                  className="border rounded-md p-2 mr-2"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleSaveEdit}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                <span
                  className={todo.completed ? "line-through w-full" : "w-full"}
                >
                  {todo.text}
                </span>
                <button
                  className="ml-auto text-blue-500"
                  onClick={() => handleEdit(todo.id, todo.text)}
                >
                  <SquarePen />
                </button>
                <Button
                  variant={"destructive"}
                  className="ml-2"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash />
                </Button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default TodoItem;
