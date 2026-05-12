"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  BadgeDollarSign,
  PersonStandingIcon,
  SquareUserRound,
  NotebookIcon,
  Settings2Icon,
  LogOutIcon,
} from "lucide-react";
export default function SideBar() {
  const [activeMainItem, setActiveMainItem] = useState("Dashboard");
  return (
    <div className="relative w-[300px] bg-white h-full flex flex-col px-6 py-5 justify-start">
      <div className="font-bold text-2xl mt-4">KFin Wings</div>

      <div className="flex flex-col">
        <div className="text-gray-400 pt-[50px]">MAIN MENU</div>
        <HeaderItem
          icon={<LayoutDashboard />}
          title={"Dashboard"}
          activeItem={activeMainItem}
          setActiveItem={(title) => setActiveMainItem(title)}
        />
        <HeaderItem
          icon={<PersonStandingIcon />}
          title={"Investors"}
          activeItem={activeMainItem}
          setActiveItem={(title) => setActiveMainItem(title)}
        />

        <HeaderItem
          icon={<BadgeDollarSign />}
          title={"Create SIP"}
          activeItem={activeMainItem}
          setActiveItem={(title) => setActiveMainItem(title)}
        />

        <HeaderItem
          icon={<NotebookIcon />}
          title={"View Transactions"}
          activeItem={activeMainItem}
          setActiveItem={(title) => setActiveMainItem(title)}
        />

        <div className="text-gray-400 pt-[20px]">TEAMS</div>
        <HeaderItem
          icon={<div className="w-2 h-2 rounded-full bg-red-500"></div>}
          title={"Advisors"}
          activeItem={activeMainItem}
          setActiveItem={(title) => setActiveMainItem(title)}
        />
        <HeaderItem
          icon={<div className="w-2 h-2 rounded-full bg-purple-500"></div>}
          title={"Support"}
          activeItem={activeMainItem}
          setActiveItem={(title) => setActiveMainItem(title)}
        />
      </div>
      <div className="flex flex-col absolute bottom-2 pb-5">
        
        <HeaderItem
          icon={<Settings2Icon />}
          title={"Settings"}
          activeItem={activeMainItem}
          setActiveItem={(title) => setActiveMainItem(title)}
        />
        <HeaderItem
          icon={<LogOutIcon />}
          title={"Logout"}
          activeItem={activeMainItem}
          setActiveItem={(title) => setActiveMainItem(title)}
        />
      </div>
    </div>
  );
}

function HeaderItem({ icon, title, activeItem, setActiveItem }) {
  return (
    <div
      className={`flex flex-row space-x-3 my-2 items-center
         ${
           activeItem == title
             ? "font-bold text-black text-lg"
             : "font-medium text-gray-400"
         }`}
      onClick={(event) => {
        setActiveItem(title);
      }}
    >
      <div>{icon}</div>
      <div>{title}</div>
    </div>
  );
}
