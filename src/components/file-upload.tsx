import { CloudDownload, CloudUpload } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'

interface FileUploadProps {
    onFileUpload: (file: File) => void
    isServiceForm?: boolean
}
const FileUpload = ({ onFileUpload, isServiceForm = false }: FileUploadProps) => {
    const [isDragActive, setIsDragActive] = useState(false)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileUpload(acceptedFiles[0])
        }
    }, [onFileUpload])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        maxSize: 2 * 1024 * 1024, // 2MB
        multiple: false,
        onDragEnter: () => setIsDragActive(true),
        onDragLeave: () => setIsDragActive(false),
    })

    return (
        <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl text-center 
            ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'}
            ${isServiceForm ? 'm-0 p-1': 'py-10 mx-10'}
        `}>
            <input {...getInputProps()} />
            {!isServiceForm ? <div className='flex flex-col justify-center items-center space-y-4'>
                <div className='w-12 h-12'>
                    <CloudUpload className='text-gray-400 p-1 w-full h-full' />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Drop your file here</h3>
                <p className="text-gray-400">
                    or, just click to browse some local files (up to 2 MB) in PDF or Word document format!
                </p>
            </div> :
                <div className='flex flex-row items-center justify-between p-4'>
                    <div className='flex flex-row items-center justify-start gap-3'>
                        <div className='w-10 h-10 bg-gray-100 rounded-sm'>
                            <CloudDownload className='w-full h-full p-2' />
                        </div>
                        <div className='flex flex-col items-start'>
                            <h4 className="text-sm font-medium text-gray-900">Drop your file here</h4>
                            <p className="text-gray-400">
                                PDF or Word up tp 10  MB
                            </p>
                        </div>
                    </div>
                    <Button type="button" variant="ghost" className='hover:bg-gray-100 border'>
                        Browse File
                    </Button>
                </div>
            }
        </div>
    )
}

export default FileUpload