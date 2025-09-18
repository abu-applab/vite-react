import PasswordResetForm from "@/components/settings/change-password";
import NotificationSettings from "@/components/settings/notification-settings";
import ProfileSettings from "@/components/settings/profile-settings";
import { useState } from "react";
import { Link } from "react-router-dom"

const tabs = [
    { id: 'profile', label: 'User Profile' },
    { id: 'changePassword', label: 'Change Password' },
    { id: 'notification', label: 'Notification Preference' },
];

const settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="mx-[80px] mt-10">
            <div>
                <h1 className="text-xl mb-1">Settings</h1>
                <p className="mb-6 text-base text-muted-foreground">
                    <Link to="/portal">Home</Link>
                    <span className="mx-2 text-xl">›</span>
                    <span className="text-maroon-100">Settings</span>
                </p>
            </div>
            <div className="w-full">
                <div className="flex bg-white rounded-xl h-[56px] shadow-md px-6 gap-14">
                    {tabs.map((tab) => (
                        <button key={tab.id} className={`py-[10px] mt-[8px] text-md font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {tab.label}
                        </button>
                    ))}
                </div>
                <div className="w-full min-h-screen">
                    {activeTab === 'profile' && <ProfileSettings />}
                    {activeTab === 'changePassword' && <PasswordResetForm/>}
                    {activeTab === 'notification' && <NotificationSettings />}
                </div>
            </div>
        </div>
    )
}

export default settings