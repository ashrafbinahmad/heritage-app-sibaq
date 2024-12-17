import {
  Archive,
  ArchiveRounded,
  CalendarTodayRounded,
  Logout,
  MapRounded,
  Restaurant,
  RestaurantRounded,
} from "@mui/icons-material";
import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import AuthStateMonitor from "./GoogleAuthMonitor";

const menuItems = [
  // {
  //   display: "Locations",
  //   link: "/admin/locations",
  //   icon: <MapRounded />,
  // },
  {
    display: "Archives",
    link: "/admin/archives",
    icon: <ArchiveRounded />,
  },
  {
    display: "Special days",
    link: "/admin/specialdays",
    icon: <CalendarTodayRounded />,
  },
  {
    display: "Halal hotels",
    link: "/admin/halalhotels",
    icon: <RestaurantRounded />,
  },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  return (
    <>
      <AuthStateMonitor>
        <div className="grid grid-cols-[15rem_auto] h-[100dvh] overflow-hidden">
          <div className="top-0 bg-[#227543] w-full text-white SIDE_BAR">
            <div className="HEAD">
              <img
                className="m-auto mt-[2rem] w-[150px]"
                src="/images/logo.png"
                alt=""
              />
            </div>
            <ul className="mt-[5rem]">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    navigate(item.link);
                  }}
                  className={`flex items-center gap-4 px-5 py-4 text-lg cursor-pointer ${
                    window.location.pathname === item.link
                      ? "bg-[#12582d]"
                      : "hover:bg-green-800 "
                  }`}
                >
                  {" "}
                  {item.icon} {item.display}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#D0EED1] overflow-auto">{children}</div>
        </div>
      </AuthStateMonitor>
    </>
  );
}

export function AdminPageHead({ pageTitle }) {
  return (
    <div className="bg-white px-2 py-4 text-black HEAD">
      <div className="grid grid-cols-[auto_max-content] m-auto max-w-[1250px]">
        <h1 className="font-bold text-3xl">{pageTitle}</h1>

        <div className="RIGHT">
          <Button className={"bg-white "}>
            {" "}
            Logout <Logout />
          </Button>
        </div>
      </div>
    </div>
  );
}
