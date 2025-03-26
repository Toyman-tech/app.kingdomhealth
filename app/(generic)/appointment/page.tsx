"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, FileText, Video, ChevronDown, LogOut } from "lucide-react"

export default function AppointmentDetails({ params }: { params: { id: string } }) {
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

  const handleBeginSession = () => {
    router.push("/session")
  }

  const handleReportIssue = () => {
    // In a real app, this would open a report issue form
    alert("Report issue functionality would open here")
  }

  // Mock appointment data - in a real app, this would be fetched based on the ID
  const appointment = {
    id: params.id,
    patientName: "Alice Smith",
    gender: "Female",
    date: "Monday Dec 2",
    time: "10:00 AM",
    minutesUntil: 4,
    ailment: "Frequent Migraine",
    note: "I'm having very bad migraines from past few days. It's now killing. I'm willing to get some dietary recommendation along with medicines.",
    documents: [
      {
        name: "Prescription.docx",
        size: "5MB",
        type: "docx",
      },
    ],
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
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium mb-8">Appointment Details</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            {/* Patient info card */}
            <div className="bg-[#f0fbfa] rounded-lg p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-medium">{appointment.patientName}</h2>
                  <p className="text-gray-600">{appointment.gender}</p>
                </div>
                <div className="px-3 py-1 bg-[#e6f7f5] text-[#30c7b5] rounded-md text-sm">
                  {appointment.minutesUntil} mins
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4">
                <div className="flex items-center">
                  <Calendar size={20} className="text-gray-400 mr-2" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={20} className="text-gray-400 mr-2" />
                  <span>{appointment.time}</span>
                </div>
              </div>
            </div>

            {/* Ailment section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Ailment</h3>
              <p className="text-gray-700">{appointment.ailment}</p>
            </div>

            {/* Note section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Note</h3>
              <p className="text-gray-700">{appointment.note}</p>
            </div>

            {/* Documents section */}
            <div>
              <h3 className="text-lg font-medium mb-4">Documents</h3>
              <div className="bg-gray-50 rounded-lg p-4 inline-block">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-3 rounded-lg mr-3">
                    <FileText size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.documents[0].name}</p>
                    <p className="text-gray-500 text-sm">{appointment.documents[0].size}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3">
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-[#f0fbfa] rounded-full flex items-center justify-center mb-6">
                <Video size={36} className="text-[#30c7b5]" />
              </div>

              <button
                onClick={handleBeginSession}
                className="w-full bg-[#30c7b5] text-white py-3 rounded-md hover:bg-[#2ab3a2] transition-colors mb-4"
              >
                Begin Session
              </button>

              <button
                onClick={handleReportIssue}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors"
              >
                Report an Issue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

