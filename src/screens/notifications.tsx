import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { FileSearch, FileX, HandCoins, PcCase, RefreshCcwDot, Search, Stamp, Wallet, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import avatar from ".././assets/images/Avatar.svg"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';


const notifications = [
    {
        type: "Payment Due Remainder",
        message: "Payment for Agreement AG-LP-104583-00081754 is due in 3 days (QAR 4,168)",
        date: "5 May 2025",
        time: "12:15 AM",
        icon: HandCoins,
        unread: true,
    },
    {
        type: "Agreement Approved",
        message: "Your land plot agreement AG-LP-203587-028271924 has been approved and is now active",
        date: "12 May 2025",
        time: "12:15 AM",
        icon: Stamp,
        unread: true,
    },
    {
        type: "Document Access Request",
        message: "Mohammed Khalil has requested access to your company documents",
        date: "24 Mar 2025",
        time: "12:15 AM",
        icon: FileSearch,
    },
    {
        type: "Payment Confirmation",
        message: "Payments of QAR 20,000 for Agreement AG-LP-203587-00000836272 has been processed successfully",
        date: "5 May 2025",
        time: "12:15 AM",
        icon: Wallet,
    },
    {
        type: "System Maintenance Notice",
        message: "Scheduled maintenance will occur on January 25, 2024 from 2:00 AM to 4:00 AM",
        date: "5 May 2025",
        time: "12:15 AM",
        icon: PcCase,
    },
    {
        type: "Document Upload Failed",
        message: "Failed to upload contract document, Please check file format and try again.",
        date: "5 May 2025",
        time: "12:15 AM",
        icon: FileX,
    },
    {
        type: "Contract Renewal Remainder",
        message: "Your agreement AG-LP-203587-009962637 is up for renewal in 30 days",
        date: "5 May 2025",
        time: "12:15 AM",
        icon: RefreshCcwDot,
    },
    {
        type: "Late Payment Fee Applied",
        message: "A late payment fee of QAR 50 has been applied to your account for overdue payment",
        date: "5 May 2025",
        time: "12:15 AM",
        icon: WalletCards,
    },
];

const Notifications = () => {
    const [hideClosed, setHideClosed] = useState(false)

    return (
        <div className="">
            <div>
                <h1 className="text-2xl mb-1">Notifications</h1>
                <p className="mb-6 text-base text-muted-foreground">
                    <Link to="/portal">Home</Link>
                    <span className="mx-2 text-xl">›</span>
                    <span className="text-maroon-100">All Notifications</span>
                </p>
            </div>
            <div className="flex items-center gap-4 my-8">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={avatar} alt="Mushthtofa Ahmad Kamal" />
                    <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Hello, Mushthtofa Ahmad Kamal</h1>
                    <div className='inline-flex flex-row bg-red-100 rounded-full gap-2 items-center py-1 px-2'>
                        <div className='w-2 h-2 rounded-full bg-maroon-100' />
                        <p className="text-xs  text-maroon-100">You have 2 new Notifications</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between my-4'>
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
                    <Input placeholder="Search..." className="pl-10 max-w-sm bg-background" />
                </div>
                <div className="flex items-center gap-2">
                    <Label
                        htmlFor="hide-closed"
                        className="text-sm font-normal"
                    >
                        Show Read Notifications
                    </Label>
                    <Switch
                        id="hide-closed"
                        checked={hideClosed}
                        onCheckedChange={setHideClosed}
                        className="data-[state=checked]:bg-red-800"
                    />
                </div>
            </div>
            <div className="bg-white rounded-lg max-w-8xl mx-auto">
                <ul className="divide-y divide-gray-200">
                    {notifications.map((item, idx) => (
                        <li key={idx} className="relative flex items-center px-8 py-6">
                            {item.unread && (
                                <span className="absolute left-3 w-2 h-2 rounded-full bg-maroon-100" />
                            )}
                            <div className="w-12 h-12 p-3 rounded-lg border items-center justify-center relative">
                                <item.icon className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="flex-1 px-4 space-y-1">
                                <div className="font-medium text-gray-900">{item.type}</div>
                                <div className="text-sm text-gray-500 truncate">{item.message}</div>
                            </div>
                            <div className="flex text-xs gap-2 text-gray-400 min-w-[88px]">
                                <span>{item.date}</span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#A0A0A0] rounded-full inline-block" />
                                    {item.time}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Notifications;