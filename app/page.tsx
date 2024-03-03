"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rocket } from "lucide-react";
import { todoStore } from "./store/store";
import { useState } from "react";
import {Suspense} from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TodoItem = React.lazy(()=>import("@/components/TodoItem"));

export default function Home() {
  const [todo, setTodo] = useState("");
  const { addTodo } = todoStore();
  const randomId = (): number => {
    const min = 1000;
    const max = 9999;
    return Math.round(Math.random() * (max - min + 1)) + min;
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!todo) return alert("Please enter a todo");
    if (todo.length > 0) {
      addTodo({
        id: randomId(),
        text: todo,
        completed: false,
      });
    }
    setTodo("");
  };

  return (
    <main>
      <div className="w-full bg-gray-500/10 h-40 text-center">
        <h1 className="underline text-blue-500 text-xl font-semibold pt-4">
          Welcome to Todo App
        </h1>
        <p className="text-3xl pt-10 font-semibold">Add your daily task 📝</p>
      </div>
      <form className="flex space-x-2 pt-16 w-5/6 mx-auto md:w-2/6">
        <Input
          placeholder="Add your todo here"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <Button type="submit" onClick={handleSubmit}>
          <Rocket />
        </Button>
      </form>
      <Suspense fallback={<Skeleton className="w-5/6 mx-auto md:w-2/6 h-30 mt-5 rounded-lg bg-slate-500"/>}>
      <TodoItem />
      </Suspense>
    </main>
  );
}
