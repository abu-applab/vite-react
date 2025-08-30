export interface FormField {
    id: string
    label: string
    type: "text" | "select" | "textarea" | "file" | "number"
    required: boolean
    placeholder?: string
    options?: string[]
}

export interface FormSection {
    title: string
    fields: FormField[]
}

export interface FormConfig {
    title: string
    description: string
    sections: FormSection[]
}

export function getFormConfig(formType: string): FormConfig {
    switch (formType) {
        case "landUseLetter":
            return {
                title: "Land Use Letter",
                description: "Request an official letter confirming the permitted use of your land.",
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: ["Plot 1", "Plot 2", "Plot 3"],
                            },
                            {
                                id: "agreement",
                                label: "Agreement",
                                type: "select",
                                required: true,
                                options: ["Agreement A", "Agreement B", "Agreement C"],
                            },
                            {
                                id: "engineeringConsultant",
                                label: "Engineering Consultant Name",
                                type: "text",
                                required: true,
                                placeholder: "Gulf Horizon Trading W.L.L.",
                            },
                            {
                                id: "activityLetter",
                                label: "Activity To Be Mentioned in Letter",
                                type: "text",
                                required: true,
                                placeholder: "Gulf Horizon Trading W.L.L.",
                            },
                            {
                                id: "subjectSummary",
                                label: "Subject/Summary",
                                type: "textarea",
                                required: true,
                                placeholder: "Enter subject or summary",
                            },
                            {
                                id: "comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                            },
                        ],
                    },
                    {
                        title: "Required Documents",
                        fields: [
                            {
                                id: "commercialRegistration",
                                label: "Commercial Registration (CR Attachment)",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "gateLevelAttachment",
                                label: "Gate Level Attachment",
                                type: "file",
                                required: true,
                            },
                        ],
                    },
                ],
            }
        case "rentalRelationship":
            return {
                title: "Rental Relation",
                description: "Request an official letter confirming the permitted use of your land.",
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: ["Plot 1", "Plot 2", "Plot 3"],
                            },
                            {
                                id: "agreement",
                                label: "Agreement",
                                type: "select",
                                required: true,
                                options: ["Agreement A", "Agreement B", "Agreement C"],
                            },
                            {
                                id: "amount",
                                label: "Amount",
                                type: "number",
                                required: true,
                                placeholder: "",
                            },
                            {
                                id: "duration",
                                label: "Duration",
                                type: "number",
                                required: true,
                                placeholder: "",
                            },
                            {
                                id: "comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                            },
                        ],
                    },
                    {
                        title: "Required Documents",
                        fields: [
                            {
                                id: "crOfTheOwner",
                                label: "CR of the owner",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "crOfTheTenant",
                                label: "CR of the Tenant",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "completionCertificate",
                                label: "Completion Certificate ",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "subleaseAgreement",
                                label: "Sublease Agreement ",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "mociForms",
                                label: "MOCI Forms",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "nocCertificate",
                                label: "NOC (No Objection Certificate)",
                                type: "file",
                                required: true,
                            },
                        ],
                    },
                ],
            }

        case "landTransfer":
            return {
                title: "Land Transfer",
                description: "Request to transfer ownership of your land to another party.",
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: ["Plot 1", "Plot 2", "Plot 3"],
                            },
                            {
                                id: "plotSize",
                                label: "Plot Size",
                                type: "text",
                                required: true,
                                placeholder: "1230",
                            },
                            {
                                id: "agreement",
                                label: "Agreement",
                                type: "select",
                                required: true,
                                options: ["Agreement A", "Agreement B", "Agreement C"],
                            },
                            {
                                id: "landTransferType",
                                label: "Land Transfer Type",
                                type: "select",
                                required: true,
                                options: ["Type A", "Type B", "Type C"],
                            },
                            {
                                id: "comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                            },
                        ],
                    },
                    {
                        title: "New Company Information",
                        fields: [
                            {
                                id: "companyCR",
                                label: "Company CR Number",
                                type: "text",
                                required: true,
                                placeholder: "Enter CR number",
                            },
                            {
                                id: "companyNameAR",
                                label: "Company Name (AR)",
                                type: "text",
                                required: true,
                                placeholder: "Enter company name in Arabic",
                            },
                            {
                                id: "poBox",
                                label: "PO Box",
                                type: "text",
                                required: true,
                                placeholder: "Enter PO Box",
                            },
                            {
                                id: "companyNameEN",
                                label: "Company Name (EN)",
                                type: "text",
                                required: true,
                                placeholder: "Enter company name in English",
                            },
                        ],
                    },
                ],
            }

        default:
            throw new Error(`Unknown form type: ${formType}`)
    }
}