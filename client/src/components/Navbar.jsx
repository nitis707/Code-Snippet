import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-16 border-b">
      <h1 className="font-bold text-2xl">Code Snippet</h1>
      <button className="bg-white text-black py-1 px-2 rounded">Logout</button>
    </div>
  );
};

export default Navbar;
