"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import manateqLogp from "../../assets/images/manateq-login-logo.svg"
import failed from "../../assets/images/failed.svg"
import success from "../../assets/images/success.svg"

interface NewCompanyFormSubmissionProps {
  className?: string
}
function NewCompanyFormSubmission({ className }: NewCompanyFormSubmissionProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("success")

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <div className="relative mb-8">
              <div className="w-22 h-22 rounded-full animate-spin"> 
                <div
                  className="w-full h-full rounded-full p-3"
                  style={{
                    // background: `conic-gradient(from 0deg, #880E27 0%, #D9D9D9 70%, transparent 100%)`,
                    background: `conic-gradient(from 0deg, transparent 0%, #D9D9D9 30%, #880E27 100%)`,
                  }}
                >
                  <div className="w-full h-full rounded-full bg-stone-50"></div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img src={manateqLogp} alt="logo" />
                </div>
              </div>
            </div>
            <div className="text-center max-w-md">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">We're Almost Ready!</h1>
              <p className="text-gray-600 text-lg">We're currently setting up your company and Portal. Please wait a few moments.</p>
            </div>
          </>
        )

      case "success":
        return (
          <div className="flex flex-col items-center ">
            <img src={success} alt="" className="h-[100px] w-[100px] mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Setup Completed!</h1>
            <p className="text-gray-600 text-center">Your company information has been added successfully. Explore your Portal.</p>
          </div>
        )

      case "error":
        return (
          <div className="flex flex-col items-center">
            <img src={failed} alt="" className="h-[100px] w-[100px] mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Not Completed!</h1>
            <p className="text-gray-600 text-center mb-4">An unexpected error occurred.</p>
            <button
              onClick={() => setStatus("loading")}
              className="bg-maroon-100 text-white px-6 py-2 rounded-lg hover:bg-red-800"
            >
              Try Again
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={cn("flex flex-col items-center justify-center h-full p-8", className)}>
      {renderContent()}
    </div>
  )
}

export default NewCompanyFormSubmission