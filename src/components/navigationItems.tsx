import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { navigationItems } from "@/lib/utils"
import { useTranslation } from "react-i18next"

export function NavigationBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navigate = useNavigate();
  const { t } = useTranslation();

  const pathName = window.location.pathname;
  const isActiveNavItem = (item: any, currentPathname: any) => {
    // If item has children (like Service Request)
    if (item.children) {
      return item.children.some((child: any) =>
        isActivePath(child.href, currentPathname)
      );
    }

    // If item has href
    if (item.href) {
      return isActivePath(item.href, currentPathname);
    }

    return false;
  };

  const isActivePath = (href: any, currentPathname: any) => {
    if (!href) return false;

    // Routes that should match both exact path and subpaths
    const parentRoutes = [
      "/portal/application",
      "/portal/service",
      "/portal/violations"
    ];

    // Check if this is a parent route
    if (parentRoutes.includes(href)) {
      return currentPathname === href ||
        currentPathname.startsWith(`${href}/`);
    }

    // For home, only exact match
    if (href === "/portal") {
      return currentPathname === href;
    }

    // For other routes (payments, allocated-plots, agreements, bot-requests, bot-reports)
    return currentPathname === href;
  };

  const handleNavigation = (href: string) => {
    // If navigating to service, pass state to trigger reset
    if (href === "/portal/service" || href === "/portal/violations") {
      navigate(href, { state: { resetTrigger: true } });
    } else {
      navigate(href);
    }
  };

  return (
    <div className="flex flex-row justify-between h-14 lg:px-[68px] md:px-6 w-full border-b-2 overflow-auto">
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
                  className={`h-full m-0 p-0 px-4 rounded-b-none hover:text-[#852533] hover:bg-[#f6f5ef] ${isActiveNavItem(item, pathName) && "h-14 border-b-4 border-b-[#852533] text-[#852533]"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{t(item.name)}</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {item.children.map((option) => (
                  <DropdownMenuItem key={option.name} onClick={() => handleNavigation(option.href)} className="cursor-pointer" disabled={!!option.disable}>
                    {t(option.name)}
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
            className={`h-full m-0 p-0 px-4 rounded-b-none hover:text-[#852533] hover:bg-[#f6f5ef] cursor-pointer ${isActiveNavItem(item, pathName) ? "h-14 border-b-4 border-b-[#852533] text-[#852533]" : ""
              }`}
            onClick={() => navigate(item.href)}
            disabled={!!item.disable}
          >
            <item.icon className="h-5 w-5" />
            <span>{t(item.name)}</span>
          </Button>
        )
      })}
    </div>
  )
}
