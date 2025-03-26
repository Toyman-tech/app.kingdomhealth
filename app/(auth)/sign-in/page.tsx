"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function DoctorSignIn() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would authenticate with a backend
    console.log("Sign in attempt with:", email, password)

    // Redirect to doctor home page after sign in
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/king.jpeg"
                alt="MediCare Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-2xl font-medium">KHealth</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-[#30c7b5] p-4 rounded-xl">
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM20 36.3636C10.9636 36.3636 3.63636 29.0364 3.63636 20C3.63636 10.9636 10.9636 3.63636 20 3.63636C29.0364 3.63636 36.3636 10.9636 36.3636 20C36.3636 29.0364 29.0364 36.3636 20 36.3636Z"
                  fill="currentColor"
                />
                <path
                  d="M28.1818 16.3636H23.6364V11.8182C23.6364 10.2727 22.3636 9 20.8182 9H19.1818C17.6364 9 16.3636 10.2727 16.3636 11.8182V16.3636H11.8182C10.2727 16.3636 9 17.6364 9 19.1818V20.8182C9 22.3636 10.2727 23.6364 11.8182 23.6364H16.3636V28.1818C16.3636 29.7273 17.6364 31 19.1818 31H20.8182C22.3636 31 23.6364 29.7273 23.6364 28.1818V23.6364H28.1818C29.7273 23.6364 31 22.3636 31 20.8182V19.1818C31 17.6364 29.7273 16.3636 28.1818 16.3636Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-medium text-center mb-8">Sign in to your account</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@medicare.com"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#30c7b5] text-white py-3 rounded-md hover:bg-[#2ab3a2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:ring-offset-2"
              >
                Sign In
              </button>

              <div className="text-center text-gray-500">or</div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/doctor/signup" className="text-[#30c7b5] hover:underline">
                Sign up
              </Link>
            </p>
            <Link href="/forgot-password" className="text-[#30c7b5] hover:underline block mt-2">
              Forgot password?
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

