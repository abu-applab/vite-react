import { Card, CardContent } from "@/components/ui/card"
import avatar from ".././assets/images/Avatar.svg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import alNoorLogo from "../assets/images/all-noor-logo.svg"
import qatarBankLogo from "../assets/images/qatar-bank-logo.svg"
import mesaieedLogo from "../assets/images/mesaieed-logo.svg"
import ezdanHoldingLogo from "../assets/images/ezdan-holding-logo.svg"
import { CompanyDetail } from "@/components/service/company-detail"

const companiesList = [
  {
    companyName: "Al Noor Real Estate W.L.L",
    logo: alNoorLogo,
    crNumber: "238297390",
    isActive: true,
    totalSlots: "12",
    mainContact: "Mariam Khalid",
    phoneNumber: "+974 2725 9273",
    email: "mariam.k@alnoor.qa",
    alerts: [
      {
        id: '1',
        title: "Some Documents Missing",
        type: "warning"
      },
      {
        id: '2',
        title: "Payment Overdue",
        type: "warning"
      }
    ]
  },
  {
    companyName: "Qatar International Islamic Bank",
    logo: qatarBankLogo,
    crNumber: "238297390",
    isActive: true,
    totalSlots: "12",
    mainContact: "Mariam Khalid",
    phoneNumber: "+974 2725 9273",
    email: "mariam.k@alnoor.qa",
    alerts: [
      {
        id: '1',
        title: "Some Documents Missing",
        type: "warning"
      },
    ]
  },
  {
    companyName: "Mesaieed Petrochemical Holding Company",
    logo: mesaieedLogo,
    crNumber: "238297390",
    isActive: false,
    totalSlots: "12",
    mainContact: "Mariam Khalid",
    phoneNumber: "+974 2725 9273",
    email: "mariam.k@alnoor.qa",
    alerts: [
      {
        id: '1',
        title: "CR Expired",
        type: "error"
      }
    ]
  },
  {
    companyName: "Ezdan Holding Group",
    logo: ezdanHoldingLogo,
    crNumber: "238297390",
    isActive: true,
    totalSlots: "12",
    mainContact: "Mariam Khalid",
    phoneNumber: "+974 2725 9273",
    email: "mariam.k@alnoor.qa",
    alerts: [
      {
        id: '1',
        title: "CR to be expired in 2 weeks",
        type: "warning"
      }
    ]

  },
]

const HubPage = () => {
  return (
    <div className="w-full pt-[70px] px-[80px]">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={avatar} alt="Mushthtofa Ahmad Kamal" />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Hello, Mushthtofa Ahmad Kamal</h1>
                <p className="text-sm text-gray-600">Stay informed and manage your investments seamlessly</p>
              </div>
            </div>
            <Button className="bg-[#83764F] hover: text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Company
            </Button>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#862634]" />
              <Input placeholder="Search..." className="pl-10 bg-background" />
            </div>
            <Select defaultValue="allStatus">
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allStatus">All Status</SelectItem>
                <SelectItem value="underReview">Under Review</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pendingsPayments">Pendings Payments</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-base text-neutral-500 mt-4">Showing 4 of 4 companies</p>
        </CardContent>
      </Card>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* md:grid-cols-2 lg:grid-cols-2 */}
        {
          companiesList.map(({ logo, companyName, crNumber, isActive, totalSlots, mainContact, phoneNumber, email, alerts }) => {
            return (
              <CompanyDetail
                logo={logo}
                companyName={companyName}
                crNumber={crNumber}
                isActive={isActive}
                totalSlots={totalSlots}
                mainContact={mainContact}
                phoneNumber={phoneNumber}
                email={email}
                alerts={alerts}
              />
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default HubPage