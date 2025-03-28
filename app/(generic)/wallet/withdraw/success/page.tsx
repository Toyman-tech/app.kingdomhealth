"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, LogOut, Upload, Plus, X, Check } from "lucide-react"
import { Button } from "@mui/material"

export default function WithdrawSuccess({ params }: { params: { id: string } }) {
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
        router.push("/signin")
    }
    const nextPage = () => {
        router.push("/wallet/transaction")
    }
    const homeRoute = () => {
        router.push('/home')
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
                            <Link href="/wallet" className="text-gray-600 hover:text-gray-900">
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

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-4 py-8 mt-10">
                <div className="w-full max-w-xl mx-auto">
                    <div className="bg-gray-50 p-12 rounded-lg text-center">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 bg-[#e6f7f5] rounded-full opacity-30 animate-ping"></div>
                            <div className="absolute inset-2 bg-[#e6f7f5] rounded-full opacity-50"></div>
                            <div className="relative flex items-center justify-center w-16 h-16 mx-auto bg-[#00c853] rounded-full">
                                <Check className="text-white" fontSize="large" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-medium mb-4">Withdrawal  Successful</h2>

                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Your withdrawal of $200 to Aniston Zenifer has been completed.
                        </p>

                        <div className="flex flex-col gap-3">
                            <Button
                                variant="contained"
                                onClick={nextPage} // Reset to first step
                                className="px-12 py-3 normal-case"
                                sx={{
                                    backgroundColor: "#30c7b5",
                                    "&:hover": {
                                        backgroundColor: "#2ab3a2",
                                    },
                                    borderRadius: "6px",
                                    textTransform: "none",
                                    padding: "12px 32px",
                                }}
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

