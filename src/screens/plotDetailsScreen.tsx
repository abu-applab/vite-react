import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Wakrah from "../assets/images/wakrah.png";
import { useState } from "react";
import ProjectTimeline from "@/components/plotDetails/project-timeline";
import PaymentTable from "@/components/plotDetails/payment-table";
import FileUploadSection from "@/components/plotDetails/documents";
import FindingsList from "@/components/plotDetails/inspections-and-findings";
import ActionCards from "@/components/plotDetails/action-cards";
import ActivityList from "@/components/plotDetails/activity-log";

const tabs = [
    { id: 'phaseAndMilestones', label: 'Phase & Milestones Timeline' },
    { id: 'paymentHistory', label: 'Payment History' },
    { id: 'documents', label: 'Documents' },
    { id: 'inspectionsAndFindings', label: 'Inspections & Findings' },
    { id: 'actions', label: 'Actions' },
    { id: 'activityLog', label: 'Activity Log' },
];

const PlotDetailsScreen = () => {
    // const { id } = useParams();
    const [activeTab, setActiveTab] = useState('phaseAndMilestones');

    return <div className="mx-[80px] mt-10">
        <div>
            <h1 className="text-2xl mb-1">Allocated Plots</h1>
            <p className="mb-6 text-base text-muted-foreground">
                <Link to="/portal">Home</Link>
                <span className="mx-2">›</span>
                <Link to="/portal">Al Noor Real Estate W.L.L</Link>
                <span className="mx-2">›</span>
                <Link to="/portal/allocated-plots">Allocated Plots</Link>
                <span className="mx-2">›</span>
                <span className="text-maroon-100">#AP-IZ-LE-81692</span>
            </p>
        </div>
        <Card className="py-6 flex flex-row items-stretch gap-2">
            <div className="flex-1 flex flex-col justify-between max-w-1/2 w-1/2">
                <CardHeader className="pb-2">
                    <div className="pb-6 border-b b-2">
                        <div className="flex justify-between gap-2">
                            <span className="text-lg font-medium tracking-wide">#AP-IZ-LE-81686</span>
                            <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
                                <span className="h-2 w-2 rounded-full bg-green-600 mr-1"></span>
                                Industrial
                            </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center mt-1 gap-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            Al Wakrah Industrial Area
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-y-6">
                        <div className="gap-y-2">
                            <span className="block text-xs text-muted-foreground">Area/Size</span>
                            <span className="text-base font-medium">2500 m²</span>
                        </div>
                        <div className="gap-y-2">
                            <span className="block text-xs text-muted-foreground">Lease Renewal Date</span>
                            <span className="text-base font-medium">11-07-2025</span>
                        </div>
                        <div className="gap-y-2">
                            <span className="block text-xs text-muted-foreground">Lease Expiry Date</span>
                            <span className="text-base font-medium">11-05-2025</span>
                        </div>
                        <div className="gap-y-2">
                            <span className="block text-xs text-muted-foreground">Status</span>
                            <span className="text-base font-medium">Under</span>
                        </div>
                    </div>
                    <div className="w-full bg-rose-50 rounded-md px-4 py-2 flex justify-center items-center mt-6">
                        <AlertCircle className="h-4 w-4 text-rose-500 mr-2" />
                        <span className="text-maroon-100 text-xs font-medium">Payments Overdue</span>
                    </div>
                </CardContent>

            </div>
            <div className="w-1/2 rounded-lg rounded-br-lg overflow-hidden flex items-center justify-center min-h-[240px] pr-6">
                <div className="w-full h-full overflow-hidden rounded-lg">
                    <img
                        src={Wakrah}
                        alt="Map"
                        className="object-cover w-full"
                    />
                </div>
            </div>
        </Card>
        <div className="w-full mt-8 rounded-lg overflow-hidden">
            <div className="flex bg-white  h-[56px] shadow-md gap-[8px]">
                {tabs.map((tab) => (
                    <button key={tab.id} className={`py-[10px] mt-[16px]  ml-[40px] text-sm font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-8 w-full bg-[#fcfaf7] rounded-b-lg">
                {activeTab === 'phaseAndMilestones' && <ProjectTimeline />}
                {activeTab === 'paymentHistory' && <PaymentTable />}
                {activeTab === 'documents' && <FileUploadSection  />}
                {activeTab === 'inspectionsAndFindings' && <FindingsList />}
                {activeTab === 'actions' && <ActionCards />}
                {activeTab === 'activityLog' && <ActivityList />}
            </div>
        </div>
    </div>;
}
export default PlotDetailsScreen;