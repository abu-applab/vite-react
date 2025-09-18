import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function NotificationSettings() {
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [smsEnabled, setSmsEnabled] = useState(true);

    return (
        <div className=" ">
            <h2 className="text-lg font-medium my-6">Notification Settings</h2>
            <div className="bg-white rounded-md divide divide-y p-6" >
                <div className="flex items-center justify-between pb-6">
                    <div className="flex items-center gap-5">
                        <div className="flex items-center justify-center w-14 h-14 rounded-md border border-gray-200 bg-white">
                            <Mail className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="space-y-1">
                            <div className="text-gray-900 font-medium">Email Notification</div>
                            <div className="text-gray-500 text-sm">Receive notifications via email</div>
                        </div>
                    </div>
                    <Switch
                        id="hide-closed"
                        checked={emailEnabled}
                        onCheckedChange={setEmailEnabled}
                        className="data-[state=checked]:bg-red-800"
                    />
                </div>
                <div className="flex items-center justify-between pt-6 rounded-lg">
                    <div className="flex items-center gap-5">
                        <div className="flex items-center justify-center w-14 h-14 rounded-md border border-gray-200 bg-white">
                            <Mail className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="space-y-1">
                            <div className="text-gray-900 font-medium">SMS Notification</div>
                            <div className="text-gray-500 text-sm">Receive notifications via SMS</div>
                        </div>
                    </div>
                    <Switch
                        id="hide-closed"
                        checked={smsEnabled}
                        onCheckedChange={setSmsEnabled}
                        className="data-[state=checked]:bg-red-800" 
                    />
                </div>
            </div>
        </div>
    );
}
