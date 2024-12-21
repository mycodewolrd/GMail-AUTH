/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const router = useRouter()
  const logout = async() => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logged out successfully!")
      router.push("/login")
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-center text-3xl sm:text-6xl font-bold bg-slate-600 text-white my-4 py-4 px-20 rounded-3xl ">
        Your Profile Page
      </h1>
      <button
        className="my-4 px-6 py-2 bg-slate-400 text-slate-950 rounded-2xl hover:bg-white hover:text-green-600 hover:scale-110 font-bold"
        onClick={logout}
      >Log Out
      </button>
    </div>
  );
}
