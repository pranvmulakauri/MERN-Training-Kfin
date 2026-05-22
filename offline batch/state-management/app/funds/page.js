"use client";
import { sipStore } from "../stores/sipStore";

import React from "react";

export default function SIPPage() {
  const { funds, sipInititated, startSIP } = sipStore();
  return (
    <div className="flex flex-col">
      <div>SIP Available Funds</div>
      {funds.map((fund, index) => {
        return (
          <div key={index} className="flex flex-row p-2 bg-green-200">
            <div>{fund.name}</div>
            <div
              className="bg-red-400 p-2"
              onClick={(event) => {
                startSIP(fund);
              }}
            >
              Start
            </div>
          </div>
        );
      })}

      <div>SIP started Funds</div>
      {sipInititated.map((fund, index) => {
        return (
          <div key={index} className="flex flex-row p-2 bg-green-200">
            <div>{fund.name}</div>
            <div className="bg-red-400 p-2">Start</div>
          </div>
        );
      })}
    </div>
  );
}
