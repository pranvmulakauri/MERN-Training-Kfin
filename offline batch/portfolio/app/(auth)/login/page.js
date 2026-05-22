"use client";
import InputField from "@/app/components/InputField";
import { useState } from "react";

import { useRouter } from "next/navigation";
import ProfileContext from "@/app/core/contexts/ProfileContext";

import { useContext } from "react";
export default function LoginPage() {
    const {storeDetails} = useContext(ProfileContext)
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col space-y-3 items-center">
      <p className="text-2xl text-purple-300">Login</p>
      <InputField
        placeholder={"Enter email"}
        type={"email"}
        inputValue={(value) => {
          setEmail(value);
        }}
      />
      <InputField
        placeholder={"Enter password"}
        type={"password"}
        inputValue={(value) => {
          setPassword(value);
        }}
      />

      <button
        onClick={async (event) => {
          fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(JSON.stringify(result));
              storeDetails(email,password)

              document.cookie = `token=${result.access}`

              router.push("/dashboard");

              //alert(JSON.stringify(result));
            })
            .catch((error) => {
              alert(JSON.stringify(error));
            });
        }}
        className="bg-purple-600 text-black text-xl p-4"
      >
        Login
      </button>
    </div>
  );
}
