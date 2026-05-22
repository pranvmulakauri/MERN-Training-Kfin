"use client";
import { useContext, createContext, useState } from "react";

//Create a Global State
const AuthenticationContext = createContext();

export function useAuth(){
    return useContext(AuthenticationContext);
}

export default function AuthProvider({ children }) {
  const [profile, setProfile] = useState({});

  //get profile
  function getProfile() {
    return profile
  }
  //create profile
  function createProfile(pan, first_name, last_name) {
    
    setProfile({
        first_name:first_name,
        last_name:last_name,
        pan:pan
    })
  }
  //update profile
  function updateProfile() {}
  return (
    <AuthenticationContext.Provider value={{ getProfile, createProfile }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
