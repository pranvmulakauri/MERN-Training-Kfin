"use client";
import React from "react";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
export default function DashHeader() {
  const [activeItem, setActiveItem] = useState("Full Statistics");
  return (
    <div className="relative w-full flex flex-row py-4 px-2 items-center">
      <div className="text-2xl font-bold ml-[50px] mr-[100px]">Analytics</div>
      <div
        className="flex flex-row w-[350px]
       bg-gray-300 justify-evenly
        items-center py-1 font-bold text-lg rounded-full"
      >
        <div
          className={
            activeItem == "Full Statistics"
              ? "bg-white py-1 px-6 rounded-full"
              : null
          }
          onClick={(event) => {
            setActiveItem("Full Statistics");
          }}
        >
          Full Stastics
        </div>
        <div
          className={
            activeItem == "Total Summary"
              ? "bg-white py-1 px-6 rounded-full"
              : null
          }
          onClick={(event) => {
            setActiveItem("Total Summary");
          }}
        >
          Total Summary
        </div>
      </div>
      <div className="absolute right-2 flex flex-row items-center justify-center space-x-3">
        <div className="p-4 bg-white rounded-2xl border-gray-400">
          <PlusIcon />
        </div>
        <div className="p-7 bg-red-300 rounded-full"></div>
      </div>
    </div>
  );
}
