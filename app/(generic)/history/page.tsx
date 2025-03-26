"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Calendar, Clock, LogOut } from "lucide-react"

export default function AppointmentHistory() {
  const router = useRouter()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedAppointment, setExpandedAppointment] = useState<number | null>(201)
  const [showSummary, setShowSummary] = useState(false)

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

  const toggleAppointment = (id: number) => {
    if (expandedAppointment === id) {
      setExpandedAppointment(null)
      setShowSummary(false)
    } else {
      setExpandedAppointment(id)
      setShowSummary(false)
    }
  }

  const toggleSummary = () => {
    setShowSummary(!showSummary)
  }

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      day: "Yesterday",
      patients: [
        {
          id: 101,
          name: "Leslie Alexander",
          gender: "Male",
          condition: "Frequent migraine",
          date: "Monday Dec 2",
          time: "10:00 AM",
        },
        {
          id: 102,
          name: "Savannah Nguyen",
          gender: "Male",
          condition: "Indigestion",
          date: "Monday Dec 2",
          time: "11:30 AM",
        },
        {
          id: 103,
          name: "Kathryn Murphy",
          gender: "Male",
          condition: "Headaches",
          date: "Monday Dec 2",
          time: "2:15 PM",
        },
      ],
    },
    {
      id: 2,
      day: "Tuesday",
      patients: [
        {
          id: 201,
          name: "Leslie Alexander",
          gender: "Female",
          condition: "Frequent migraine",
          date: "Monday Dec 2",
          time: "10:00 AM",
        },
        {
          id: 202,
          name: "Savannah Nguyen",
          gender: "Male",
          condition: "Indigestion",
          date: "Monday Dec 2",
          time: "11:30 AM",
        },
        {
          id: 203,
          name: "Kathryn Murphy",
          gender: "Male",
          condition: "Headaches",
          date: "Monday Dec 2",
          time: "2:15 PM",
        },
      ],
    },
    {
      id: 3,
      day: "Monday",
      patients: [
        {
          id: 301,
          name: "Leslie Alexander",
          gender: "Male",
          condition: "Frequent migraine",
          date: "Monday Dec 2",
          time: "10:00 AM",
        },
        {
          id: 302,
          name: "Savannah Nguyen",
          gender: "Male",
          condition: "Indigestion",
          date: "Monday Dec 2",
          time: "11:30 AM",
        },
        {
          id: 303,
          name: "Kathryn Murphy",
          gender: "Male",
          condition: "Headaches",
          date: "Monday Dec 2",
          time: "2:15 PM",
        },
      ],
    },
  ]

  // Mock consultation summary data
  const consultationSummary = {
    patient: {
      name: "Alice Smith",
      gender: "Female",
      date: "Monday Dec 2",
      time: "10:00 AM",
    },
    doctorNotes:
      "You have mild seasonal allergies, likely triggered by pollen exposure. Symptoms include sneezing, nasal congestion, and watery eyes. Continue monitoring for any worsening symptoms.",
    diagnosis: "Allergic Rhinitis (Seasonal Allergies)",
    prescriptions: [
      {
        name: "Loratadine (Claritin) 10mg",
        instructions: "Take 1 tablet once daily for 10 days",
      },
      {
        name: "Fluticasone Nasal Spray",
        instructions: "1 spray per nostril, twice daily for 7 days",
      },
    ],
    recommendations: [
      "Avoid outdoor exposure during peak pollen times.",
      "Use an air purifier at home if possible.",
      "Stay hydrated and get adequate rest.",
      "If symptoms persist or worsen, schedule a follow-up appointment.",
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
                            <Link href="/history" className="text-[#30c7b5] hover:text-gray-900">
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
        <h1 className="text-2xl font-medium mb-8">Appointment History</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Appointment list */}
          <div className="md:w-1/2">
            {appointments.map((dayGroup) => (
              <div key={dayGroup.id} className="mb-6">
                <h2 className="text-gray-500 mb-2">{dayGroup.day}</h2>

                {dayGroup.patients.map((patient) => (
                  <div key={patient.id} className="mb-2">
                    <div
                      className={`bg-gray-50 p-4 rounded-lg cursor-pointer ${expandedAppointment === patient.id ? "border-l-4 border-[#30c7b5]" : ""}`}
                      onClick={() => toggleAppointment(patient.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className="text-gray-600 text-sm">
                            {patient.gender} • {patient.condition}
                          </p>
                        </div>
                        <ChevronDown
                          className={`text-gray-400 transition-transform ${expandedAppointment === patient.id ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>

                    {expandedAppointment === patient.id && (
                      <div className="bg-white border border-gray-200 p-4 rounded-b-lg">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4">
                          <div className="flex items-center">
                            <Calendar size={18} className="text-gray-400 mr-2" />
                            <span>{patient.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={18} className="text-gray-400 mr-2" />
                            <span>{patient.time}</span>
                          </div>
                        </div>

                        <button
                          onClick={toggleSummary}
                          className="w-full py-2 border border-gray-200 rounded-md text-[#30c7b5] hover:bg-gray-50 transition-colors"
                        >
                          View Summary
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Consultation summary */}
          {showSummary && (
            <div className="md:w-1/2">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-medium mb-6">Consultation Summary</h2>

                <div className="bg-[#f0fbfa] rounded-lg p-4 mb-6">
                  <h3 className="font-medium">{consultationSummary.patient.name}</h3>
                  <p className="text-gray-600 mb-4">{consultationSummary.patient.gender}</p>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex items-center">
                      <Calendar size={18} className="text-[#30c7b5] mr-2" />
                      <span>{consultationSummary.patient.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-[#30c7b5] mr-2" />
                      <span>{consultationSummary.patient.time}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="flex items-center text-[#30c7b5] font-medium mb-2">
                      <span className="inline-block w-3 h-3 bg-[#30c7b5] rounded-sm mr-2"></span>
                      Doctor's Notes & Advice
                    </h3>
                    <p className="text-gray-700">{consultationSummary.doctorNotes}</p>
                  </div>

                  <div>
                    <h3 className="flex items-center text-[#30c7b5] font-medium mb-2">
                      <span className="inline-block w-3 h-3 bg-[#30c7b5] rounded-sm mr-2"></span>
                      Diagnosis
                    </h3>
                    <p className="text-gray-700">{consultationSummary.diagnosis}</p>
                  </div>

                  <div>
                    <h3 className="flex items-center text-[#30c7b5] font-medium mb-2">
                      <span className="inline-block w-3 h-3 bg-[#30c7b5] rounded-sm mr-2"></span>
                      Prescriptions
                    </h3>
                    <div className="space-y-3">
                      {consultationSummary.prescriptions.map((prescription, index) => (
                        <div key={index}>
                          <p className="font-medium">{prescription.name}</p>
                          <p className="text-gray-600">{prescription.instructions}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="flex items-center text-[#30c7b5] font-medium mb-2">
                      <span className="inline-block w-3 h-3 bg-[#30c7b5] rounded-sm mr-2"></span>
                      Recommendations
                    </h3>
                    <ul className="space-y-1 text-gray-700">
                      {consultationSummary.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

