import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CreditCard, ChevronsUpDown } from "lucide-react";

const payments = [
  { date: "10/07/2025", amount: "QAR 15,000", status: "Paid", receipt: true },
  { date: "10/06/2025", amount: "QAR 15,000", status: "Paid", receipt: true },
  { date: "10/05/2025", amount: "QAR 15,000", status: "Due", receipt: false },
];

export default function PaymentTable() {
  return (
    <div className="bg-transparent flex justify-center">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm w-full">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="py-3 px-6 font-medium text-gray-600 items-center">
                <div className="flex justify-left items-center gap-2">
                  <span>Date</span>
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">
                <div className="flex justify-left items-center gap-2">
                  <span>Amount</span>
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">
                <div className="flex justify-left items-center gap-2">
                  <span>
                    Status
                  </span>
                  <ChevronsUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">
                Receipt
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((row, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="py-4 px-6 text-gray-800">{row.date}</td>
                <td className="py-4 px-6 text-gray-800">{row.amount}</td>
                <td className="py-4 px-6">
                  {row.status === "Paid" ? (
                    <Badge className="bg-green-100 text-green-700 gap-x-1">
                      <span className="inline-block h-2 w-2 bg-green-600 rounded-full mr-1" />
                      Paid
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 gap-x-1">
                      <span className="inline-block h-2 w-2 bg-red-500 rounded-full mr-1" />
                      Due
                    </Badge>
                  )}
                </td>
                <td className="py-4 px-6">
                  {row.receipt ? (
                    <Button variant="outline" size="sm" className="gap-x-2">
                      <Download className="h-4 w-4" />
                      Download Receipt
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="gap-x-2">
                      <CreditCard className="h-4 w-4" />
                      Pay
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
