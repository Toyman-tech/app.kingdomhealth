"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, LogOut } from "lucide-react"

export default function WithdrawPage() {
  const router = useRouter()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null)

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

  const handleRecipientSelect = (id: number) => {
    setSelectedRecipient(id)
    // In a real app, this would navigate to the next step of the withdrawal process
    // For now, we'll just show an alert
    setTimeout(() => {
      alert("In a real app, this would proceed to the next step of the withdrawal process")
    }, 100)
  }

  const handleNewRecipient = () => {
    // In a real app, this would open a form to add a new recipient
    alert("In a real app, this would open a form to add a new recipient")
  }

  // Mock recipients (same as beneficiaries from wallet page)
  const recipients = [
    {
      id: 1,
      name: "Aniston Zenifer",
      accountNumber: "2286421122",
      bank: "Zenith Bank",
      initials: "AZ",
    },
    {
      id: 2,
      name: "Zenifer Aniston",
      accountNumber: "0428120756",
      bank: "GTB",
      initials: "ZA",
    },
    {
      id: 3,
      name: "Zenifer Aniston",
      accountNumber: "8164496626",
      bank: "PAYCOM",
      initials: "ZA",
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

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-center mb-8">Withdraw</h1>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-6">Recipients</h2>

          <div className="space-y-4">
            {recipients.map((recipient) => (
              <div
                key={recipient.id}
                className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => handleRecipientSelect(recipient.id)}
              >
                <div className="w-10 h-10 rounded-full bg-[#e6f7f5] flex items-center justify-center mr-3 text-[#30c7b5] font-medium">
                  {recipient.initials}
                </div>
                <div>
                  <p className="font-medium">{recipient.name}</p>
                  <p className="text-gray-500 text-sm">
                    {recipient.accountNumber} • {recipient.bank}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNewRecipient}
            className="w-full mt-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            New Recipient
          </button>
        </div>
      </main>
    </div>
  )
}

