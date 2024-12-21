/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("false");

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError("true");
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <h1 className="text-center text-4xl font-bold  text-white my-4 py-4 px-20  ">
          Verify Your Email
        </h1>

        <h2 className="p-2 bg-orange-500 text-black">
          {token ? `${token}` : "no token"}
        </h2>

        {verified && (
          <div>
            <h2 className="text-sm text-green-600">
              Email Verified
              <Link href="/login">Login</Link>
            </h2>
          </div>
        )}

        {error && (
          <div>
            <h2 className="text-sm text-red-600">Email not verified</h2>
          </div>
        )}
      </div>
    );
}