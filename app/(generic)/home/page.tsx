"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LogOut, ChevronDown, Video } from "lucide-react"

export default function DoctorHome() {
    const router = useRouter()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [currentTime, setCurrentTime] = useState(new Date())

    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    // Update current time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    const handleLogout = () => {
        // In a real app, this would handle logout logic
        router.push("/signin")
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    const formatTime = (timeString: string) => {
        return timeString
    }

    const upcomingSessions = 5
    const completedSessions = 1

    const nextSession = {
        patientName: "Alice Smith",
        time: "9:00 AM",
        minutesUntil: 4,
    }

    const todaysSchedule = [
        {
            id: 1,
            patientName: "John Doe",
            time: "09:30 AM",
            status: "Upcoming",
        },
        {
            id: 2,
            patientName: "Alice Smith",
            time: "10:15 AM",
            status: "Upcoming",
        },
        {
            id: 3,
            patientName: "Robert Brown",
            time: "11:00 AM",
            status: "Upcoming",
        },
        {
            id: 4,
            patientName: "Robert Brown",
            time: "11:00 AM",
            status: "Upcoming",
        },
        {
            id: 5,
            patientName: "Robert Brown",
            time: "11:00 AM",
            status: "Upcoming",
        },
    ]

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
                            <Link href="/home" className="text-[#30c7b5] font-medium">
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
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h1 className="text-2xl font-medium">
                        Welcome back, <span className="font-semibold">Dr Alex Zender</span>
                    </h1>

                    <div className="flex items-center mt-2 md:mt-0">
                        <span className="text-gray-600">{formatDate(currentTime)}</span>
                        <ChevronDown size={16} className="ml-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-4xl font-medium text-[#30c7b5] mb-2">{upcomingSessions}</h2>
                        <p className="text-gray-600">Upcoming Sessions</p>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-4xl font-medium text-[#30c7b5] mb-2">{completedSessions}</h2>
                        <p className="text-gray-600">Completed Session</p>
                    </div>
                </div>
                <div className=" w-full justify-center flex flex-col md:flex-row gap-3">
                    <div className="w-full bg-[#f7fdfc] border border-[#e6f7f5] rounded-lg p-6 mb-8">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                                <Video size={20} className="text-[#30c7b5] mr-2" />
                                <h3 className="text-lg font-medium">Next session</h3>
                            </div>
                            <div className="text-gray-500">In {nextSession.minutesUntil} mins</div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-xl font-medium">{nextSession.patientName}</h4>
                            <p className="text-gray-600">{nextSession.time}</p>
                        </div>

                        <button
                            className="w-full bg-[#30c7b5] text-white py-3 rounded-md hover:bg-[#2ab3a2] transition-colors"
                            onClick={() => router.push("/appointment")}
                        >
                            Start Session
                        </button>
                    </div>

                    <div className="w-full bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-medium">Today's schedule</h3>
                            <Link href="/schedule" className="text-[#30c7b5] hover:underline">
                                See All
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {todaysSchedule.map((appointment) => (
                                <div key={appointment.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <div>
                                        <h4 className="font-medium">{appointment.patientName}</h4>
                                        <p className="text-gray-600">{appointment.time}</p>
                                    </div>
                                    <div className="px-4 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{appointment.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

