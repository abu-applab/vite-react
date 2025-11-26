import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, User2 } from "lucide-react";
import { useState } from "react";
import CustomForm from "../custom-form";

const fieldLabels: Record<string, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    landline: "Landline Number",
}

export default function ProfileSettings() {
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState({
        firstName: "Ahmed",
        lastName: "Al-Mahmoud",
        email: "ahmed.mahmoud@company.bh",
        phone: "+973 12345678",
        landline: "44443333",
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        setIsEditing(false);
    };

    const handleChange = (id: string, value: any) => {
        setForm((prev) => ({ ...prev, [id]: value }))
    }

    return (
        <div className="mt-6 space-y-6 bg-muted/30 min-h-screen">
            <div className="space-y-4">
                <h2 className="text-lg font-medium">Change Profile</h2>
                <Card className="rounded-xl">
                    <CardContent className="flex items-center gap-6 p-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                                <User2 className="w-10 h-10 text-gray-400" />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-maroon-100 rounded-full p-1.5">
                                <Camera className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button className="bg-maroon-100 text-white hover:bg-gray-800 py-5">
                                Change Avatar
                            </Button>
                            <Button className="py-5" variant="outline">Remove Avatar</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-4">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">User Details</h2>
                    <Card className="rounded-xl">
                        <CardContent className="p-0">
                            {isEditing ? (
                                <CustomForm formData={form} handleChange={handleChange} handleSubmit={handleSave} formType="profileForm" />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {Object.entries(fieldLabels).map(([key, label]) => (
                                        <div key={key}>
                                            <p className="text-sm text-muted-foreground">{label}</p>
                                            <p className="text-base font-semibold">{form[key as keyof typeof form]}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                {isEditing ? <div className="col-span-2 flex justify-between mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="py-5 bg-transparent"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className="bg-maroon-100 py-5 text-white"
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </div>
                    : (
                        <div className="flex justify-end">
                            <Button
                                className="bg-maroon-100 text-white px-8 py-5"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </Button>
                        </div>
                    )}
            </div>
        </div>
    );
}
