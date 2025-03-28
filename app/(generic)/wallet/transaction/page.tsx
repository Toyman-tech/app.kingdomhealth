"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, LogOut, ArrowUp, ArrowDown, Check } from "lucide-react"
import TransactionDetails from "@/components/TransactionDetails"

export default function DoctorWallet() {
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

  const handleWithdraw = (e: any) => {
    e.preventDefault();
    router.push("/wallet/withdraw")
  }

  // Mock wallet data
  const walletData = {
    balance: 1280.82,
    thisWeek: {
      amount: 520,
      change: 12,
      isPositive: true,
    },
    thisMonth: {
      amount: 1920,
      change: 4,
      isPositive: false,
    },
  }

  // Mock transactions
  const transactions = [
    {
      id: 1,
      name: "Adam Costa",
      type: "Payment Received",
      date: "Dec 04 2024",
      amount: 120.0,
      isPositive: true,
    },
    {
      id: 2,
      name: "Sarah Eric",
      type: "Bank Transfer",
      date: "Dec 04 2024",
      amount: 500.0,
      isPositive: false,
    },
    {
      id: 3,
      name: "Adam Costa",
      type: "Payment Received",
      date: "Dec 04 2024",
      amount: 120.0,
      isPositive: true,
    },
    {
      id: 4,
      name: "Sarah Eric",
      type: "Bank Transfer",
      date: "Dec 04 2024",
      amount: 500.0,
      isPositive: false,
    },
    {
      id: 5,
      name: "Sarah Eric",
      type: "Bank Transfer",
      date: "Dec 04 2024",
      amount: 500.0,
      isPositive: false,
    },
  ]

  // Mock beneficiaries
  const beneficiaries = [
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium mb-8 max-md:hidden">Wallet</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Balance Card */}
            <div className="bg-[#30c7b5] max-md:hidden text-white rounded-lg p-6 mb-6 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full border border-white opacity-10"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full border border-white opacity-10"></div>
              <div className="absolute top-20 right-20 w-16 h-16 rounded-full border border-white opacity-10"></div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 mb-1">Available balance</p>
                  <h2 className="text-4xl font-bold">${walletData.balance.toFixed(2)}</h2>
                </div>
                <div className="z-[100]">
                  <button
                    onClick={handleWithdraw}
                    className="bg-white text-[#30c7b5] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors cursor-pointer"

                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid max-md:hidden grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500 mb-1">This week</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold mr-2">${walletData.thisWeek.amount}</h3>
                  <span
                    className={`flex items-center text-sm ${walletData.thisWeek.isPositive ? "text-green-500" : "text-red-500"}`}
                  >
                    {walletData.thisWeek.isPositive ? (
                      <ArrowUp size={16} className="mr-1" />
                    ) : (
                      <ArrowDown size={16} className="mr-1" />
                    )}
                    {walletData.thisWeek.change}%
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500 mb-1">This month</p>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold mr-2">${walletData.thisMonth.amount}</h3>
                  <span
                    className={`flex items-center text-sm ${walletData.thisMonth.isPositive ? "text-green-500" : "text-red-500"}`}
                  >
                    {walletData.thisMonth.isPositive ? (
                      <ArrowUp size={16} className="mr-1" />
                    ) : (
                      <ArrowDown size={16} className="mr-1" />
                    )}
                    {walletData.thisMonth.change}%
                  </span>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white border max-md:hidden border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Recent transactions</h2>
                <button className="text-[#30c7b5] hover:underline">See All</button>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${transaction.isPositive ? "bg-green-100" : "bg-blue-100"}`}
                      >
                        {transaction.isPositive ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <ArrowUp size={18} className="text-blue-500 transform rotate-45" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-gray-500 text-sm">
                          {transaction.type} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.isPositive ? "text-green-600" : "text-red-600"}`}>
                      {transaction.isPositive ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Beneficiaries */}
          <div className="md:col-span-1">
            {/* <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-6">Beneficiaries</h2>

              <div className="space-y-6">
                {beneficiaries.map((beneficiary) => (
                  <div key={beneficiary.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#e6f7f5] flex items-center justify-center mr-3 text-[#30c7b5] font-medium">
                      {beneficiary.initials}
                    </div>
                    <div>
                      <p className="font-medium">{beneficiary.name}</p>
                      <p className="text-gray-500 text-sm">
                        {beneficiary.accountNumber} • {beneficiary.bank}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="bg-white rounded-lg p-6">
            <TransactionDetails
              amount={200}
              status="Completed"
              dateTime="05/12/2024, 20:31"
              name="Aniston Zeniter"
              accountNumber="2286421122"
              bank="Zenith Bank"
              transactionId="Md34734995"
            />
          </div>
          </div>
        </div>
      </main>
    </div>
  )
}

