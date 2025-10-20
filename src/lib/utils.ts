import { clsx, type ClassValue } from "clsx"
import { AppWindow, FileText, Home, MessageSquareDot, SquareDashed, SquareLibrary, Wallet } from "lucide-react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navigationItems = [
  { name: "Home", icon: Home, href: "/portal" },
  { name: "Application", icon: AppWindow, href: "/portal/application" },
  { name: "Payments", icon: Wallet, href: "/portal/payments" },
  { name: "Allocated Plots", icon: SquareDashed, href: "/portal/allocated-plots" },
  { name: "Agreements", icon: FileText, href: "/portal/agreements" },
  {
    name: "Service Request",
    icon: MessageSquareDot,
    children: [
      { name: "General Service Request", href: "/portal/service" },
      { name: "Bot Requests", href: "/portal/bot-requests" },
      { name: "Bot Reports", href: "/portal/bot-reports" },
    ],
  },
  { name: "HSE Findings", icon: SquareLibrary, href: "/portal/violations" },
]