import { Box, Button, Text } from "@radix-ui/themes";
import React from "react";

const Layout = ({ children }) => {
  const updatedTime = new Date().getFullYear();
  return (
    <main className="w-full min-h-screen flex flex-col bg-stone-950">
      {/* {header  } */}
      <header className="w-full h-20 flex justify-between items-center px-4 bg-amber-600">
        <h3 className="text-lg font-bold text-stone-900 ">Todo dApp</h3>
        <appkit-button size="md" />
      </header>
      <section className="flex-1">{children}</section>

      <footer className="w-full h-20 flex justify-center items-center bg-stone-600">
        <p className="text-stone-300">
          Todo dApp &copy; {updatedTime}. All Rights Reserved
        </p>
      </footer>
      {/* {Footer} */}
    </main>
  );
};

export default Layout;
