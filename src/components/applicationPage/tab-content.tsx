import { MoreVertical } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";

interface Application {
    id: string;
    title: string;
    location: string;
    date: string;
    status: string;
    completion?: number;
}

interface TabsContentProps {
    applications: Application[]
}

export function TabsContent({ applications }: TabsContentProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {applications.map((app) => (
                <Card className="rounded-md">
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-base">{app.title}</h3>
                                <p className="text-sm text-gray-500">{app.id}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${app.status === "Approved" ? "bg-green-100 text-green-600" : app.status === "Pending" ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-700"}`} >
                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                    {app.status}
                                </span>
                                <MoreVertical className="h-5 w-5 text-gray-500" />
                            </div>
                        </div>
                        <div className="my-3 border-t border-gray-200" />
                        <div className="grid grid-cols-2 text-sm">
                            <div>
                                <p className="text-gray-500">Location</p>
                                <p className="font-medium">{app.location}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Submitted Date</p>
                                <p className="font-medium">{app.date}</p>
                            </div>
                        </div>
                        {app.completion !== undefined && (<div className="flex items-center mt-3 gap-1">
                            <Progress value={app.completion} className="flex h-3 rounded bg-gray-100" />
                            <span className="text-xs text-gray-700 ml-2 whitespace-nowrap">{app.completion}% Completed</span>
                        </div>)}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}