import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, CloudDownload, Download } from "lucide-react"

interface UploadedFile {
    name: string
    size: string
}

interface FileUploadProps {
    label: string
    required?: boolean
}

const FileUpload = ({ label, required }: FileUploadProps) => {
    const [file, setFile] = useState<UploadedFile | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const uploaded = e.target.files[0]
            setFile({
                name: uploaded.name,
                size: `${(uploaded.size / (1024 * 1024)).toFixed(1)} MB`,
            })
        }
    }

    return (
        <div className="flex flex-col gap-2 w-full max-w-md">
            <label className="text-sm font-medium text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {file ? (
                <Card className="flex flex-row items-center bg-transparent justify-between p-3 border rounded-lg shadow-sm">
                    <CardContent className="flex items-center gap-3 p-0">
                        <div className="flex items-center gap-2">
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <FileText className="w-4 h-4 text-red-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                            </div>
                        </div>
                    </CardContent>
                    <Button variant="ghost" size="icon" className="border border-gray-100">
                        <Download className="w-5 h-5" />
                    </Button>
                </Card>
            ) : (
                <label className="flex flex-row items-center gap-4 border-2 border-dashed rounded-lg p-3 text-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition">
                    <div className="p-3 bg-gray-100 rounded-lg">
                        <CloudDownload className="w-4 h-4 text-black" />
                    </div>
                    <div className="flex flex-col w-full text-left gap-1">
                        <span className="text-xs text-black">Drop your file here</span>
                        <span className="text-xs text-gray-400">PDF or Word up to 10 MB</span>
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                    </div>
                    <div className="">
                        <Button variant="outline" size="sm" className="">
                            Browse File
                        </Button>
                    </div>
                </label>
            )}
        </div>
    )
}

export default function FileUploadSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FileUpload label="Lease Contract" required />
            <FileUpload label="Building Permit" required />
            <FileUpload label="Fire Inspection Report" required />
            <FileUpload label="Completion Certificate" required />
        </div>
    )
}
