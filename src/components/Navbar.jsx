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
          <p className="font-black text-[1.2rem] leading-tight">
            HERITAGE <br /> APP
          </p>
        </div>
        <div className="flex flex-nowrap justify-end items-end gap-10 w-fit RIGHT">
          {menuItems.map((item, index) => {
            return (
              <div
                className="text-nowrap"
                onClick={() => {
                  navigate(item.link);
                }}
              >
                {item.display}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
