import React from "react";
import Todo from "./Todo";
import { Text } from "@radix-ui/themes";

const Todos = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Text as="h1" classNametext-3xl font-semibold text-amber-600>
        My Todos
      </Text>
      <section className="w-full grid lg:grid-cols-3 gap-4 md:grid-cols-2 md:gap-6">
        <Todo />
      </section>
    </div>
  );
};

export default Todos;
