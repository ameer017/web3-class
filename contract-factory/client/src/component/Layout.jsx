import React from "react";

const Layout = ({ children }) => {
  const updatedTime = new Date().getFullYear();
  return (
    <main className="w-full min-h-screen flex flex-col">
      {/* {header  } */}
      <header className="w-full h-20 flex justify-between items-center px-4 bg-stone-700">
        <h3 className="text-lg font-bold text-stone-200 ">AVOCET</h3>
        <appkit-button size="md" />
      </header>
      <section className="flex-1 p-8">{children}</section>

      <footer className="w-full h-20 flex justify-center items-center bg-stone-700">
        <p className="text-stone-300">
          AVOCET &copy; {updatedTime}. All Rights Reserved
        </p>
      </footer>
      {/* {Footer} */}
    </main>
  );
};

export default Layout;
