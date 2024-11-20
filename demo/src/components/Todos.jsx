import React from "react";
import Todo from "./Todo";
import { Text } from "@radix-ui/themes";
import {useTodo} from "../contexr/todoContext"

const Todos = () => {
  const {todos} = useTodo()
  return (
    <div className="w-full flex flex-col gap-4">
      <Text as="h1" className="text-3xl font-semibold text-amber-600">
        My Todos
      </Text>
      <section className="w-full grid lg:grid-cols-3 gap-4 md:grid-cols-2 md:gap-6">
        {todos.length === 0 ? 
          <Text as="h1" className="text-2xl font-medium text-stone-200">
        There are no available todos
      </Text> :
      todos.map((todo, index) => (

        <Todo key={index} todo={todo} index={index} />
      ))
        }
      </section>
    </div>
  );
};

export default Todos;
