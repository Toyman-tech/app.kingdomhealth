"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Video, Mic, MicOff, Camera, CameraOff, PhoneOff } from "lucide-react"

export default function DoctorWaitingRoom() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isMicOn, setIsMicOn] = useState(true)
    const [isCameraOn, setIsCameraOn] = useState(true)
    const [sessionStarted, setSessionStarted] = useState(false)

    // Simulate loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    //   const handleStartSession = () => {
    //     // In a real app, this would start the session
    //     router.push("/consultation")
    //   }

    const handleEndSession = () => {
        // In a real app, this would end the session
        router.push("/session/completed")
    }

    const patientInfo = {
        name: "Alice Smith",
        age: 34,
        gender: "Female",
        reason: "Chest pain and shortness of breath",
        history: "Hypertension, Asthma",
        medications: "Lisinopril 10mg daily, Albuterol inhaler as needed",
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#30c7b5]"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
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
                        <span className="ml-2 text-2xl font-medium">MediCare</span>
                    </Link>

                    <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Session with:</span>
                        <span className="font-medium">{patientInfo.name}</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Video area */}
                    <div className="lg:w-2/3">
                        <div className="bg-black rounded-lg overflow-hidden relative">
                            {/* Main video (patient) */}
                            <div className="aspect-video w-full bg-gray-800 flex items-center justify-center">
                                {sessionStarted ? (
                                    <Image
                                        src="/session.png"
                                        alt="Patient video"
                                        width={1280}
                                        height={720}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center text-white">
                                        <Video size={64} className="mx-auto mb-4 text-gray-400" />
                                        <h3 className="text-xl font-medium">Waiting for patient to join...</h3>
                                        <p className="text-gray-400 mt-2">The session will begin automatically when the patient connects</p>
                                    </div>
                                )}
                            </div>

                            {/* Doctor's video (small overlay) */}
                            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
                                <Image
                                    src="/doc4.png"
                                    alt="Doctor video"
                                    width={192}
                                    height={144}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Video controls */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                                <button
                                    className={`p-3 rounded-full ${isMicOn ? "bg-gray-700 text-white" : "bg-red-500 text-white"}`}
                                    onClick={() => setIsMicOn(!isMicOn)}
                                >
                                    {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
                                </button>

                                <button
                                    className={`p-3 rounded-full ${isCameraOn ? "bg-gray-700 text-white" : "bg-red-500 text-white"}`}
                                    onClick={() => setIsCameraOn(!isCameraOn)}
                                >
                                    {isCameraOn ? <Camera size={24} /> : <CameraOff size={24} />}
                                </button>

                                <button className="p-3 rounded-full bg-red-500 text-white" onClick={handleEndSession}>
                                    <PhoneOff size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Session notes */}
                        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-medium mb-4">Session Notes</h3>
                            <textarea
                                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                                placeholder="Type your notes here..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Patient information */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h3 className="text-lg font-medium mb-4">Patient Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-500">Name</p>
                                    <p className="font-medium">{patientInfo.name}</p>
                                </div>

                                <div className="flex space-x-6">
                                    <div>
                                        <p className="text-gray-500">Age</p>
                                        <p className="font-medium">{patientInfo.age}</p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500">Gender</p>
                                        <p className="font-medium">{patientInfo.gender}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gray-500">Reason for Visit</p>
                                    <p className="font-medium">{patientInfo.reason}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Medical History</p>
                                    <p className="font-medium">{patientInfo.history}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Current Medications</p>
                                    <p className="font-medium">{patientInfo.medications}</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium">Chat</h3>
                                <button className="text-[#30c7b5]">Clear</button>
                            </div>

                            <div className="h-64 overflow-y-auto mb-4 border border-gray-200 rounded-md p-3">
                                <div className="text-center text-gray-500 my-4">
                                    <p>Chat will be available when the session starts</p>
                                </div>
                            </div>

                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                                    disabled={!sessionStarted}
                                />
                                <button
                                    className="bg-[#30c7b5] text-white px-4 rounded-r-md hover:bg-[#2ab3a2] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    disabled={!sessionStarted}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

