import { Button } from "./ui/button"
import qatarFlag from "../assets/images/qatar-flag.svg"
// import { Sun, Moon } from "lucide-react"
// import { useState } from "react"

const loginHeader = () => {
    // const [isDark, setIsDark] = useState(false)

    // const toggleTheme = () => {
    //     setIsDark(!isDark)
    // }
  return (
    <div className="flex gap-2 absolute right-4 top-4">
        <Button className="flex cursor-pointer h-10 p-1.5 gap-0.5 hover:bg-gray-50">
          <img src={qatarFlag} className="w-4 h-4" alt="Qatar flag "/>
          <span className="text-black">العربية</span>
        </Button>
        {/* <div className="flex shadow-sm p-0.5 rounded-md h-10">
            <Button className={`${isDark ? 'border-none shadow-none hover:bg-gray-100 ' : 'bg-white hover:bg-whites'} cursor-pointer rounded-l-sm`}  onClick={() => toggleTheme()}>
               <Sun className="h-4 w-4 text-[#852533]" />
            </Button>
            <Button className={`${isDark ? 'bg-white hover:bg-white' : 'border-none shadow-none hover:bg-gray-100'} cursor-pointer rounded-l-sm`} onClick={() => toggleTheme()}>
               <Moon className="h-4 w-4 text-[#852533]" />
            </Button>
        </div> */}
    </div>
  )
}

export default loginHeader