"use client"
import { ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TwoFactorAuth() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
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

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };
    const handleClick = () =>{
         router.push('/wallet/withdraw/success')
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
            <div className="max-w-2xl mx-auto px-4 py-8 mt-10 md:mt-16">
                <div className=" border border-gray-200 p-6 rounded-lg shadow-md  text-center text-white flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-black">
                        Enter 2FA code to confirm transaction
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        An authentication code has been sent to your registered email
                    </p>

                    <div className="flex justify-center gap-2 mt-4">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                className="w-12 h-12 text-center text-black text-lg font-semibold border border-teal-500 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        ))}
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                        Didn’t receive the code?{" "}
                        <button className="text-teal-400 font-semibold hover:underline">
                            Resend
                        </button>
                    </p>

                    <button className="mt-6  max-w-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg"
                    onClick={handleClick}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
