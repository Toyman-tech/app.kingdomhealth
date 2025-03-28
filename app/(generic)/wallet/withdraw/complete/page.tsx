"use client"
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Withdraw = () => {

    const router = useRouter()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
 
  
    // Simulate loading state
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
  
      return () => clearTimeout(timer)
    }, [])
  
    const handleLogout = () => {
      // In a real app, this would handle logout logic
      router.push("/doctor/signin")
    }
    const handleClick = ()=>{
        router.push('/wallet/withdraw/otp')
    }
  
    if (isLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#30c7b5]"></div>
          </div>
        )
      }
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/home" className="flex items-center">
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

                    <div className="flex items-center space-x-8">
                        <nav className="hidden md:flex space-x-8">
                            <Link href="/home" className="text-gray-600 font-medium">
                                Home
                            </Link>
                            <Link href="/wallet" className="text-[#30c7b5] hover:text-gray-900">
                                Wallet
                            </Link>
                            <Link href="/history" className="text-gray-600 hover:text-gray-900">
                                History
                            </Link>
                        </nav>
                    </div>
                    {/* 3rd */}
                    <div className="relative">
                        <button className="flex items-center space-x-2" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                    src="/dp1.png"
                                    alt="Doctor profile"
                                    width={40}
                                    height={40}
                                    className="bg-gray-200"
                                />
                            </div>
                            <ChevronDown size={16} />
                        </button>

                        {isProfileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Profile
                                </Link>
                                <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                                >
                                    <LogOut size={16} className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className="max-w-2xl mx-auto px-4 py-8 md:mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Withdraw</h2>
                <div className="flex  flex-col max-w-2xl  p-6 border rounded-xl shadow-sm justify-center">
                    {/* Recipient Info */}
                    <div className="p-4 mb-4 bg-blue-50 rounded-lg text-center">
                        <p className="font-semibold">Aniston Zenifer</p>
                        <p className="text-sm text-gray-500">2286421122 &bull; Zenith Bank</p>
                    </div>

                    {/* Amount Input */}
                    <label className="block text-sm font-medium text-gray-600 mb-2">Amount</label>
                    <div className="relative mb-4">
                        <input
                            type="text"
                            value="500.00"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <span className="absolute right-3 top-3 text-gray-500">$</span>
                    </div>

                    {/* Balance */}
                    <p className="text-sm text-gray-400">Balance <span className="text-blue-500">$1280.82</span></p>

                    {/* Continue Button */}
                    <button className="w-full mt-6 p-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition"
                    onClick={handleClick}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
