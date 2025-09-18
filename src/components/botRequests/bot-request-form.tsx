import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { UploadIcon } from "lucide-react";
import { Button } from "../ui/button";


export default function RequestForm() {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    return (
        <form className="p-10 max-w-8xl mx-auto space-y-8 bg-[#FAF9F6] rounded-lg">
            <h2 className="text-md font-medium mb-4">Request Details</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category<span className="text-red-500">*</span>
                    </label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full" />
                        <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description<span className="text-red-500">*</span>
                    </label>
                    <Textarea
                        className="w-full"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
            </div>
            <h2 className="text-md font-medium mb-4">Attachments</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 flex flex-col items-center justify-center text-center transition hover:bg-gray-50">
                    <UploadIcon className="h-10 w-10 text-gray-400 mb-2" />
                    <div className="font-medium text-gray-700 mb-2">Drop your file here</div>
                    <div className="text-xs text-gray-400">
                        or, just click to browse some local files (up to 2 MB) in pdf, docx, xlsx, pptx, jpg, png... Max size 2MB each.
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-2">
                <Button type="button" variant="outline" className="text-gray-500 rounded-md">
                    Cancel
                </Button>
                <Button type="submit" className="bg-maroon-100 text-white font-medium rounded-md px-6">
                    Submit Request
                </Button>
            </div>
        </form>
    );
}
