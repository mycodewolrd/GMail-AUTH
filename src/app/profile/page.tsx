/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";




export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing")
  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logged out successfully!")
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id)
  }


  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="text-center text-3xl sm:text-6xl font-bold bg-slate-600 text-white my-4 py-4 px-20 rounded-3xl ">
        Your Profile Page
      </h1>

      <h2 className="text-2xl font-bold my-4 p-3 border-2 rounded-xl">
        {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>
        {data}
        </Link>}
      </h2>
      <button
        className="my-4 px-6 py-2 bg-slate-400 text-slate-950 rounded-2xl hover:bg-white hover:text-green-600 hover:scale-110 font-bold"
        onClick={logout}
      >
        Log Out
      </button>


      <button
        className="my-5 px-8 py-1 rounded-lg hover:scale-105 hover:bg-green-600 bg-green-400 hover:font-semibold text-black"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}
