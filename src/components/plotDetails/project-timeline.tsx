import {
    Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Lock, Milestone, Construction, Settings } from "lucide-react";
import pdfLogo from "../../assets/images/pdf-logo.svg"

export default function ProjectTimeline() {
    return (
        <Card className="p-0 bg-transparent shadow-none border-0">
            <section>
                <div className="flex items-center space-x-4 mb-1">
                    <div className="p-3 rounded-full bg-green-600 text-white">
                        <Milestone className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold"> Pre-Development Phase </h3>
                        <p className="text-muted-foreground text-sm max-w-xl whitespace-nowrap">
                            Planning and approvals before starting construction. Includes consultant review and necessary permits.
                        </p>
                    </div>
                </div>
                <div className="ml-5">
                    <div className="">
                        <div className="border-l-2 border-gray-200 h-8" />
                        <div className="relative ml-4">
                            <span className="absolute -left-5 top-2 h-3 w-3 rounded-full bg-green-600" />
                            <div className="flex items-center space-x-2 mb-1 ml-2">
                                <h3 className="text-sm font-medium">Consultant & DC1 Approval</h3>
                                <span className={"flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600"}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                    <span className="text-xs font-normal">Approved</span>
                                </span>
                                <p className="text-muted-foreground text-sm">Due : 30/08/2025</p>
                            </div>
                        </div>
                        <div className="border-l-2 p-6  border-gray-200">
                            <div className="border bg-background border-gray-300 mb-2 rounded-lg p-2 w-[250px] max-w-xs">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-[#fcfaf7] h-10 w-10 p-1 rounded-md flex items-center justify-center">
                                        <img src={pdfLogo} alt="pdf logo" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium">Document 1.pdf</span>
                                        <span className="text-muted-foreground text-xs">{'4 MB'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="relative ml-4">
                            <span className="absolute -left-5 top-2 h-3 w-3 rounded-full bg-yellow-400"></span>
                            <div className="flex items-center ml-2 space-x-2 mb-1">
                                <p className="text-sm font-medium">DC2 Approval</p>
                                <span className={"flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-600"}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                    <span className="text-xs font-normal">pending</span>
                                </span>
                                <p className="text-muted-foreground text-sm">Due Date: 15/09/2025</p>
                            </div>
                        </div>
                        <div className="border-l-2 p-6  border-gray-200">
                            <button
                                className="inline-flex items-center space-x-1 rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
                                type="button"
                            >
                                <UploadCloud className="h-4 w-4" />
                                <span>Upload Document</span>
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <div className="relative ml-4">
                            <span className="absolute -left-5 top-2 h-3 w-3 rounded-full bg-gray-300"></span>
                            <div className="flex items-center space-x-2 mb-1 ml-2 text-muted-foreground">
                                <p className="text-sm font-medium">Building Permit</p>
                                <span className={"flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600"}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                    <span className="text-xs font-normal">Not Started</span>
                                </span>
                                <p className="text-sm">Due Date: 10/10/2025</p>
                            </div>
                        </div>
                        <div className="border-l-2 p-6  border-gray-200">
                            <button
                                className="inline-flex items-center space-x-1 rounded border px-3 py-1 text-sm bg-gray-100"
                                type="button"
                            >
                                <UploadCloud className="h-4 w-4" />
                                <span>Upload Document</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="flex items-center space-x-4 mb-1">
                    <div className="p-3 rounded-full border border-gray-300 text-gray-400">
                        <Construction className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">Development Phase </h3>
                        <p className="text-muted-foreground text-sm max-w-xl whitespace-nowrap">
                            Construction phase where key milestones like start proof and
                            final completion are submitted.
                        </p>
                    </div>
                </div>
                <div className="ml-5">
                    <div>
                        <div className="border-l-2 border-gray-200 h-8" />
                        <div className="relative ml-4">
                            <span className="absolute -left-5 top-2 h-3 w-3 rounded-full bg-gray-300" />
                            <div className="flex items-center space-x-2 mb-1 ml-2">
                                <p className="font-medium text-sm text-gray-500">Commencement Proof</p>
                                <Badge
                                    variant="outline"
                                    className="ml-2 px-2 py-1 bg-gray-100"
                                >
                                    <Lock className="mr-1 h-4 w-4" />
                                    Locked
                                </Badge>
                                <p className="text-muted-foreground text-sm">Due Date: 12/04/2026</p>
                            </div>
                        </div>
                        <div className="border-l-2 p-6  border-gray-200">
                            <button
                                className="inline-flex items-center space-x-1 rounded border border-gray-300 px-3 py-1 text-sm bg-gray-100"
                                type="button"
                            >
                                <UploadCloud className="h-4 w-4" />
                                <span>Request Inspection</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="relative ml-4">
                            <span className="absolute -left-5 top-2 h-3 w-3 rounded-full bg-gray-300" />
                            <div className="flex items-center space-x-2 ml-2 mb-1">
                                <p className="font-medium text-sm text-gray-500">Completion</p>
                                <Badge
                                    variant="outline"
                                    className="ml-2 px-2 py-1 bg-gray-100"
                                >
                                    <Lock className="mr-1 h-4 w-4" />
                                    Locked
                                </Badge>
                                <p className="text-muted-foreground text-sm">Due Date: 12/11/2027</p>
                            </div>
                        </div>
                        <div className="border-l-2 p-6  border-gray-200">
                            <button
                                className="inline-flex items-center space-x-1 rounded border border-gray-300 px-3 py-1 text-sm bg-gray-100"
                                type="button"
                            >
                                <UploadCloud className="h-4 w-4" />
                                <span>Upload Completion Proof</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="flex items-center space-x-4 mb-1">
                    <div className="p-3 rounded-full border border-gray-300 text-gray-400">
                        <Settings className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">  Operational Phase </h3>
                        <p className="text-muted-foreground text-sm max-w-xl whitespace-nowrap">
                            Post-construction phase. The project becomes active and must follow
                            ongoing compliance.
                        </p>
                    </div>
                </div>
                <div className="ml-5">
                    <div className="border-l-2 border-gray-200 h-8" />
                    <div className="relative ml-4">
                        <span className="absolute -left-5 top-2 h-3 w-3 rounded-full bg-gray-300" />
                        <div className="flex items-center space-x-2 ml-2 mb-1">
                            <p className="font-semibold text-gray-500">Non-Operational Yet</p>
                            <Badge
                                variant="outline"
                                className="ml-2 px-2 py-1 bg-gray-100"
                            >
                                <Lock className="mr-1 h-4 w-4" />
                                Locked
                            </Badge>
                        </div>
                        <p className="text-muted-foreground text-xs italic max-w-xl mt-3 ml-2">
                            Note: This will auto-update after completion is approved
                        </p>
                    </div>
                </div>
            </section>
        </Card>
    );
}
