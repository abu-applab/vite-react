import { CloudDownload, CloudUpload, Download } from 'lucide-react'
import { useCallback, useState, type ReactNode } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'

interface FileUploadProps {
    onFileUpload: (file: File | File[]) => void
    isServiceForm?: boolean
    accepetedFile?: string
    fileLabel?: string
    handleFileUploadError?: (text: string) => void
    allowMultiple?: boolean
    acceptedLength?: number
    buttonText?: string
    showUploadIcon?: boolean
    children?: ReactNode   // 👈 ADDED CHILDREN
}

const FileUpload = ({
    onFileUpload,
    isServiceForm = false,
    accepetedFile,
    fileLabel,
    handleFileUploadError,
    allowMultiple = false,
    acceptedLength = 1,
    buttonText = '',
    showUploadIcon = false,
    children,
}: FileUploadProps) => {

    const [isDragActive, setIsDragActive] = useState(false);
    const { t } = useTranslation();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (allowMultiple) {
            if (acceptedFiles.length > acceptedLength) {
                handleFileUploadError?.(`You can upload max 5 files only!`);
                return;
            }
            onFileUpload(acceptedFiles);
        } else if ((acceptedFiles.length > 0)) {
            onFileUpload(acceptedFiles[0]);
        }
        setIsDragActive(false)
    }, [onFileUpload, allowMultiple]);

    const onDropRejected = (fileRejections: FileRejection[]) => {
        fileRejections.forEach(({ errors }) => {
            errors.forEach((err) => {
                if (err.code === "file-too-large") {
                    handleFileUploadError?.("Uploaded file is too large. Max 2MB allowed.");
                } else if (err.code === "file-invalid-type") {
                    handleFileUploadError?.("Invalid type. Only PDF, JPG, PNG allowed.");
                } else if (err.code === "too-many-files") {
                    handleFileUploadError?.("Only up to 5 files can be uploaded.");
                } else {
                    handleFileUploadError?.(err.message);
                }
            });
        });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDropRejected,
        accept: {
            "application/pdf": [".pdf"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
        },
        maxSize: 2 * 1024 * 1024,
        multiple: allowMultiple,
        maxFiles: allowMultiple ? 5 : 1,
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
    });

    return (
        <div
            {...getRootProps()}
            className={`${!children ? 'border-2 border-dashed rounded-2xl text-center cursor-pointer': '!p-0'}
                ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}
                ${isServiceForm ? 'm-0 p-1' : 'p-2 py-10'}
            `}
        >
            {/* Hidden file input */}
            <input {...getInputProps()} />

            {/* 👇 IF CHILDREN PROVIDED → RENDER CHILDREN */}
            {children ? (
                children
            ) : (
                <>
                    {!isServiceForm ? (
                        <div className='flex flex-col justify-center items-center space-y-2'>
                            <div className='w-12 h-12'>
                                <CloudUpload className='text-gray-400 p-1 w-full h-full' />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Drop your file here</h3>
                            <p className="text-gray-400">{accepetedFile}</p>
                            <span>or</span>
                            <Button type="button" variant="ghost" className='hover:bg-gray-100 border'>
                                {t('browse_file')}
                            </Button>
                        </div>
                    ) :
                        <div className={`flex flex-row items-center justify-between ${showUploadIcon ? 'p-3': 'p-4'}`}>
                            <div className='flex flex-row items-center justify-start gap-3'>
                                {showUploadIcon && <div className='w-10 h-10'>
                                    <Download className='text-gray-400 p-2 w-full h-full' />
                                </div>}
                                <div className='flex flex-col items-start'>
                                    <h4 className="text-base font-medium text-gray-900">{fileLabel}</h4>
                                    <p className="text-gray-400 text-xs font-normal">{t('no_file_selected')}</p>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                className='hover:bg-gray-100 border border-[#E4E4E7] rounded-lg px-3 py-1.5'
                            >
                                <div className='flex items-center justify-between gap-2'>
                                    <CloudDownload className='w-4 h-4' />
                                    <span>{t(buttonText ?? 'upload_file')}</span>
                                </div>
                            </Button>
                        </div>
                    }
                </>
            )}
        </div>
    );
};

export default FileUpload;
