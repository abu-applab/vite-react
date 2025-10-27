import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import qatarFlag from "@/assets/images/qatar-flag.svg"
import manateqLogo2 from "@/assets/images/manateq-hub-logo.svg"
import { navigationItems } from "@/lib/utils"


interface MobileMenuProps {
    isOpen: boolean,
    onClose: () => void
}


export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-screen w-full bg-[#f6f5ef] transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b w-full h-[88px] md:px-[80px] md:py-6 px-4">
        <img src={manateqLogo2} alt="Manateq Logo" className="w-40" />
        <Button variant="ghost" onClick={onClose} className="text-xl font-bold text-[#852533]">×</Button>
      </div>

      {/* Menu Items */}
      <div className="p-4 flex flex-col gap-6">
        <h3 className="text-xs leading-4 text-neutral-500 uppercase font-normal">Discover</h3>

        {navigationItems.map((item) => (
          <div key={item.name} className="flex flex-col">
            {!item.children ? (
              <button
                className="text-base text-left font-medium leading-4 text-zinc-950 hover:text-[#852533]"
                onClick={() => {
                  navigate(item.href)
                  onClose()
                }}
              >
                {item.name}
              </button>
            ) : (
              <div>
                <button
                  className="flex items-center justify-between w-full text-base font-medium leading-4 text-zinc-950 hover:text-[#852533]"
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  {item.name}
                  {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expanded && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {item.children.map((sub) => (
                      <button
                        key={sub.name}
                        className="text-base font-medium text-gray-950 hover:text-[#852533] text-left"
                        onClick={() => {
                          navigate(sub.href)
                          onClose()
                        }}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="mt-8">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">
            Language Preference
          </h3>
          <Button className="flex items-center gap-2 border px-3 py-2">
            <img src={qatarFlag} alt="Flag" className="w-5 h-5" />
            <span className="text-black text-sm">العربية</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
