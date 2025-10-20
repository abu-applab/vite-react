import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"


interface InvestmentTypeProps {
  handleSelectedOption: (val: string) => void
  investmentContent: InvestmentType
}

interface InvestmentOptions {
  id: string
  title: string
  description?: string
  image: string
}

interface InvestmentType {
  title: string,
  description: string,
  options: InvestmentOptions[]
}


export function InvestmentSelector({handleSelectedOption, investmentContent} : InvestmentTypeProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
    <Card className="w-full p-10">
      <div className="">
        {/* Header Section */}
        <div className="flex flex-row justify-between">
          <div className="mb-8">
            <h1 className="text-xl leading-7 font-semibold text--card-foreground">
              {investmentContent.title}
            </h1>
            <p className="text-sm leading-5 font-normal text-muted-foreground">
              {investmentContent.description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto whitespace-nowrap bg-transparent">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2m6 0a2 2 0 012 2v2h.01M9 3a2 2 0 00-2 2v2H5a2 2 0 00-2 2v3a2 2 0 002 2h2v2a2 2 0 002 2h6a2 2 0 002-2v-2h2a2 2 0 002-2V9a2 2 0 00-2-2h-.01V5a2 2 0 00-2-2h-2zm0 5a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                Al Noor Real Estate
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Al Noor Real Estate</DropdownMenuItem>
              <DropdownMenuItem>Other Option 1</DropdownMenuItem>
              <DropdownMenuItem>Other Option 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {investmentContent.options.map((option) => (
            <div
              key={option.id}
              className="overflow-hidden transition-shadow duration-300 flex flex-col h-full border rounded-2xl"
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => {
                setHoveredCard(null)
                setHoveredButton(null)
              }}
              onClick={() => handleSelectedOption(option.id)}
            >
              {/* Image Container */}
              <div className="relative w-full h-48 overflow-hidden bg-muted">
                <img
                  src={option.image}
                  alt={option.title}
                  className={`w-full h-full object-cover transition-transform duration-300 ${hoveredCard === option.id ? "scale-110" : "scale-100"
                    }`}
                />

                {/* Apply Button - Shows on Image Hover */}
                {hoveredCard === option.id && (
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
