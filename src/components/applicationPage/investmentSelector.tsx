import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowRight, ArrowUpRight, Building2 } from "lucide-react"
import { useApp, type CompanyType } from "@/context/AppContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils"


interface InvestmentTypeProps {
  handleSelectedOption: (val: string) => void
  investmentContent: InvestmentType
}

interface InvestmentOptions {
  id: string
  title: string
  description?: string
  image: string
  disabled?: boolean
}

interface InvestmentType {
  title: string,
  description: string,
  options: InvestmentOptions[]
}


export function InvestmentSelector({ handleSelectedOption, investmentContent }: InvestmentTypeProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const { companies, selectedCompany, setSelectedCompany, setCreateNewForm } = useApp()

  // handling this state to show whether it's for view or create new service 
    useEffect(() => {
      setCreateNewForm(true);
      return () => {
        setCreateNewForm(false);
      }
    })

  return (
    <Card className="w-full md:p-10 p-6">
      <div className="">
        {/* Header Section */}
        <div className="flex md:flex-row flex-col justify-between">
          <div className="md:mb-8 mb-4">
            <h1 className="text-xl leading-7 font-semibold text--card-foreground">
              {investmentContent.title}
            </h1>
            <p className="text-sm leading-5 font-normal text-muted-foreground">
              {investmentContent.description}
            </p>
          </div>
          <Select
            value={selectedCompany?.accountID || ''}
            onValueChange={(value) => {
              const selectedValue = companies.find((company: CompanyType) => company.accountID === value)
              selectedValue && setSelectedCompany(selectedValue)
            }}
          >
            <SelectTrigger className="bg-background max-md:mb-4 max-md:w-full">
            <Building2 className="h-4 w-4 mr-2 text-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.accountID} value={company.accountID}>
                  {company.englishName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {investmentContent.options.map((option) => (
            <div
              key={option.id}
              className={cn("overflow-hidden transition-shadow duration-300 flex flex-col h-full border rounded-2xl", {"opacity-60": option.disabled})}
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => {
                setHoveredCard(null)
                setHoveredButton(null)
              }}
              onClick={() => {
                if (!option.disabled) handleSelectedOption(option.id)
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-48 overflow-hidden bg-muted">
                <img
                  src={option.image}
                  alt={option.title}
                  className={`w-full h-full object-cover transition-transform duration-300 ${(hoveredCard === option.id && !option.disabled) ? "scale-110" : "scale-100"
                    }`}
                />

                {/* Apply Button - Shows on Image Hover */}
                {(hoveredCard === option.id && !option.disabled)&& (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300">
                    <button
                      onMouseEnter={() => setHoveredButton(option.id)}
                      onMouseLeave={() => setHoveredButton(null)}
                      className={`
                        relative p-2 bg-maroon-100 hover:bg-[#7A1F2B] text-sm text-white leading-5 font-medium rounded-sm
                        flex items-center gap-2 transition-all duration-300
                      `}
                    >
                      Apply Now
                      {hoveredButton ?
                        <ArrowRight className="w-4 h-4" />
                        : <ArrowUpRight className="w-4 h-4" />
                      }
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="text-base leading-6 font-medium text-foreground">{option.title}</h3>
                <p className="text-sm text-zinc-500 font-normal leading-5">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
