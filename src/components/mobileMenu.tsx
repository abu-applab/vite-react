import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Menu } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import qatarFlag from "@/assets/images/qatar-flag.svg"
import manateqLogo2 from "@/assets/images/manateq-hub-logo.svg"
import { navigationItems } from "@/lib/utils"
import { useTranslation } from "react-i18next"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  switchLanguage: () => void
}

export const MobileMenu = ({ isOpen, onClose, switchLanguage }: MobileMenuProps) => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const {t} = useTranslation();

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-screen w-full bg-[#f6f5ef] transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b w-full h-[88px] md:px-[80px] md:py-6 px-4">
        <img src={manateqLogo2} alt="Manateq Logo" className="w-40" />
        <Button
          variant="ghost"
          onClick={onClose}
          className="font-bold text-white bg-maroon-100 hover:text-100 hover:bg-maroon-100 h-10"
        >
          <Menu className={`w-2 h-2`} />
        </Button>
      </div>

      {/* Menu Items */}
      <div className="p-4 flex flex-col gap-6">
        <h3 className="text-xs leading-4 text-neutral-500 uppercase font-normal">
          {('discover')}
        </h3>

        {navigationItems.map((item) => (
          <div key={item.name} className="flex flex-col">
            {!item.children ? (
              <Button
                variant="ghost"
                className="justify-start p-0 h-auto text-base font-medium leading-4 text-zinc-950 hover:text-[#852533] hover:bg-transparent"
                onClick={() => {
                  navigate(item.href)
                  onClose()
                }}
              >
                {t(item.name)}
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center justify-between w-full p-0 !px-0 h-auto text-base font-medium leading-4 text-zinc-950 hover:text-[#852533] hover:bg-transparent"
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  {item.name}
                  {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </Button>
                {expanded && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {item.children.map((sub) => (
                      <Button
                        key={sub.name}
                        variant="ghost"
                        className="justify-start p-0 h-auto text-base font-medium text-gray-950 hover:text-[#852533] hover:bg-transparent"
                        onClick={() => {
                          navigate(sub.href)
                          onClose()
                        }}
                      >
                        {t(sub.name)}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        <div className="mt-8">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">
          {t('language_preference')}
          </h3>
          <Button className="flex items-center gap-2 border px-3 py-2" onClick={switchLanguage}>
            <img src={qatarFlag} alt="Flag" className="w-5 h-5" />
            <span className="text-black text-sm">العربية</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
