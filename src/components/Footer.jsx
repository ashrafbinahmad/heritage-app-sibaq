import React from "react";
import { menuItems } from "../pages/Home";

export default function Footer() {
  return (
    <footer className="bg-green-950 py-[20px] text-white">
      <div>
        <ul className="text-center">
          {menuItems.map((item, index) => {
            return <li>{item.display}</li>;
          })}
        </ul>
        <p className="mt-10 text-[#2e752e] text-center">Copyrights reserved</p>
      </div>
    </footer>
  );
}
