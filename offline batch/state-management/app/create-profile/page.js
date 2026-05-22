"use client";
import React, { useState } from "react";
import { useAuth } from "../state/authProvider";
export default function page() {
  const { createProfile } = useAuth();
  const [pan, setPan] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  return (
    <div className="flex flex-col items-center justify-center">
      <input className="p-2 border-2 bg-purple-300" placeholder="Pan Card No" />
      <input className="p-2 border-2 bg-purple-300" placeholder="First Name" />
      <input className="p-2 border-2 bg-purple-300" placeholder="Pan Card No" />
    </div>
  );
}
