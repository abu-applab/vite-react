import { CloudDownload, CloudUpload } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'

interface FileUploadProps {
    onFileUpload: (file: File) => void
    isServiceForm?: boolean
    accepetedFile: string
}
const FileUpload = ({ onFileUpload, isServiceForm = false, accepetedFile }: FileUploadProps) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const {t} = useTranslation();

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
                        <div className='w-10 h-10 bg-gray-100 rounded-sm'>
                            <CloudDownload className='w-full h-full p-2' />
                        </div>
                        <div className='flex flex-col items-start'>
                            <h4 className="text-base font-medium text-gray-900">{t('drop_file')}</h4>
                            <p className="text-gray-400 text-xs font-normal">
                               {accepetedFile}
                            </p>
                        </div>
                    </div>
                    <Button type="button" variant="ghost" className='hover:bg-gray-100 border'>
                        {t('browse_file')}
                    </Button>
                </div>
            }
        </div>
    )
}

export default FileUpload