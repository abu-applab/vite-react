import type { ForwardRefExoticComponent, RefAttributes } from "react";
import manateqLogo2 from "../../assets/images/manateq-hub-logo.svg"
import { Card } from "../ui/card"
import type { LucideProps } from "lucide-react";


interface SideBar {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    title: string,
    description: string,
    completed: boolean;
}
interface SideBarProps {
    sidebarSteps: SideBar[]
}

const SlideBar = ({sidebarSteps}: SideBarProps) => {
    return (
        <Card className="w-[400px] h-fit m-4 p-0 gap-12 bg-[#fcfaf7]">
            <div>
                <img src={manateqLogo2} alt="logo" className="w-[158px] h-10 mt-10 ml-10" />
                <h1 className="text-2xl font-normal text-maroon-100 leading-tight mt-12 mx-10 w-[320px]">
                    A few steps away from setting up your Investor Portal.
                </h1>
            </div>
            <div className="mx-10">
                {
                    sidebarSteps.map((step, index) => {
                        return (
                            <div className="flex flex-row gap-3 mb-[60px]">
                                <div className={`flex items-center justify-center w-12 h-12 shadow-xs ${step.completed ? 'bg-green-600 text-white' : 'bg-white text-gray-400'} rounded-lg p-3 relative ${sidebarSteps?.[index - 1]?.completed && 'text-green-600'}`}>
                                    <step.icon className="" />
                                    {index < sidebarSteps.length - 1 && <div className={`absolute w-0.5 h-14 top-16 border-l-2 ${step.completed ? "border-green-600" : "border-gray-900 border-dashed"}`} />}
                                </div>
                                <div>
                                    <h3 className={`font-semibold text-base ${(index === 0 || sidebarSteps?.[index - 1]?.completed) ? "text-green-600" : "text-gray-900"}`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-sm font-normal text-gray-600 mt-1 whitespace-pre-line">{step.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="text-gray-600 mt-auto mb-10 w-full flex flex-col items-center justify-center">
                <p>Copyrights © 2023 Manateq</p>
                <p>All Rights Reserved</p>
            </div>
        </Card>
    )
}

export default SlideBar