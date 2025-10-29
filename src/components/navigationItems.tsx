import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { navigationItems } from "@/lib/utils"

export function NavigationBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navigate = useNavigate();

  const pathName = window.location.pathname;

  return (
    <div className="flex flex-row justify-between h-[56px] lg:px-20 md:px-6 w-full border-b-2 overflow-auto">
      {navigationItems.map((item) => {
        if (item.children) {
          return (
            <DropdownMenu
              key={item.name}
              open={openDropdown === item.name}
              onOpenChange={(open) => setOpenDropdown(open ? item.name : null)}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`h-full m-0 p-0 px-4 rounded-b-none hover:text-[#852533] hover:bg-[#f6f5ef] ${
                    !!(item.children.find( option => pathName.replace(/^\/[^/]+/, "") === option.href))  && "h-[56px] border-b-2 border-b-[#852533] text-[#852533]"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {item.children.map((option) => (
                  <DropdownMenuItem key={option.name} onClick={() => navigate(option.href)} className="cursor-pointer">
                    {option.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }

        return (
          <Button
            key={item.name}
            variant="ghost"
            className={`h-full m-0 p-0 px-4 rounded-b-none hover:text-[#852533] hover:bg-[#f6f5ef] ${
              pathName.replace(/^\/[^/]+/, "") === item.href && "h-[56px] border-b-2 border-b-[#852533] text-[#852533]"
            }`}
            onClick={() => navigate(item.href)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Button>
        )
      })}
    </div>
  )
}
