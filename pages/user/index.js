// User login page

import React, { useEffect, useState } from "react"
import app from "../../firebase/ClientApp"
import { getAuth } from "firebase/auth"
import { useRouter } from "next/router"
import Link from "next/link"

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const auth = getAuth(app)
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)
  const router = useRouter()

  useEffect(() => {
    if (user && !loading) {
      router.push("/")
    }
  }, [user, loading, router])

  if (error) {
    console.log(error)
  }

  if (loading) {
    console.log("loading")
  }

  return (
    <div className="grid h-screen, place-items-center p-20">
      <div className="grid w-1/2 p-10 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-black">Login</h1>
        <div className="p-3">
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-black"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="p-3">
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-black"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="p-3">
          <button
            onClick={() => signInWithEmailAndPassword(email, password)}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </div>
        <div className="text-orange-500">
          New Here?{" "}
          <Link href="/user/new">
            <a className="text-green-600">Create an account</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
