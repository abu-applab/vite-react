import { useState } from "react"
import FileUpload from "../file-upload"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Check, Loader, Repeat, Trash2 } from "lucide-react"
import pdfLogo from "../../assets/images/pdf-logo.svg"
import warning from "../../assets/images/warning.svg"
import { Slider } from "../ui/slider"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

interface UploadCrDocumentProps {
  goToNextStep: () => void
  isAddNewCompany?: boolean
}

const UploadCrDocument = ({ goToNextStep, isAddNewCompany = false }: UploadCrDocumentProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [status, setStatus] = useState('completed')
  const { t } = useTranslation();
  console.log('setStatus: ', setStatus);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
  }

  // const getFileType = (fileName: string) => {
  //   const extension = fileName.split(".").pop()?.toLowerCase()
  //   return extension === "pdf" ? "PDF" : "DOC"
  // }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="flex-1 relative">
      <div className="mt-10 ml-10 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{isAddNewCompany ? t('upload_crd_existing_user') : t('upload_crd')}</h2>
        <p className="text-gray-600">{isAddNewCompany ? t('upload_crd_existing_user_desc') : t('upload_crd_desc')}</p>
      </div>
      <div>
        {
          !uploadedFile ?
            <div className="mx-10">
              <FileUpload onFileUpload={(uploaded) => {
                if (uploaded instanceof File) {
                  handleFileUpload(uploaded);
                }
              }} accepetedFile="Upload a clear PDF, JPG, or PNG (max 2 MB). Include English and Arabic if available. Ensure sharp, complete text in color or grayscale, without blur and glare." />
            </div>
            :
            <Card className="p-3 flex flex-row items-center justify-between mx-10">
              <div className="flex flex-row gap-3 items-center justify-start w-full">
                <div className="h-12 w-12 p-3">
                  <img className="" src={pdfLogo} alt="pdf logo" />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <h4 className="font-medium text-gray-900">CR Document</h4>
                  {
                    status === 'uploading' &&
                    <>
                      <Slider
                        value={[50]}
                        max={100}
                        step={1}
                        disabled
                        className={`w-full [&_[role=slider]]:opacity-0`}
                      />
                      <p className="text-sm text-zinc-500 flex flex-row items-center gap-1">
                        <Loader className="w-3 h-3" />
                        <span>Uploading</span>
                        <span>•</span>
                        <span>800 KB of 2 MB</span>

                      </p>
                    </>
                  }
                  {status === 'completed' && <p className="text-sm text-gray-600 flex flex-row items-center gap-1">
                    <div className=" bg-emerald-500 w-3 h-3 rounded-2xl flex items-center justify-center">
                      <Check className="text-white" size={8} strokeWidth={2} />
                    </div>
                    <span>Completed</span>
                    <span>•</span>
                    <span>{formatFileSize(uploadedFile.size)}</span>

                  </p>}
                  {status === 'failed' && <p className="text-sm text-gray-600 flex flex-row items-center gap-1">
                    <img src={warning} alt="completed" className="w-3 h-3" />
                    <span>Failed</span>
                    <span>•</span>
                    <button onClick={() => { }} className="underline underline-offset-2 text-maroon-100">
                      Try again
                    </button>
                  </p>}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                {status === 'completed' && <Button className="border-2 h-8 w-8 p-2" type="button" variant="ghost" onClick={() => { }}>
                  <Repeat className="h-4 w-4 text-[#82764f]" />
                </Button>}
                <Button className="border-2 h-8 w-8 p-2" type="button" variant="ghost" onClick={() => setUploadedFile(null)}>
                  <Trash2 className="h-4 w-4 text-[#82764f]" />
                </Button>
              </div>
            </Card>
        }
      </div>
      {uploadedFile &&
        <div className={cn({ 'mt-[38px] mx-10 text-right': isAddNewCompany })}>
          <Button type="button" className={cn("bg-maroon-100 hover:bg-[#60091A]", { 'absolute bottom-12 right-10': !isAddNewCompany })} onClick={() => goToNextStep()}>{t('next')}</Button>
        </div>
      }
    </div>
  )
}

export default UploadCrDocument