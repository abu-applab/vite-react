import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Beaker, Bus, Factory, FlaskRound, Funnel, GitCompare, HandCoins, HandPlatter, Lightbulb, Loader, Origami, Search, ServerCog, Store, TrafficCone, Truck, Warehouse } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
    { icon: <FlaskRound className="h-6 w-6 text-black" />, name: "Chemicals", desc: "Chemical Manufacturing & Processing" },
    { icon: <Beaker className="h-6 w-6 text-black" />, name: "Chemicals & Fertilizer", desc: "Agriculture & Industrial Chemicals" },
    { icon: <Factory className="h-6 w-6 text-black" />, name: "Chemicals Industry", desc: "Specialized Chemical Solutions" },
    { icon: <HandCoins className="h-6 w-6 text-black" />, name: "Commercial", desc: "Commercial & Office spaces" },
    { icon: <Bus className="h-6 w-6 text-black" />, name: "Concreate & Asphalt", desc: "Construction Materials" },
    { icon: <TrafficCone className="h-6 w-6 text-black" />, name: "Construction", desc: "Building & Infrastructure" },
    { icon: <Lightbulb className="h-6 w-6 text-black" />, name: "Light Industry (General)", desc: "Manufacturing & Assembly" },
    { icon: <HandPlatter className="h-6 w-6 text-black" />, name: "Metal Industry", desc: "Metal Processing & Fabrication" },
    { icon: <GitCompare className="h-6 w-6 text-black" />, name: "Mixed Use", desc: "Multi Purpose Developments" },
    { icon: <Store className="h-6 w-6 text-black" />, name: "Open Storage", desc: "Storage & Warehousing" },
    { icon: <Truck className="h-6 w-6 text-black" />, name: "Other-Logistics", desc: "Transportation & Logistics" },
    { icon: <Origami className="h-6 w-6 text-black" />, name: "Plastics", desc: "Plastic Manufacturing" },
    { icon: <ServerCog className="h-6 w-6 text-black" />, name: "Service Centre", desc: "Providing Help Facilities" },
    { icon: <Loader className="h-6 w-6 text-black" />, name: "Utility", desc: "Utility Services" },
    { icon: <Warehouse className="h-6 w-6 text-black" />, name: "Warhouse/Workshop", desc: "Products Storage ouse" },
];

const DirectoryScreen = () => {

    return <div className="">
        <div>
            <h1 className="text-2xl mb-1">Directory</h1>
            <p className="mb-6 text-base text-muted-foreground">
                <Link to="/portal">Home</Link>
                <span className="mx-2">›</span>
                <span className="text-maroon-100">All Investors Directory</span>
            </p>
        </div>
        <div>
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                    <Input placeholder="Search..." className="pl-10 w-md bg-background" />
                </div>
                <Button variant="outline" className="cursor-pointer" onClick={() => { }}>
                    <Funnel className="w-4 h-4" />
                    <span className="font-normal text-xs">Sort by</span>
                </Button>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-6 w-full max-w-8xl">
            {categories.map((cat) => (
                <Card key={cat.name} className="rounded-xl p-6 flex gap-2 flex-col bg-white shadow-sm hover:shadow transition">
                    <div className="border border-gray-200 p-2 rounded-sm w-11">
                        {cat.icon}
                    </div>
                    <span className="text-lg font-semibold">{cat.name}</span>
                    <div>
                        <p className="text-gray-500 text-sm">{cat.desc}</p>
                    </div>
                    <Badge variant="secondary" className="self-start mt-2 p-1">
                        4 Companies
                    </Badge>
                </Card>
            ))}
        </div>
    </div>
}

export default DirectoryScreen;