"use client"
import { useContext } from "react"
import profileContext from '../core/contexts/ProfileContext'
export default function InvestorDetailPage()
{
    const {email,password} = useContext(profileContext);
    return <div>
       <div>
        {email}
       </div>
       <div>
        {password}
       </div>
    </div>
}