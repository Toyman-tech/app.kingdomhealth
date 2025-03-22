"use client"

import type React from "react"

import { useState } from "react"
import { TextField, Button, Radio, Rating } from "@mui/material"
import { Star, ChevronLeft, ChevronRight, Check } from "@mui/icons-material"
import Image from "next/image"

export default function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedConcern, setSelectedConcern] = useState("general")
  const [otherConcern, setOtherConcern] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<number>(14)
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM")
  const [currentMonth, setCurrentMonth] = useState<number>(6) // July (0-indexed)
  const [currentYear, setCurrentYear] = useState<number>(2024)
  const [doctorSelectionType, setDoctorSelectionType] = useState<"next-available" | "specialist">("next-available")

  const [patientName, setPatientName] = useState("")
  const [patientEmail, setPatientEmail] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [patientGender, setPatientGender] = useState("male")
  const [patientProblem, setPatientProblem] = useState("")
  const [patientNotes, setPatientNotes] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const concerns = [
    { id: "general", label: "General Consultation" },
    { id: "digestive", label: "Digestive Issues" },
    { id: "skin", label: "Skin & Dermatology" },
    { id: "chronic", label: "Chronic Conditions (Hypertension, etc.)" },
    { id: "womens", label: "Women's Health" },
    { id: "sexual", label: "Sexual Health" },
    { id: "mens", label: "Men's Health" },
    { id: "other", label: "Other" },
    { id: "mental", label: "Mental Health & Well-being" },
  ]

  const doctors = [
    {
      id: "alex-zender",
      name: "Dr. Alex Zender",
      title: "Cardiologist",
      specialty: "Cardiology",
      qualifications: "MBBS, FCPS (Cardiology)",
      hospital: "The Castro Animal Hospital, San Francisco",
      fee: 100,
      followUpFee: 50,
      experience: "8+ Years",
      rating: 4.9,
      patients: "120+",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipisng elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      image: "/doc1.png",
      reviews: [
        {
          id: 1,
          name: "Akash basak",
          date: "22 sept 2023",
          rating: 5,
          comment:
            "Lorem ipsum dolor sit amet consectetur. Aliquet amet nulla leo ipsum. Neque dolor pretium at maecenas in ac amet.",
          avatar: "/ecl.png",
        },
        {
          id: 2,
          name: "Leslie Alexander",
          date: "22 sept 2023",
          rating: 5,
          comment:
            "Lorem ipsum dolor sit amet consectetur. Aliquet amet nulla leo ipsum. Neque dolor pretium at maecenas in ac amet.",
          avatar: "/ecl.png",
        },
        {
          id: 3,
          name: "Albert Flores",
          date: "22 sept 2023",
          rating: 4,
          comment:
            "Lorem ipsum dolor sit amet consectetur. Aliquet amet nulla leo ipsum. Neque dolor pretium at maecenas in ac amet.",
          avatar: "/ecl.png",
        },
      ],
    },
    {
      id: "mizanur-rahman",
      name: "Dr. Mizanur Rahman",
      title: "Cardiologist",
      specialty: "Cardiology",
      qualifications: "MBBS, FCPS(Cardiology)",
      hospital: "Medical Center Hospital, San Francisco",
      fee: 100,
      followUpFee: 50,
      experience: "10+ Years",
      rating: 5.0,
      patients: "150+",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipisng elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      image: "/doc2.png",
      reviews: [],
    },
    {
      id: "akash-basak",
      name: "Dr. Akash basak",
      title: "Cardiologist",
      specialty: "Cardiology",
      qualifications: "MBBS, FCPS(Cardiology)",
      hospital: "City Hospital, San Francisco",
      fee: 100,
      followUpFee: 50,
      experience: "5+ Years",
      rating: 5.0,
      patients: "80+",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipisng elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      image: "/doc3.png",
      reviews: [],
    },
    {
      id: "phillips",
      name: "Dr. Phillips",
      title: "Cardiologist",
      specialty: "Cardiology",
      qualifications: "MBBS, FCPS(Cardiology)",
      hospital: "General Hospital, San Francisco",
      fee: 100,
      followUpFee: 50,
      experience: "12+ Years",
      rating: 5.0,
      patients: "200+",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipisng elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      image: "/doc4.png",
      reviews: [],
    },
    {
      id: "alexa-zender",
      name: "Dr. Alexa Zender",
      title: "Cardiologist",
      specialty: "Cardiology",
      qualifications: "MBBS, FCPS(Cardiology)",
      hospital: "Memorial Hospital, San Francisco",
      fee: 100,
      followUpFee: 50,
      experience: "7+ Years",
      rating: 5.0,
      patients: "100+",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipisng elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      image: "/prof1.png",
      reviews: [],
    },
  ]

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "4:00 PM", "5:00 PM"]

  const availableDates = [12, 14] // Dates that are available for booking

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

    const daysInPrevMonth = getDaysInMonth(
      currentMonth === 0 ? currentYear - 1 : currentYear,
      currentMonth === 0 ? 11 : currentMonth - 1,
    )

    const days = []

    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
        available: false,
      })
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
        available: availableDates.includes(i),
      })
    }

    // Next month's days
    const remainingCells = 42 - days.length // 6 rows of 7 days
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        day: i,
        currentMonth: false,
        available: false,
      })
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div className="w-full md:w-1/2">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handlePrevMonth} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ChevronLeft />
          </button>
          <h3 className="text-xl font-medium">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button onClick={handleNextMonth} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day} className="text-center py-2 text-gray-500">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              onClick={() => day.currentMonth && day.available && setSelectedDate(day.day)}
              className={`
                h-12 flex items-center justify-center rounded-md cursor-pointer
                ${!day.currentMonth ? "text-gray-300" : "text-gray-800"}
                ${day.currentMonth && day.available ? "hover:bg-[#e6f7f5]" : ""}
                ${day.currentMonth && day.day === selectedDate ? "bg-[#30c7b5] text-white" : ""}
                ${day.currentMonth && day.available && day.day !== selectedDate ? "bg-[#e6f7f5]" : ""}
                ${!day.currentMonth || !day.available ? "cursor-default" : ""}
              `}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTimeSlots = () => {
    const date = new Date(currentYear, currentMonth, selectedDate)
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    const formattedDate = date.toLocaleDateString("en-US", options)

    return (
      <div className="w-full md:w-1/2 md:pl-8">
        <h3 className="text-lg font-medium mb-4">{formattedDate}</h3>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`
                py-2 px-4 rounded-md text-center
                ${selectedTime === time ? "bg-[#30c7b5] text-white" : "bg-gray-100 text-gray-800"}
              `}
            >
              {time}
            </button>
          ))}
        </div>

        <Button
          variant="contained"
          fullWidth
          onClick={handleNext}
          className="normal-case"
          sx={{
            backgroundColor: "#30c7b5",
            "&:hover": {
              backgroundColor: "#2ab3a2",
            },
            borderRadius: "6px",
            textTransform: "none",
            padding: "12px",
          }}
        >
          Confirm Consultation
        </Button>
      </div>
    )
  }

  const renderStep1 = () => (
    <div className="w-full">
      <h2 className="text-lg text-gray-600 mb-6">Select Your Medical Concern</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {concerns.map((concern) => (
          <div
            key={concern.id}
            className={`
              flex items-center justify-between p-4 rounded-lg border cursor-pointer
              ${selectedConcern === concern.id ? "border-[#30c7b5]" : "border-gray-200"}
              ${selectedConcern === concern.id ? "bg-white" : "bg-gray-50"}
            `}
            onClick={() => setSelectedConcern(concern.id)}
          >
            <span className="text-gray-800">{concern.label}</span>
            <Radio
              checked={selectedConcern === concern.id}
              onChange={() => setSelectedConcern(concern.id)}
              sx={{
                color: "#c5c5c5",
                "&.Mui-checked": {
                  color: "#30c7b5",
                },
              }}
            />
          </div>
        ))}
      </div>

      {selectedConcern === "other" && (
        <div className="mt-4">
          <TextField
            fullWidth
            placeholder="Specify other (Optional)"
            value={otherConcern}
            onChange={(e :any) => setOtherConcern(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#e2e8f0",
                },
                "&:hover fieldset": {
                  borderColor: "#30c7b5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#30c7b5",
                },
              },
            }}
          />
        </div>
      )}

      <div className="flex justify-center gap-4 mt-10">
        <Button
          variant="outlined"
          className="px-8 py-2 normal-case"
          sx={{
            borderColor: "#e2e8f0",
            color: "#4b5563",
            "&:hover": {
              borderColor: "#d1d5db",
              backgroundColor: "#f9fafb",
            },
            borderRadius: "6px",
            textTransform: "none",
            padding: "8px 24px",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          className="px-8 py-2 normal-case"
          sx={{
            backgroundColor: "#30c7b5",
            "&:hover": {
              backgroundColor: "#2ab3a2",
            },
            borderRadius: "6px",
            textTransform: "none",
            padding: "8px 24px",
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-lg text-gray-600 mb-6">Choose your Doctor</h2>

      <div className="space-y-4">
        <div
          className={`
            flex items-center justify-between p-4 rounded-lg border cursor-pointer
            ${doctorSelectionType === "next-available" ? "border-[#30c7b5] bg-white" : "border-gray-200 bg-gray-50"}
          `}
          onClick={() => setDoctorSelectionType("next-available")}
        >
          <span className="text-gray-800">See next available doctor</span>
          <Radio
            checked={doctorSelectionType === "next-available"}
            onChange={() => setDoctorSelectionType("next-available")}
            sx={{
              color: "#c5c5c5",
              "&.Mui-checked": {
                color: "#30c7b5",
              },
            }}
          />
        </div>

        <div
          className={`
            flex items-center justify-between p-4 rounded-lg border cursor-pointer
            ${doctorSelectionType === "specialist" ? "border-[#30c7b5] bg-white" : "border-gray-200 bg-gray-50"}
          `}
          onClick={() => setDoctorSelectionType("specialist")}
        >
          <span className="text-gray-800">Choose a specialist from recommended list</span>
          <Radio
            checked={doctorSelectionType === "specialist"}
            onChange={() => setDoctorSelectionType("specialist")}
            sx={{
              color: "#c5c5c5",
              "&.Mui-checked": {
                color: "#30c7b5",
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <Button
          variant="outlined"
          onClick={handleBack}
          className="px-8 py-2 normal-case"
          sx={{
            borderColor: "#e2e8f0",
            color: "#4b5563",
            "&:hover": {
              borderColor: "#d1d5db",
              backgroundColor: "#f9fafb",
            },
            borderRadius: "6px",
            textTransform: "none",
            padding: "8px 24px",
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          className="px-8 py-2 normal-case"
          sx={{
            backgroundColor: "#30c7b5",
            "&:hover": {
              backgroundColor: "#2ab3a2",
            },
            borderRadius: "6px",
            textTransform: "none",
            padding: "8px 24px",
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="w-full">
      <h2 className="text-lg text-gray-600 mb-6">Choose your Doctor</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className={`
              flex gap-4 p-4 rounded-lg border cursor-pointer
              ${selectedDoctor === doctor.id ? "border-[#30c7b5]" : "border-gray-200"}
              ${selectedDoctor === doctor.id ? "bg-white" : "bg-gray-50"}
            `}
            onClick={() => setSelectedDoctor(doctor.id)}
          >
            <div className="flex-shrink-0">
              <Image
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                width={80}
                height={80}
                className="rounded-md bg-[#e6f7f5]"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="font-medium text-lg">{doctor.name}</h3>
              <p className="text-gray-700">{doctor.specialty}</p>
              <p className="text-gray-500 text-sm">{doctor.qualifications}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-medium text-lg">${doctor.fee}</span>
                <div className="flex items-center">
                  <Rating
                    value={doctor.rating}
                    readOnly
                    precision={0.5}
                    icon={<Star fontSize="small" style={{ color: "#ffc107" }} />}
                    emptyIcon={<Star fontSize="small" style={{ color: "#e2e8f0" }} />}
                  />
                  <span className="text-sm text-gray-500 ml-1">
                    {doctor.rating} ({doctor.reviews.length || 150})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <Button
          variant="outlined"
          onClick={handleBack}
          className="px-8 py-2 normal-case"
          sx={{
            borderColor: "#e2e8f0",
            color: "#4b5563",
            "&:hover": {
              borderColor: "#d1d5db",
              backgroundColor: "#f9fafb",
            },
            borderRadius: "6px",
            textTransform: "none",
            padding: "8px 24px",
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!selectedDoctor}
          className="px-8 py-2 normal-case"
          sx={{
            backgroundColor: "#30c7b5",
            "&:hover": {
              backgroundColor: "#2ab3a2",
            },
            borderRadius: "6px",
            textTransform: "none",
            padding: "8px 24px",
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )

  const renderStep4 = () => {
    const doctor = doctors.find((d) => d.id === selectedDoctor)
    if (!doctor) return null

    return (
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Doctor Profile Section */}
          <div className="md:w-2/3">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  width={200}
                  height={200}
                  className="rounded-md bg-[#30c7b5]"
                />
              </div>

              {/* Doctor Info */}
              <div className="flex flex-col">
                <h2 className="text-2xl font-medium">{doctor.name}</h2>
                <p className="text-gray-700">{doctor.title}</p>
                <p className="text-gray-500 text-sm mt-1">{doctor.qualifications}</p>
                <p className="text-gray-600 mt-2">{doctor.hospital}</p>

                <div className="flex gap-6 mt-6">
                  <div className="text-center">
                    <p className="font-medium">{doctor.experience}</p>
                    <p className="text-gray-500 text-sm">Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{doctor.rating}</p>
                    <p className="text-gray-500 text-sm">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{doctor.patients}</p>
                    <p className="text-gray-500 text-sm">Patients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Doctor */}
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-2">About Doctor</h3>
              <p className="text-gray-600">
                {doctor.about} <span className="text-[#30c7b5] cursor-pointer">Read More</span>
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Reviews({doctor.reviews.length || 154})</h3>

              <div className="space-y-6">
                {doctor.reviews.length > 0 ? (
                  doctor.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Image
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <p className="text-gray-500 text-sm">{review.date}</p>
                        </div>
                        <div className="ml-auto">
                          <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            icon={<Star fontSize="small" style={{ color: "#ffc107" }} />}
                            emptyIcon={<Star fontSize="small" style={{ color: "#e2e8f0" }} />}
                          />
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="border-b pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Akash basak"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">Akash basak</p>
                        <p className="text-gray-500 text-sm">22 sept 2023</p>
                      </div>
                      <div className="ml-auto">
                        <Rating
                          value={5}
                          readOnly
                          size="small"
                          icon={<Star fontSize="small" style={{ color: "#ffc107" }} />}
                          emptyIcon={<Star fontSize="small" style={{ color: "#e2e8f0" }} />}
                        />
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet consectetur. Aliquet amet nulla leo ipsum. Neque dolor pretium at
                      maecenas in ac amet.
                    </p>
                  </div>
                )}

                {/* Add more reviews as needed */}
                {doctor.reviews.length === 0 && (
                  <>
                    <div className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Leslie Alexander"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium">Leslie Alexander</p>
                          <p className="text-gray-500 text-sm">22 sept 2023</p>
                        </div>
                        <div className="ml-auto">
                          <Rating
                            value={5}
                            readOnly
                            size="small"
                            icon={<Star fontSize="small" style={{ color: "#ffc107" }} />}
                            emptyIcon={<Star fontSize="small" style={{ color: "#e2e8f0" }} />}
                          />
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur. Aliquet amet nulla leo ipsum. Neque dolor pretium at
                        maecenas in ac amet.
                      </p>
                    </div>

                    <div className="border-b pb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Albert Flores"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium">Albert Flores</p>
                          <p className="text-gray-500 text-sm">22 sept 2023</p>
                        </div>
                        <div className="ml-auto">
                          <Rating
                            value={4}
                            readOnly
                            size="small"
                            icon={<Star fontSize="small" style={{ color: "#ffc107" }} />}
                            emptyIcon={<Star fontSize="small" style={{ color: "#e2e8f0" }} />}
                          />
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur. Aliquet amet nulla leo ipsum. Neque dolor pretium at
                        maecenas in ac amet.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Consultation Fee Section */}
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-medium mb-6">Consultation fee</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Consultation</p>
                  <p className="text-2xl font-medium">${doctor.fee}</p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Follow up (within 15 days)</p>
                  <p className="text-2xl font-medium">${doctor.followUpFee}</p>
                </div>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleNext}
                  className="mt-6 normal-case"
                  sx={{
                    backgroundColor: "#30c7b5",
                    "&:hover": {
                      backgroundColor: "#2ab3a2",
                    },
                    borderRadius: "6px",
                    textTransform: "none",
                    padding: "12px",
                    marginTop: "24px",
                  }}
                >
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <Button
            variant="outlined"
            onClick={handleBack}
            className="px-8 py-2 normal-case"
            sx={{
              borderColor: "#e2e8f0",
              color: "#4b5563",
              "&:hover": {
                borderColor: "#d1d5db",
                backgroundColor: "#f9fafb",
              },
              borderRadius: "6px",
              textTransform: "none",
              padding: "8px 24px",
            }}
          >
            Back
          </Button>
        </div>
      </div>
    )
  }

  const renderStep5 = () => (
    <div className="w-full">
      <h2 className="text-lg text-gray-600 mb-6">Select date and time</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {renderCalendar()}
        {renderTimeSlots()}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <Button
          variant="outlined"
          onClick={handleBack}
          className="px-8 py-2 normal-case"
          sx={{
            borderColor: "#e2e8f0",
            color: "#4b5563",
            "&:hover": {
              borderColor: "#d1d5db",
              backgroundColor: "#f9fafb",
            },
            borderRadius: "6px",
            textTransform: "none",
            padding: "8px 24px",
          }}
        >
          Back
        </Button>
      </div>
    </div>
  )

  const renderStep6 = () => {
    const doctor = doctors.find((d) => d.id === selectedDoctor)
    if (!doctor) return null

    const date = new Date(currentYear, currentMonth, selectedDate)
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" }
    const formattedDate = date.toLocaleDateString("en-US", options)

    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <h3 className="text-xl font-medium mb-6">Booking Confirmation</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Doctor:</p>
              <p className="font-medium">{doctor.name}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">Specialty:</p>
              <p className="font-medium">{doctor.specialty}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">Date:</p>
              <p className="font-medium">{formattedDate}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">Time:</p>
              <p className="font-medium">{selectedTime}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">Fee:</p>
              <p className="font-medium">${doctor.fee}</p>
            </div>

            <div className="border-t pt-4 mt-4">
              <Button
                variant="contained"
                fullWidth
                onClick={handleNext}
                className="mt-4 normal-case"
                sx={{
                  backgroundColor: "#30c7b5",
                  "&:hover": {
                    backgroundColor: "#2ab3a2",
                  },
                  borderRadius: "6px",
                  textTransform: "none",
                  padding: "12px",
                }}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderStep7 = () => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0])
      }
    }

    return (
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-lg text-gray-600 mb-6">Enter your basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="problem" className="block text-gray-700 mb-2">
              Problem / Ailment
            </label>
            <input
              id="problem"
              type="text"
              value={patientProblem}
              onChange={(e) => setPatientProblem(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-gray-700 mb-2">
              Additional notes
            </label>
            <textarea
              id="notes"
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#30c7b5] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Upload documents (if any)</label>
            <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-[#30c7b5]">Browse your files</span>
                  <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                </label>
                <p className="text-xs text-gray-500 mt-1">( Maximum size 10MB )</p>
                {selectedFile && <p className="text-sm text-gray-700 mt-2">{selectedFile.name}</p>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <div className="flex space-x-4">
              <div
                className={`border rounded-md py-2 px-6 cursor-pointer ${patientGender === "male" ? "border-[#30c7b5]" : "border-gray-200"}`}
                onClick={() => setPatientGender("male")}
              >
                Male
              </div>
              <div
                className={`border rounded-md py-2 px-6 cursor-pointer ${patientGender === "female" ? "border-[#30c7b5]" : "border-gray-200"}`}
                onClick={() => setPatientGender("female")}
              >
                Female
              </div>
              <div
                className={`border rounded-md py-2 px-6 cursor-pointer ${patientGender === "other" ? "border-[#30c7b5]" : "border-gray-200"}`}
                onClick={() => setPatientGender("other")}
              >
                Other
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-center text-gray-600 text-sm mb-6">
            By clicking on Proceed, you consent to provide us with the requested data.
          </p>

          <div className="flex justify-center">
            <Button
              variant="contained"
              onClick={handleNext}
              className="px-8 py-3 normal-case"
              sx={{
                backgroundColor: "#30c7b5",
                "&:hover": {
                  backgroundColor: "#2ab3a2",
                },
                borderRadius: "6px",
                textTransform: "none",
                padding: "12px 24px",
                minWidth: "240px",
              }}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderStep8 = () => {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-[#e6f7f5] rounded-full opacity-30 animate-ping"></div>
            <div className="absolute inset-2 bg-[#e6f7f5] rounded-full opacity-50"></div>
            <div className="relative flex items-center justify-center w-16 h-16 mx-auto bg-[#00c853] rounded-full">
              <Check className="text-white" fontSize="large" />
            </div>
          </div>

          <h2 className="text-2xl font-medium mb-4">Appointment Confirmed!</h2>

          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            A confirmation email with your appointment details has been sent to your inbox. Please check your email and
            be ready to join your session on time. We look forward to having you!
          </p>

          <Button
            variant="contained"
            onClick={() => setCurrentStep(1)} // Reset to first step
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
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#30c7b5]"
            >
              <path
                d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM20 36.3636C10.9636 36.3636 3.63636 29.0364 3.63636 20C3.63636 10.9636 10.9636 3.63636 20 3.63636C29.0364 3.63636 36.3636 10.9636 36.3636 20C36.3636 29.0364 29.0364 36.3636 20 36.3636Z"
                fill="currentColor"
              />
              <path
                d="M28.1818 16.3636H23.6364V11.8182C23.6364 10.2727 22.3636 9 20.8182 9H19.1818C17.6364 9 16.3636 10.2727 16.3636 11.8182V16.3636H11.8182C10.2727 16.3636 9 17.6364 9 19.1818V20.8182C9 22.3636 10.2727 23.6364 11.8182 23.6364H16.3636V28.1818C16.3636 29.7273 17.6364 31 19.1818 31H20.8182C22.3636 31 23.6364 29.7273 23.6364 28.1818V23.6364H28.1818C29.7273 23.6364 31 22.3636 31 20.8182V19.1818C31 17.6364 29.7273 16.3636 28.1818 16.3636Z"
                fill="currentColor"
              />
            </svg> */}
            <Image
                  src="/king.jpeg"
                  alt="MediCare Logo"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
            <span className="ml-2 text-2xl font-medium">KHealth</span>
          </div>
          <div className="flex gap-6">
            <span className="text-gray-600">About us</span>
            <span className="text-gray-600">Contact</span>
          </div>
        </div>
      </header>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-medium text-center mb-6">Book a Consultation</h1>

      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
      {currentStep === 5 && renderStep5()}
      {currentStep === 6 && renderStep6()}
      {currentStep === 7 && renderStep7()}
      {currentStep === 8 && renderStep8()}
    </div>
    </div>
  )
}

