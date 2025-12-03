import { Download, Eye, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useTranslation } from "react-i18next";
import pdfLogo from "../../assets/images/pdf-logo.svg";
import pngLogo from '../../assets/images/png-logo.svg';

interface Document {
  documentBody: string,
  mimeType: string,
}

interface AttachmentPopupProps {
  documents?: Document[]
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

const base64ToBlobUrl = (base64: string, mimeType: string) => {
  try {
    // Remove data:... prefix if present
    let cleanedBase64 = base64.replace(/^data:.*;base64,/, '');

    // Remove new lines, spaces
    cleanedBase64 = cleanedBase64.replace(/[\r\n\s]+/g, '');

    // Convert URL-safe base64 to standard base64 if needed
    cleanedBase64 = cleanedBase64.replace(/-/g, '+').replace(/_/g, '/');

    const byteCharacters = atob(cleanedBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Base64 decode failed!", error);
    return "";
  }
};

export const AttachmentPopup = ({ documents = [], open, onOpenChange, title = "Violation Evidence" }: AttachmentPopupProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] p-0 gap-0 overflow-hidden" showCloseButton={false}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white">
          <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
            <DialogTitle className="text-lg font-medium text-foreground text-left">
              {t(title)}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-500 hover:text-black hover:bg-transparent cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
        </div>

        {/* Scrollable Content Area - Reduced scrollable height */}
        <div className="overflow-y-auto max-h-[calc(80vh-65px)]">
          <div className="flex flex-col gap-3 m-6">
            {documents.map((document: any) => (
              <Card
                key={document.fileName}
                className="p-4 flex flex-row items-center justify-between"
              >
                <div className="flex flex-row gap-3 items-center">
                  <div className="h-12 w-12 p-3">
                    <img
                      src={document.mimeType === "application/pdf" ? pdfLogo : pngLogo}
                      alt="pdf logo"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {document?.fileName}
                    </h4>
                    <p className="text-sm text-gray-600">Uploaded Document</p>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <Button
                    className="border-2 h-8 w-8 p-2 hover:bg-transparent cursor-pointer"
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      const url = base64ToBlobUrl(document.documentBody, document.mimeType);
                      window.open(url, "_blank");
                    }}
                  >
                    <Eye className="h-4 w-4 text-[#82764f]" />
                  </Button>
                  <Button
                    asChild
                    className="border-2 h-8 w-8 p-2 hover:bg-transparent cursor-pointer"
                    type="button"
                    variant="ghost"
                  >
                    <a
                      href={base64ToBlobUrl(document.documentBody, document.mimeType)}
                      download={`${document.fileName}.${document.mimeType.split('/')[1]}`}
                    >
                      <Download className="h-4 w-4 text-[#82764f]" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};