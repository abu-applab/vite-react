import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const tabs = [
    { id: 'data', label: 'Data' },
    { id: 'warehouses', label: 'Warehouses' },
    { id: 'retail', label: 'Retail Outlets/Shops' },
    { id: 'accomadations', label: 'Accommodations' },
    { id: 'Logistics', label: 'Open Yards' },
];


const AreaForm = () => {
    return (
        <form className="bg-white rounded-2xl p-6 mx-auto">
            <div className="flex gap-8">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                        Total Area (SQM)<span className="text-red-500">*</span>
                    </label>
                    <Input type="number" name="total_area" required defaultValue={2} />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                        Total Area Occupied (SQM)<span className="text-red-500">*</span>
                    </label>
                    <Input type="number" name="total_area_occupied" required defaultValue={2} />
                </div>
            </div>
            <div className="mt-8 pr-4 w-1/2">
                <label className="block text-sm font-medium mb-2">
                    Occupancy %<span className="text-red-500">*</span>
                </label>
                <Input type="number" name="occupancy" required defaultValue={2} />
            </div>
             <div className="flex justify-between mt-8">
                <Button variant="outline" type="button" className="rounded-md py-1">
                    Cancel
                </Button>
                <Button type="submit" className="bg-maroon-100 text-white px-8 py-2 text-sm font-semibold rounded-md">
                    Submit Report
                </Button>
            </div>
        </form>
    );
}

const EquityReportForm = () => {
    return (
        <form className="max-w-8xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm flex gap-8 items-start">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                        Month<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            type="number"
                            name="month"
                            placeholder="Month"
                            required
                            className="pl-10"
                            defaultValue={2}
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                        Equity (QAR)<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            type="number"
                            name="equity"
                            placeholder="Equity"
                            required
                            className="pl-10"
                            defaultValue={2}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-8">
                <Button variant="outline" type="button" className="rounded-md py-1">
                    Cancel
                </Button>
                <Button type="submit" className="bg-maroon-100 text-white px-8 py-2 text-sm font-semibold rounded-md">
                    Submit Report
                </Button>
            </div>
        </form>
    );
}

const BotReportForm = () => {
    const [activeTab, setActiveTab] = useState('data');

    return <div className="w-full ">
        <div className="flex bg-white  h-[56px] shadow-md gap-[8px]">
            {tabs.map((tab) => (
                <button key={tab.id} className={`py-[10px] mt-[16px]  ml-[40px] text-sm font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {tab.label}
                </button>
            ))}
        </div>
        <div className="p-10 w-full bg-[#fcfaf7] rounded-b-lg">
            <>
                {activeTab === 'data' && <EquityReportForm />}
                {activeTab === 'warehouses' && <AreaForm />}
                {activeTab === 'retail' && <AreaForm />}
                {activeTab === 'accomadations' && <AreaForm />}
                {activeTab === 'Logistics' && <AreaForm />}
            </>
        </div>
    </div>
}

export default BotReportForm;