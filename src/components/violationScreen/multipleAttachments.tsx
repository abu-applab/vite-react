import { Files, RefreshCw, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";
import { useState, type Dispatch, type SetStateAction } from "react";
import FileUpload from "../file-upload";
import pdfLogo from '../../assets/images/pdf-logo.svg';
import pngLogo from '../../assets/images/png-logo.svg';
import { AttachmentPopup } from "./attachmentPopup";
import { Button } from "../ui/button";
import { formatFileSize } from "@/lib/utils";
import { addFile, fileToBase64 } from "@/lib/fileManager-util";

interface MultipleAttachmentsProps {
    field: { id: string, label: string, disabled?: boolean }
    errors: Record<string, string>
    setErrors: Dispatch<SetStateAction<Record<string, string>>>
    handleInputChange: (fieldId: string, value: any) => void
    formData: Record<string, any>
}

export const MultipleAttachments = ({ field: { id, label, disabled = false }, errors, setErrors, handleInputChange, formData }: MultipleAttachmentsProps) => {
    const { t } = useTranslation();
    const [isPopUpAttachments, setPopUpAttachments] = useState(false);

    const hasUploadPermission = id === "closeoutEvidence";

    // Delete a document by id
    const handleDeleteDocument = (id: number) => {
        const updated = formData.documents.filter((item: any) => item.id !== id);
        setErrors((prev) => ({ ...prev, [id]: '' }))
        handleInputChange("documents", updated);
    };

    // Replace a document by id
    const handleReplaceDocument = async (id: number, newFile: File) => {
        const base64 = await fileToBase64(newFile);
        const updated = formData.documents.map((item: any) =>
            item.id === id
                ? {
                    ...item,
                    fileName: newFile.name,
                    mimeType: newFile.type,
                    fileSize: newFile.size,
                    fileBytes: base64,
                }
                : item
        );
        setErrors((prev) => ({ ...prev, [id]: '' }))
        handleInputChange("documents", updated);
    };

    return (
        <div>
            <Card className={`p-4 border-dashed ${(hasUploadPermission && !disabled) && 'min-h-[300px]'}`}>
                {/* Header */}
                <div className={`flex flex-row items-center justify-between w-full ${(hasUploadPermission && !disabled) && 'border-dashed border-b-1 pb-4'}`}>
                    <div className="flex flex-row items-center gap-2">
                        <div className="p-3 bg-[#f4f4f5] rounded-md">
                            <Files className="w-5 h-5 text-black" />
                        </div>
                        <Label htmlFor={id}>{t(label)}</Label>
                    </div>

                    {Array.isArray(formData[id]) && formData[id].length > 0 && (
                        <div className="flex flex-row items-center gap-2">
                            <button
                                type="button"
                                className="text-sm underline text-[#71717A] font-normal whitespace-nowrap"
                                onClick={() => setPopUpAttachments(true)}
                            >
                                {t("View Previous attached documents")}
                            </button>

                            {/* Rounded previews */}
                            <div className="flex flex-row -space-x-3">
                                {formData[id].slice(0, 3).map((doc: any, index: number) => (
                                    <div
                                        key={index}
                                        className={`
                                            w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-2 ring-white
                                            ${index > 0 ? "clip-right" : ""}
                                        `}
                                    >
                                        <img
                                            src={doc.mimeType === "application/pdf" ? pdfLogo : pngLogo}
                                            alt="File"
                                            className="w-full h-full object-cover p-2.5"
                                        />
                                    </div>
                                ))}
                                {formData[id].length > 3 && (
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-2 ring-white clip-partial">
                                        <span className="text-xs font-medium text-gray-800">
                                            +{formData[id].length - 3}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {(hasUploadPermission && !disabled) && <div className={`${formData?.documents?.length > 0 ? 'grid grid-cols-2 gap-2' : ''}`}>
                    {formData?.documents?.length > 0 && formData.documents.map((doc: any) => (
                        <Card key={doc.id} className="p-2 flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-3 items-center justify-start">
                                <div className="h-12 w-12 p-3">
                                    <img
                                        src={doc.mimeType === "application/pdf" ? pdfLogo : pngLogo}
                                        alt="File"
                                        className="w-9 h-9"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <h4 className="font-medium text-gray-900">{doc.fileName}</h4>
                                    <p className="text-sm text-gray-600">
                                        {'uploaded'} • {formatFileSize(doc.fileSize)}
                                    </p>
                                </div>
                            </div>

                            {/* Right side: Replace/Delete buttons */}
                            <div className="flex flex-row items-center gap-2">
                                <FileUpload
                                    allowMultiple={false}
                                    onFileUpload={(uploaded) => {
                                        if (uploaded instanceof File) {
                                            handleReplaceDocument(doc.id, uploaded);
                                        }
                                    }}
                                    buttonText=""
                                    showUploadIcon={true}
                                    isServiceForm={false}
                                >
                                    <Button className="border-2 h-8 w-8 p-2" variant="ghost">
                                        <RefreshCw className="h-4 w-4 text-[#82764f]" />
                                    </Button>
                                </FileUpload>

                                <Button
                                    className="border-2 h-8 w-8 p-2"
                                    type="button"
                                    variant="ghost"
                                    onClick={() => handleDeleteDocument(doc.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-[#82764f]" />
                                </Button>
                            </div>
                        </Card>
                    ))}

                    {/* Add FileUpload as the last grid item */}
                    {(hasUploadPermission && !(formData?.documents?.length > 4 )) && (
                        <FileUpload
                            onFileUpload={async (file: File | File[]) => {
                                const filesArray = Array.isArray(formData.documents)
                                    ? formData.documents
                                    : [];

                                const uploadList = Array.isArray(file) ? file : [file];

                                let updated = filesArray;

                                for (const f of uploadList) {
                                    updated = await addFile(updated, f);
                                }
                                setErrors((prev) => ({ ...prev, [id]: '' }))
                                handleInputChange("documents", updated);
                            }}
                            handleFileUploadError={(uploadError: string) =>
                                setErrors((prev) => ({ ...prev, [id]: uploadError }))
                            }
                            fileLabel={t(label)}
                            allowMultiple
                            buttonText="browse_file"
                            showUploadIcon
                            isServiceForm={formData?.documents?.length > 0}
                            acceptedLength={5 - (formData?.documents?.length ?? 0)}
                        />
                    )}
                </div>}


                {/* Upload New Files */}

                {errors[id] && (
                    <span className="text-sm text-red-600">{errors[id]}</span>
                )}
            </Card>

            {/* Attachment Popup */}
            <AttachmentPopup
                title={hasUploadPermission ? 'uploaded_closeout_evidence' : 'violation_evidence'}
                open={isPopUpAttachments}
                onOpenChange={setPopUpAttachments}
                documents={formData[id]}
            />
        </div>
    );
};
