import { Repeat, Trash2, UserRound } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import pdfLogo from "../../assets/images/pdf-logo.svg"
import AlJazeeraLogo from "../../assets/images/al-jazeera-logo.png"

const owners = [{
        title: "Owner Documents",
        documentDetails: [
            { name: "Abdul Rahman", type: "Individual", documents: [{ title: "Attachment 1", size: "4 MB" }, { title: "Attachment 2", size: "4 MB" },] },
            { name: "Salman Hameed", type: "Individual", documents: [{ title: "Attachment 1", size: "4 MB" }, { title: "Attachment 2", size: "4 MB" },], },
            { name: "Al Jazeera", type: "Company", log: AlJazeeraLogo, documents: [{ title: "Attachment 1", size: "4 MB" },], },
        ]
    },
    {
        title: "Signatories Documents",
        documentDetails: [
            { name: "Mohamad Rafi", type: "Individual", documents: [{ title: "Attachment 1", size: "4 MB" }, { title: "Attachment 2", size: "4 MB" },] },
            { name: "Faid Ibrahim", type: "Individual", documents: [{ title: "Attachment 1", size: "4 MB" }, { title: "Attachment 2", size: "4 MB" },], }
        ]
    },
    {
        title: "Additional Documents",
        documentDetails: [
            { name: "", type: "", documents: [{ title: "Article of Assasination", size: "4 MB" }, { title: "Establishment card", size: "4 MB" },] }
        ]
    }];

export default function OwnerDocuments() {
    return (
        <div className="mt-4">
            <div className="">
                {owners.map(({ documentDetails, title }, idx) => (
                    <>
                        <h3 className="text-lg font-medium my-3">{title}</h3>
                        <Card key={idx} className="p-6 mb-8">
                            <div className="space-y-5">
                                {documentDetails.map(({ name, type, documents }, i) => (
                                    <div className={`space-y-4 pb-6 ${i !== documentDetails.length - 1 ? "border-b" : "border-none"}`}>
                                        <div className="flex items-center gap-5 mb-7">
                                            {type === "Individual" ?
                                                <div className="border p-3 rounded-lg">
                                                    <UserRound className="h-6 w-6 text-gray-900" />
                                                </div> :
                                                <img className="" src={AlJazeeraLogo} alt="company logo" />
                                            }
                                            <div>
                                                <h4 className="text-md font-semibold">{name}</h4>
                                                <p className="text-sm text-muted-foreground">{type}</p>
                                            </div>
                                        </div>
                                        {documents.map(doc => <div
                                            key={i}
                                            className="flex items-center justify-between border border-gray-200 rounded-md p-3 shadow-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 border rounded-sm bg-zinc-100">
                                                    <img className="" src={pdfLogo} alt="pdf logo" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{doc.title}</p>
                                                    <p className="text-xs text-muted-foreground">{doc.size}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 text-[#83764F]">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    aria-label="Refresh document"
                                                    className="p-1"
                                                >
                                                    <Repeat className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    aria-label="Delete document"
                                                    className="p-1"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </>
                ))}
            </div>
        </div>
    );
}
