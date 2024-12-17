import React from "react";
import { menuItems } from "../pages/Home";
import { useNavigate } from "react-router-dom";

export default function Navbar({ className }) {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <nav
        className={
          "justify-between grid grid-cols-[auto_min-content] sticky top-0 w-full max-w-[1300px] text-white m-auto "
        }
      >
        <div className="w-full LEFT">
          <a href="/">
            <p className="font-black text-[1.2rem] leading-tight">
              HERITAGE <br /> APP
            </p>
          </a>
        </div>
        <div className="flex flex-nowrap justify-end items-end w-fit RIGHT">
          {menuItems.map((item, index) => {
            return (
              <a href={item.link}>
                <div
                  className="hover:bg-green-950 p-3 rounded text-nowrap transition-all cursor-pointer"
                  onClick={() => {
                    document.getElementById(item.id).scrollIntoView();
                    navigate(item.link);
                  }}
                >
                  {item.display}
                </div>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
