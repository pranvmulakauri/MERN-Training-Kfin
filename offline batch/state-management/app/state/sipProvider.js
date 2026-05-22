"use client";
import { useContext, createContext, useState } from "react";

//Create a Global State
const SIPContext= createContext();

export function useSIP(){
    return useContext(SIPContext);
}

export default function SipProvider({ children }) {
  const [funds, setFunds] = useState([{
    'name': '',
    'sector': '',
    'financials': [
        
    ]
  }]);

  return (
    <SIPContext.Provider value={{ funds }}>
      {children}
    </SIPContext.Provider>
  );
}
