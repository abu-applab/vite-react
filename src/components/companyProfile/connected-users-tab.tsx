import { EllipsisVertical, Plus, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const users = {
    "user_info": {
        "name": "Adel Hasan",
        "qid": "284176XXXXXXX"
    },
    "contact_info": {
        "Email Address": "alnoor.12@applab.qa",
        "Mobile Number": "30321876",
        "Landline Number": "30273622",
        "Role": "Legal Admin",
        "Connected On": "08-07-2025"
    }
}

export default function ConnectedUsers() {
    return (
        <div className="w-full">
            <div className="my-4 flex flex-row justify-end">
                <Button variant="outline" className="bg-white text-gray-900" onClick={() => { }}>
                    <Plus className="h-4 w-4" />
                    Add New User
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[users, users].map(({ user_info, contact_info }, idx) => (
                    <Card key={idx} className="shadow-sm">
                        <CardHeader className="flex flex-row items-start justify-between border-b">
                            <div className="flex items-center gap-3">
                                <div className="border p-3 rounded-lg">
                                    <User className="h-6 w-6 text-gray-900" />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-lg font-medium">{user_info.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">QID: {user_info.qid}</p>
                                </div>
                            </div>
                            <EllipsisVertical className="h-4 w-4" />
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-y-6 gap-x-10 text-sm">
                            {Object.entries(contact_info).map(([key, value]) => <div className="space-y-1">
                                <p className="font-normal text-gray-500">{key}</p>
                                <p className="font-medium">{value}</p>
                            </div>)}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );
}
