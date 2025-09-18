import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

const countryCodes = [
    { code: "+1", country: "US"},
    { code: "+44", country: "UK"},
    { code: "+33", country: "FR"},
    { code: "+49", country: "DE"},
    { code: "+81", country: "JP"},
    { code: "+86", country: "CN"},
    { code: "+91", country: "IN"},
    { code: "+974", country: "QA"},
  ]

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export function PhoneInput({
  value = "",
  onChange,
  placeholder = "30321865",
  required = false,
  className,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(
    countryCodes.find((c) => c.code === "+974") || countryCodes[0],
  )
  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    if (value) {
      // Parse existing value to extract country code and number
      const countryCode = countryCodes.find((cc) => value.startsWith(cc.code))
      if (countryCode) {
        setSelectedCountry(countryCode)
        setPhoneNumber(value.slice(countryCode.code.length))
      }
    }
  }, [value])

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value
    setPhoneNumber(newNumber)
    onChange?.(selectedCountry.code + newNumber)
  }

  const handleCountryChange = (country: (typeof countryCodes)[0]) => {
    setSelectedCountry(country)
    onChange?.(country.code + phoneNumber)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="phone-input" className="text-sm font-medium">
        Phone Number {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 rounded-r-none border-r-0 px-3 bg-transparent">
              <span className="text-sm">{selectedCountry.code}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 max-h-60 overflow-y-auto">
            {countryCodes.map((country) => (
              <DropdownMenuItem
                key={`${country.code}-${country.country}`}
                onClick={() => handleCountryChange(country)}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-mono">{country.code}</span>
                <span className="text-xs text-muted-foreground truncate">{country.country}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          id="phone-input"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={placeholder}
          className="rounded-l-none"
          required={required}
        />
      </div>
    </div>
  )
}
