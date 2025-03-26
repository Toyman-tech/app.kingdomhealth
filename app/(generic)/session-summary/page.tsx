"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, LogOut, Upload, Plus, X } from "lucide-react"

export default function ConsultationSummary({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [diagnosis, setDiagnosis] = useState("")
  const [notes, setNotes] = useState("")
  const [advice, setAdvice] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, medication: "", dosage: "500mg twice daily", duration: "2 Weeks" },
    { id: 2, medication: "", dosage: "", duration: "" },
  ])

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

  const handleAddPrescription = () => {
    setPrescriptions([...prescriptions, { id: prescriptions.length + 1, medication: "", dosage: "", duration: "" }])
  }

  const handleRemovePrescription = (id: number) => {
    if (prescriptions.length > 1) {
      setPrescriptions(prescriptions.filter((p) => p.id !== id))
    }
  }

  const handlePrescriptionChange = (id: number, field: string, value: string) => {
    setPrescriptions(prescriptions.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handlePreviewReport = () => {
    // In a real app, this would generate a preview of the report
    alert("Preview functionality would be implemented here")
  }

  const handleSubmitToPatient = () => {
    // In a real app, this would submit the report to the patient
    alert("Report submitted to patient")
    router.push("/history")
  }

  // Mock patient data - in a real app, this would be fetched based on the ID
  const patient = {
    id: params.id,
    name: "Alice Smith",
    gender: "Female",
    condition: "Frequent Migraine",
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium mb-8">Consultation Summary</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Patient info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-1">{patient.name}</h2>
              <p className="text-gray-600 mb-4">{patient.gender}</p>
              <input
                type="text"
                value={patient.condition}
                readOnly
                className="w-full p-3 border border-gray-200 rounded-md bg-white"
              />
            </div>

            {/* Consultation Notes */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-6">Consultation Notes</h2>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Diagnosis</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Notes & Observations</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                />
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-6">Recommendations</h2>

              <div>
                <label className="block text-gray-700 mb-2">Advice & Instructions</label>
                <textarea
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                />
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-6">Attachments</h2>

              <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-[#30c7b5] font-medium">Browse</span>
                    <span className="text-gray-600"> your files</span>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">( Maximum size 10MB )</p>
                  {selectedFile && <div className="mt-4 text-sm text-gray-700">Selected: {selectedFile.name}</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Prescriptions */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-6">Prescriptions</h2>

              <div className="space-y-6">
                {prescriptions.map((prescription, index) => (
                  <div key={prescription.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-gray-700">Medication name</label>
                      {index > 0 && (
                        <button
                          onClick={() => handleRemovePrescription(prescription.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={prescription.medication}
                      onChange={(e) => handlePrescriptionChange(prescription.id, "medication", e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Dosage & Frequency</label>
                        <input
                          type="text"
                          value={prescription.dosage}
                          onChange={(e) => handlePrescriptionChange(prescription.id, "dosage", e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          value={prescription.duration}
                          onChange={(e) => handlePrescriptionChange(prescription.id, "duration", e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
                        />
                      </div>
                    </div>

                    {index < prescriptions.length - 1 && <div className="border-b border-gray-200 pt-2"></div>}
                  </div>
                ))}

                <button
                  onClick={handleAddPrescription}
                  className="w-full py-3 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Plus size={16} className="mr-2" />
                  Add prescription
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <button
              onClick={handlePreviewReport}
              className="w-full py-3 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Preview Report
            </button>

            <button
              onClick={handleSubmitToPatient}
              className="w-full py-3 bg-[#30c7b5] text-white rounded-md hover:bg-[#2ab3a2] transition-colors"
            >
              Submit to Patient
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

