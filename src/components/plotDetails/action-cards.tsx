import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, FileSpreadsheet, MessageSquareDiff } from "lucide-react"

export default function ActionCards() {
  const actions = [
    {
      icon: <FileSpreadsheet className="h-5 w-5 text-gray-700" />,
      title: "Upload Document",
      subtitle: "Related to: DC2 Approval (Pre-Development Phase)",
      button: "Upload Now",
    },
    {
      icon: <CreditCard className="h-5 w-5 text-gray-700" />,
      title: "Pay Now",
      subtitle: (
        <>
          QAR 15,000 due by <span className="font-semibold">Aug 10, 2025</span>
        </>
      ),
      button: "Make Payment",
    },
    {
      icon: <MessageSquareDiff className="h-5 w-5 text-gray-700" />,
      title: "Request Update",
      subtitle: "You can request an update for: Building Permit",
      button: "Request Update",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((item, idx) => (
        <Card key={idx} className="rounded-2xl gap-4 border-0 shadow-none">
          <CardHeader className="flex flex-row items-center">
            <div className="p-2 rounded-sm border bg-neutral-100">{item.icon}</div>
          </CardHeader>
          <CardContent >
            <CardTitle className="font-medium mb-1">{item.title}</CardTitle>
            <p className="text-sm text-gray-500 mb-4">{item.subtitle}</p>
            <Button className="bg-maroon-100 text-white font-medium rounded-sm px-4">
              {item.button}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
