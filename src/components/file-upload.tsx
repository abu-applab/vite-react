import { CloudDownload, CloudUpload } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'

interface FileUploadProps {
    onFileUpload: (file: File) => void
    isServiceForm?: boolean
    accepetedFile?: string
    fileLabel?: string
    handleFileUploadError?: (text: string) => void
}
const FileUpload = ({ onFileUpload, isServiceForm = false, accepetedFile, fileLabel, handleFileUploadError }: FileUploadProps) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const { t } = useTranslation();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileUpload(acceptedFiles[0])
        }
    }, [onFileUpload])

    const onDropRejected = (fileRejections: FileRejection[]) => {
        fileRejections.forEach(({ errors }) => {
            errors.forEach((err) => {
                if (err.code === "file-too-large") {
                    handleFileUploadError && handleFileUploadError(`Uploaded file is too large. Max 2MB allowed.`);
                } else if (err.code === "file-invalid-type") {
                    handleFileUploadError && handleFileUploadError(`Uploaded file has invalid type. Only PDF, JPG, PNG allowed.`);
                } else {
                    handleFileUploadError && handleFileUploadError(err.message);
                }
            });
        });
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDropRejected,
        accept: {
            "application/pdf": [".pdf"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
        },
        maxSize: 2 * 1024 * 1024, // 2MB
        multiple: false,
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
    })

    return (
    <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl text-center 
            ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}
            ${isServiceForm ? 'm-0 p-1' : 'p-2 py-10'}
        `}>
                <input {...getInputProps()} />
                {!isServiceForm ? <div className='flex flex-col justify-center items-center space-y-2'>
                    <div className='w-12 h-12'>
                        <CloudUpload className='text-gray-400 p-1 w-full h-full' />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Drop your file here</h3>
                    <p className="text-gray-400">
                        {accepetedFile}
                    </p>
                    <span>or</span>
                    <Button type="button" variant="ghost" className='hover:bg-gray-100 border'>
                        {t('browse_file')}
                    </Button>
                </div> :
                    <div className='flex flex-row items-center justify-between p-4'>
                        <div className='flex flex-row items-center justify-start gap-3'>
                            <div className='flex flex-col items-start'>
                                <h4 className="text-base font-medium text-gray-900">{fileLabel}</h4>
                                <p className="text-gray-400 text-xs font-normal">
                                    No File selected
                                </p>
                            </div>
                        </div>
                        <Button type="button" variant="ghost" className='hover:bg-gray-100 border border-[#E4E4E7] rounded-lg px-3 py-1.5'>
                            <div className='flex items-center justify-between gap-2'>
                                <CloudDownload className='w-4 h-4' />
                                <span>Upload File</span>
                            </div>

                        </Button>
                    </div>
                }
            </div>

    )
}

export default FileUpload