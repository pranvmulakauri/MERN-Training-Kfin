"use client";
import SideBar from "../components/dashboard/SideBar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
export default function Dashboard() {
  const [sip, setSip] = useState([]);

  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  //   useEffect(() => {
  //     alert("Hello");
  //   }, [sip]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col p-4 bg-white m-8 rounded-[30px] shadow-xl py-8">
        <div className="flex flex-row justify-between items-center">
          <div className="font-bold text-2xl">Hi {name} Transaction's!</div>
          <div>
            <input
              placeholder="Search"
              className="border-1 border-gray-300 rounded-md p-2"
              onChange={(event) => {
                setSip([...sip, event.target.value]);
              }}
            />
          </div>
        </div>
        <hr className="h-px my-8 bg-neutral-quaternary border-0"></hr>
        <table className="p-3 border-spacing-2">
          <thead className=" text-center p-2 mb-2">
            <tr className="border-b-[1px] border-t-[1px] border-gray-400">
              <th className="py-3">Txn. Id</th>
              <th className="py-3">Investor Id</th>
              <th className="py-3">Portfolio Id</th>
              <th className="py-3">Txn. amount</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody className=" text-center p-1">
            <tr className="border-b-[1px] border-gray-300">
              <td className="py-3">
                {" "}
                <span>
                  <input
                    className="w-4 h-4 mr-2 border-gray-400"
                    type="checkbox"
                  />
                </span>
                1
              </td>
              <td className="py-3">2</td>
              <td className="py-3">2</td>
              <td className="py-3">10000 INR</td>

              <td className="py-3">
                <span className="bg-green-300 px-3 py-1 rounded-full inline-block w-[100px] text-center">
                  Success
                </span>
              </td>
            </tr>

            <tr className="border-b-[1px] border-gray-300">
              <td className="py-3">
                {" "}
                <span>
                  <input
                    className="w-4 h-4 mr-2 border-gray-400"
                    type="checkbox"
                  />
                </span>
                1
              </td>
              <td className="py-3">2</td>
              <td className="py-3">2</td>
              <td className="py-3">10000 INR</td>

              <td className="py-3">
                <span className="bg-green-300 px-3 py-1 rounded-full inline-block w-[100px] text-center">
                  Success
                </span>
              </td>
            </tr>

            <tr className="border-b-[1px] border-gray-300">
              <td className="py-3">
                {" "}
                <span>
                  <input
                    className="w-4 h-4 mr-2 border-gray-400"
                    type="checkbox"
                  />
                </span>
                1
              </td>
              <td className="py-3">2</td>
              <td className="py-3">2</td>
              <td className="py-3">10000 INR</td>

              <td className="py-3">
                <span className="bg-green-300 px-3 py-1 rounded-full inline-block w-[100px] text-center">
                  Success
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
