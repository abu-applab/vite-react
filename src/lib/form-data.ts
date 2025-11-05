export interface FormField {
    id: string;
    label: string;
    type: "text" | "select" | "textarea" | "file" | "number" | "multiselect";
    required: boolean;
    placeholder?: string;
    options?: string[] | {id: string, name: string, agreementId?: string, disabled?: boolean}[];
    disabled?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    dependsOn?: string
    showIfSelected?: string
    showStage?: 1 | 2 

}

export interface FormSection {
    key?: string
    title: string
    subTitle?: string
    fields?: FormField[]
    points?: string[]
    isAddNewProduct?: boolean
}

export interface FormConfig {
    key?: string,
    title: string
    description: string
    needsPlots?: boolean
    needsSignatory?: boolean
    sections: FormSection[]
}

export function getServiceFormConfig(formType: string): FormConfig {
    switch (formType) {
        case "rentalRelationship":
            return {
                title: "Rental Relation",
                description: "Request an official letter confirming the permitted use of your land.",
                needsPlots: true,
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "Company",
                                label: "Company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "Plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "Agreement",
                            },
                            {
                                id: "Agreement",
                                label: "Agreement",
                                type: "text",
                                required: true,
                                dependsOn: "Plot",
                                disabled: true
                            },
                            {
                                id: "Duration",
                                label: "Duration",
                                type: "number",
                                required: true,
                                placeholder: "Enter duration (in months)",
                                max: 240,
                                min: 1,
                            },
                            {
                                id: "Amount",
                                label: "Amount",
                                type: "number",
                                required: true,
                                placeholder: "Enter Amount",
                            },
                            {
                                id: "Comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                    },
                    {
                        title: "Required Documents",
                        subTitle: "(Note: Allowed file types: PDF, JPG, PNG. Max 2MB per file)",
                        fields: [
                            {
                                id: "CrOfOwner",
                                label: "CR of the owner",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "CrOfTenant",
                                label: "CR of the Tenant",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "CompletionCertificate",
                                label: "Completion Certificate ",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "SubleaseAgreement",
                                label: "Sublease Agreement ",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "RentalRelationshipForm",
                                label: "Rental Relationship Form",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "LeaseAuthorizationForm",
                                label: "MOCI Forms",
                                type: "file",
                                required: true,
                            },
                            // {
                            //     id: "nocCertificate",
                            //     label: "NOC (No Objection Certificate)",
                            //     type: "file",
                            //     required: true,
                            // },
                        ],
                    },
                ],
            }
        case "certifiedCopyOfAgreement":
            return {
                title: "Certified Copy of Agreement Form",
                description: "Request to transfer ownership of your land to another party.",
                needsPlots: true,
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "company",
                                label: "Company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "Agreement",
                                type: "text",
                                required: true,
                                dependsOn: "plot",
                                disabled: true
                            },
                            {
                                id: "comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                    },
                ],
            }
        case "kahramaa":
            return {
                title: "Kahramaa",
                description: "Request to transfer ownership of your land to another party.",
                needsPlots: true,
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "company",
                                label: "Company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "Agreement",
                                type: "text",
                                required: true,
                                dependsOn: "plot",
                                disabled: true
                            },
                            {
                                id: "comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                    },
                ],
            }
        case "complaint":
            return {
                title: "Complaint",
                description: "Request to transfer ownership of your land to another party.",
                needsPlots: true,
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "Company",
                                label: "Company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "Plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                            },
                            {
                                id: "Description",
                                label: "Description",
                                type: "text",
                                required: true,
                                placeholder: "Enter description",
                                min: 3,
                                max: 100
                            },
                            {
                                id: "Comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                    },
                    {
                        title: "Required Documents",
                        subTitle: "(Note: Allowed file types: PDF, JPG, PNG. Max 2MB per file)",
                        fields: [
                            {
                                id: "ComplaintLetter",
                                label: "Letter with full description of complaint",
                                type: "file",
                                required: true,
                            },
                        ]
                    }
                ],
            }
        case "demarcationLetter":
            return {
                title: "Demarcation Letter",
                description: "Request to transfer ownership of your land to another party.",
                needsPlots: true,
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "company",
                                label: "Company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "Agreement",
                                type: "text",
                                required: true,
                                dependsOn: "plot",
                                disabled: true
                            },
                            {
                                id: "buildingPermitApplicationNumber",
                                label: "Building Permit Application Number",
                                type: "number",
                                required: true,
                                placeholder: "Enter building permit application number",
                                max: 10
                            },
                            {
                                id: "comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                    },
                ],
            }
        case "updateCompanyInformation":
            return {
                title: "Update Company Information",
                description: "Request to transfer ownership of your land to another party.",
                needsPlots: true,
                needsSignatory: true,
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "Company",
                                label: "Company",
                                type: "select",
                                required: true,
                                options: [],
                                showStage: 1 
                            },
                            {
                                id: "Plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "Agreement",
                                showStage: 1 
                            },
                            {
                                id: "Agreement",
                                label: "Agreement",
                                type: "text",
                                required: true,
                                dependsOn: "Plot",
                                disabled: true,
                                showStage: 1 
                            },
                            {
                                id: "RequiredUpdate",
                                label: "Required Update",
                                type: "multiselect",
                                required: true,
                                options: [
                                    { id: "CompanyName", name: "Company Name" },
                                    { id: "Signatory", name: "Signatory" },
                                  ],
                                showStage: 2   
                            }, 
                            {
                                id: "NewCompanyNameEn",
                                label: "New Company Name (EN)",
                                type: "text",
                                required: true,
                                placeholder: "Enter new company name in English",
                                min: 3,
                                max: 80,
                                showIfSelected: 'CompanyName',
                                showStage: 2
                            },
                            {
                                id: "NewCompanyNameAr",
                                label: "New Company Name (AR)",
                                type: "text",
                                required: true,
                                placeholder: "Enter new company name in Arabic",
                                min: 3,
                                max: 80,
                                showIfSelected: 'CompanyName',
                                showStage: 2
                            },
                            {
                                id: "NewSignatory",
                                label: "New Signatory",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching signatory...", disabled: true }],
                                showIfSelected: 'Signatory',
                                showStage: 2
                            },
                            {
                                id: "Comment",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200,
                                showStage: 2
                            },
                        ],
                    },
                    {
                        title: "Required Documents",
                        subTitle: "(Note: Allowed file types: PDF, JPG, PNG. Max 2MB per file)",
                        fields: [
                            {
                                id: "NOCToWhomItMayConcern",
                                label: "NOC (To Whom It May Concern)",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "NewCRCopy",
                                label: "New Commercial Registration (CR) Copy",
                                type: "file",
                                required: true,
                            },
                        ]
                    }
                ],
            }
        case "updateContactDetails":
            return {
                title: "Update Contact Details",
                description: "Request to transfer ownership of your land to another party.",
                needsPlots: true,
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "Company",
                                label: "Company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "Plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "Agreement",
                            },
                            {
                                id: "Agreement",
                                label: "Agreement",
                                type: "text",
                                required: true,
                                dependsOn: "Plot",
                                disabled: true
                            },
                            {
                                id: "RequiredUpdateSet",
                                label: "Required Update",
                                type: "multiselect",
                                required: true,
                                options: [
                                  { id: "Email", name: "New Email" },
                                  { id: "Phone", name: "Phone" },
                                  { id: "POBox", name: "New PO Box" },
                                ],
                            },                              
                            {
                                id: "Email",
                                label: "New Email",
                                type: "text",
                                required: true,
                                placeholder: "Enter new email",
                                showIfSelected: "Email",
                            },
                            {
                                id: "Phone",
                                label: "New Phone",
                                type: "number",
                                required: true,
                                placeholder: "Enter new phone number",
                                showIfSelected: "Phone",
                            },
                            {
                                id: "POBox",
                                label: "New PO Box",
                                type: "number",
                                required: true,
                                placeholder: "Enter new PO box number",
                                showIfSelected: "POBox",
                            },
                            {
                                id: "Comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                    },
                    {
                        title: "Required Documents",
                        subTitle: "(Note: Allowed file types: PDF, JPG, PNG. Max 2MB per file)",
                        fields: [
                            {
                                id: "LetterAttachment",
                                label: "Letter Attachment",
                                type: "file",
                                required: true,
                            },
                        ]
                    }
                ],
        }
        case "technicalQueries":
            return {
                title: "Technical Queries",
                description: "Request to transfer ownership of your land to another party.",
                needsPlots: true,
                sections: [
                    {
                        title: "Request Details",
                        fields: [
                            {
                                id: "company",
                                label: "Company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "Plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "Agreement",
                                type: "text",
                                required: true,
                                dependsOn: "plot",
                                disabled: true
                            },
                            {
                                id: "subject",
                                label: "Subject",
                                type: "text",
                                required: true,
                                placeholder: "Enter subjects",
                            },
                            {
                                id: "comments",
                                label: "Comments (Optional)",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                        },
                    ],
            }    
        default:
            throw new Error(`Unknown form type: ${formType}`)
    }
}
export function getApplicationFormConfig(formType: string): FormConfig[] {
    switch (formType) {
        case "logisticsPark":
            return [
                {
                    title: "Logistics Apllication",
                    description: "Application for setting up, expanding, or modifying an logistics project.",
                    sections: [
                        {
                            title: "Intended Use & Business Plan",
                            fields: [
                                {
                                    id: "landUSe",
                                    label: "Land Use",
                                    type: "select",
                                    required: true,
                                    options: ["Industry", "Industry 2", "Industry 3"],
                                },
                                {
                                    id: "cluster",
                                    label: "Cluster",
                                    type: "select",
                                    required: true,
                                    options: ["Doha Industry Area", "Industry 2", "Industry 3"],
                                },
                                {
                                    id: "isicCode",
                                    label: "ISIC Code",
                                    type: "text",
                                    required: true,
                                    options: ["Agreement A", "Agreement B", "Agreement C"],
                                },
                                {
                                    id: "landTransferType",
                                    label: "Land Transfer Type",
                                    type: "select",
                                    required: true,
                                    placeholder: "",
                                },
                                {
                                    id: "Description of Proposed Business Activities",
                                    label: "Comments (Optional)",
                                    type: "textarea",
                                    required: true,
                                    placeholder: "",
                                },
                            ],
                        },
                        {
                            title: "Requested Area",
                            fields: [
                                {
                                    id: "loacation",
                                    label: "Location",
                                    type: "text",
                                    required: true,
                                    placeholder: "",
                                },
                                {
                                    id: "category",
                                    label: "Category",
                                    type: "text",
                                    required: true,
                                    placeholder: "Enter company name in Arabic",
                                },
                                {
                                    id: "totalRequestedPlotSize",
                                    label: "Total Requested Plot Size",
                                    type: "text",
                                    required: true,
                                    placeholder: "Enter PO Box",
                                },
                            ],
                        },
                        {
                            title: "Employment",
                            fields: [
                                {
                                    id: "currentNumberOfEmployees",
                                    label: "Current Number of Employees",
                                    type: "text",
                                    required: true,
                                    placeholder: "",
                                },
                                {
                                    id: "additionalEmploymentProjected",
                                    label: "Additional Employment Projected",
                                    type: "text",
                                    required: true,
                                    placeholder: "",
                                },
                                {
                                    id: "totalEmployment",
                                    label: "Total Employment",
                                    type: "text",
                                    required: true,
                                    placeholder: "",
                                },
                            ],
                        },
                        {
                            title: "Project Financial Information",
                            fields: [
                                {
                                    id: "constructionCost",
                                    label: "Construction Cost",
                                    type: "text",
                                    required: true,
                                    placeholder: "",
                                },
                                {
                                    id: "workingCapital",
                                    label: "Working Capital",
                                    type: "text",
                                    required: true,
                                    placeholder: "",
                                },
                                {
                                    id: "totalInvestment",
                                    label: "Total Investment",
                                    type: "text",
                                    required: true,
                                    placeholder: "",
                                },
                            ],
                        },
                    ],
                }
            ]
        case "industrial":
            return [
                {
                    title: "Industrial Application",
                    description: "Application to apply for an industrial project.",
                    key: "instruction",
                    sections: [
                        {
                            title: "Instruction for completing the form",
                            points: [
                                "Applicants are requested to read this form carefully and the documents for reading, to fill in the required information and to attach copies of all the required documents",
                                "Manateq reserves the right to request more information from the applicant. There are no guarantees that this application will be approved",
                                "Applicants shall nominate a contact person with whom all communications with Manateq will be made. The contact person nominated should ideally be the Project Manager or such as deemed as appropriate by the applicant to be able to answer any queries regarding this application.",
                                "Applicants must provide a valid email and mobile number for all communications and SMS notifications.",
                            ],
                        },
                        {
                            title: "Important Information and Reading Materials",
                            points: ["Development Guidelines and Design Criteria", "Lease Agreement"],
                        },
                        {
                            title: "Required Documents (Attach the following documents with the application form)",
                            key: "requiredDocuments",
                            points: [
                                "A Valid Commercial Registration",
                                "Industrial License / Initial Approval from Ministry of Commerce and Industry",
                                "Business Plan and Feasibility Study",
                                "Conceptual Site Layout",
                                "Material safety data sheets",
                                "Owners' IDs",
                                "Financial Capacity Proof to Execute the Project",
                                "Credit Bureau Consent Form",
                                "Company Profile (if applicable)",
                                "Three Years of Audited Financial Statements (if applicable)",
                            ],
                        },
                    ],
                },
                {
                    title: "Industrial Application",
                    description: "Application to apply for an industrial project.",
                    sections: [
                        {
                            title: "Technology",
                            fields: [
                                {
                                    id: "technologyCountryOfOrigin",
                                    label: "Technology Country of Origin",
                                    type: "text",
                                    required: true,
                                    placeholder: ""
                                },
                                {
                                    id: "equipmentCountryOfOrigin",
                                    label: "Equipment Country of Origin",
                                    type: "text",
                                    required: true,
                                    placeholder: ""
                                },
                                {
                                    id: "equipmentYearOfProduction",
                                    label: "Equipment Year of Production",
                                    type: "text",
                                    required: true,
                                    placeholder: ""
                                }
                            ]
                        },
                        {
                            title: "Intended Use & Business Plan",
                            fields: [
                                {
                                    id: "landUse",
                                    label: "Land Use",
                                    type: "select",
                                    required: true,
                                    options: ["Industry", "Industry 2", "Industry 3"]
                                },
                                {
                                    id: "location",
                                    label: "Location",
                                    type: "select",
                                    required: true,
                                    options: ["Doha Industrial Area", "Plot 2", "Plot 3"]
                                },
                                {
                                    id: "isicSection",
                                    label: "ISIC Section",
                                    type: "select",
                                    required: true,
                                    options: ["C - Manufacturing", "Plot 2", "Plot 3"]
                                },
                                {
                                    id: "isicCodeDescription",
                                    label: "ISIC Code & Description",
                                    type: "select",
                                    required: true,
                                    options: ["C.2011 – Manufacture of basic chemicals", "Plot 2", "Plot 3"]
                                },
                                {
                                    id: "descriptionOfProposedBusinessActivities",
                                    label: "Description of Proposed Business Activities",
                                    type: "textarea",
                                    required: true,
                                    placeholder: ""
                                }
                            ]
                        },
                        {
                            title: "Estimated Requested Area (SQM)",
                            fields: [
                                {
                                    id: "totalRequestedPlotArea",
                                    label: "Total Requested Plot Area (SQM)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "openArea",
                                    label: "Open Area (SQM)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "administration",
                                    label: "Administration (SQM)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "laboratory",
                                    label: "Laboratory (SQM)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "rawMaterialStorage",
                                    label: "Raw Material Storage (SQM)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "productionArea",
                                    label: "Production Area (SQM)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "finishedProductStorage",
                                    label: "Finished Product Storage (SQM)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "maintenanceWorkshops",
                                    label: "Maintenance/Workshops (SQM)",
                                    type: "number",
                                    required: true
                                }
                            ]
                        },
                        {
                            title: "Utilities",
                            fields: [
                                {
                                    id: "portableWater",
                                    label: "Portable Water (m³/day)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "sewer",
                                    label: "Sewer (m³/day)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "naturalGas",
                                    label: "Natural Gas (m³/year)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "seaCoolingWater",
                                    label: "Sea Cooling Water (m³/H)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "electricity",
                                    label: "Electricity (KVA)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "fuelProducts",
                                    label: "Fuel Products (mt/year)",
                                    type: "number",
                                    required: true
                                }
                            ]
                        },
                        {
                            title: "Product Information",
                            subTitle: " Add New Product",
                            key: "ProductsJson",
                        }
                    ]
                },
                {
                    title: "Industrial Application",
                    description: "Application to apply for an industrial project.",
                    sections: [
                        {
                            title: "Employment",
                            fields: [
                                {
                                    id: "currentNumberOfEmployees",
                                    label: "Current Number of Employees",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "additionalEmploymentProjected",
                                    label: "Additional Employment Projected",
                                    type: "number",
                                    required: true
                                }
                            ]
                        },
                        {
                            title: "Safety",
                            fields: [
                                {
                                    id: "firstAidEquipment",
                                    label: "First Aid Equipment",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "fireFightingSystem",
                                    label: "Fire Fighting System",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "numberOfShifts",
                                    label: "Number of Shifts",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "safetyEquipmentSystem",
                                    label: "Safety Equipment/System",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "workersFacilities",
                                    label: "Workers Facilities",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "emergencyResponsePlan",
                                    label: "Emergency Response Plan",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "gasesEmittedDustsInfo",
                                    label: "Gases Emitted/Dusts Info",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "stackHeight",
                                    label: "Stack Height (m)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "temperature",
                                    label: "Temperature (Celsius)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "rateOfEmission",
                                    label: "Rate of Emission",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "wasteType",
                                    label: "Waste Type",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "industrialWasteWater",
                                    label: "Industrial Waste Water",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "hazardousWaste",
                                    label: "Hazardous/Non-Hazardous",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "domesticWasteWater",
                                    label: "Domestic Waste Water",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "wasteQuantity",
                                    label: "Quantity (m³/year)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "treatmentType",
                                    label: "Treatment Type",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "recyclingUsagePlans",
                                    label: "Recycling & Usage Plans",
                                    type: "text",
                                    required: true
                                },
                                {
                                    id: "noiseLevel",
                                    label: "Level of Noise at Plot Boundary (dB)",
                                    type: "number",
                                    required: true
                                }
                            ]
                        },
                        {
                            title: "Project Financial Information",
                            fields: [
                                {
                                    id: "constructionCost",
                                    label: "Construction Cost (QAR)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "equity",
                                    label: "Equity (QAR)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "costOfPlantAndMachinery",
                                    label: "Cost of Plant & Machinery (QAR)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "debt",
                                    label: "Debt (QAR)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "costOfOtherFixedAssets",
                                    label: "Cost of Other Fixed Assets (QAR)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "workingCapital",
                                    label: "Working Capital (QAR)",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "totalCost",
                                    label: "Total Cost",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "totalFunding",
                                    label: "Total Funding",
                                    type: "number",
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "Industrial Application",
                    description: "Application to apply for an industrial project.",
                    sections: [
                        {
                            title: "Required Documents",
                            fields: [
                                {
                                    id: "validCommercialRegistration",
                                    label: "A Valid Commercial Registration",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "ownersId",
                                    label: "Owners ID",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "businessPlan",
                                    label: "Business Plan/Feasibility Study",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "industrialLicense",
                                    label: "Industrial License/Initial Approved from Ministry of Commerce and Industry",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "conceptualSiteLayout1",
                                    label: "Conceptual Site Layout",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "materialSafetyDataSheets",
                                    label: "Material Safety Date Sheets",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "conceptualSiteLayout2",
                                    label: "Conceptual Site Layout",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "projectedCashFlow",
                                    label: "Projected Cash Flow",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "financialCapacityProof",
                                    label: "Financial Capacity Proof to Execute the Project",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "creditBureauReport",
                                    label: "Credit Bureau Report for Owner/Company",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "companyProfile",
                                    label: "Company Profile (if applicable)",
                                    type: "file",
                                    required: false
                                },

                                {
                                    id: "auditedFinancialStatements",
                                    label: "Three Years of Audited Financial Statements (if applicable)",
                                    type: "file",
                                    required: false
                                },

                            ]
                        },
                    ]
                }
            ]
        case "openYards":
            return [
                {
                    title: "Open Yard Application",
                    description: "Application for setting up, expanding, or modifying an open yard project.",
                    key: "instruction",
                    sections: [
                        {
                            title: "Instruction for completing the form",
                            points: [
                                "Applicants are requested to read this form carefully and the documents for reading, to fill in the required information and to attach copies of all the required documents",
                                "Manateq reserves the right to request more information from the applicant. There are no guarantees that this application will be approved",
                                "Applicants shall nominate a contact person with whom all communications with Manateq will be made. The contact person nominated should ideally be the Project Manager or such as deemed as appropriate by the applicant to be able to answer any queries regarding this application.",
                                "Applicants must provide a valid email and mobile number for all communications and SMS notifications.",
                            ],
                        },
                        {
                            title: "Important Information and Reading Materials",
                            points: [
                                "Open Yards Lease Agreement (Download template)", 
                                "Important information about the Open Yards (Download file)"
                            ],
                        },
                        {
                            title: "Required Documents (Attach the following documents with the application form)",
                            key: "requiredDocuments",
                            points: [
                                "A Valid Commercial Registration",
                                "A Valid Commercial License",
                                "The Establishment Card",
                                "Owners' IDs",
                                "Business Plan",
                                "Three Years of Audited  Financial Statements (if applicable)",
                                "Traffic Listing from MOI (if applicable)",
                                "Photos of Materials & Equipment",
                            ],
                        },
                    ],
                },
                {
                    title: "Open Yard Application",
                    description: "Application for setting up, expanding, or modifying an open yard project.",
                    sections: [
                        {
                            title: "Intended Use & Business Plan",
                            fields: [
                                {
                                    id: "LandUse",
                                    label: "Land Use",
                                    type: "select",
                                    required: true,
                                    options: [
                                        {id: 'LogisticsWarehousing', name: 'Logistics Warehousing'},
                                        {id: 'WorkshopsAssembly', name: 'Workshops Assembly'},
                                        {id: 'OpenYardsStorage', name: 'Open Yards Storage'},
                                        {id: 'Industry', name: 'Industry'},
                                        {id: 'NonIndustry', name: 'Non Industry'},
                                    ],
                                },
                                {
                                    id: "Cluster",
                                    label: "Cluster",
                                    type: "select",
                                    required: true,
                                    options: [],
                                },
                                {
                                    id: "ProposedBusinessActivity",
                                    label: "Description of Proposed Business Activities",
                                    type: "textarea",
                                    required: false,
                                    placeholder: "",
                                    min: 3,
                                    max: 500,
                                }
                            ]
                        },
                        {
                            title: "Facility Requirements",
                            fields: [
                                {
                                    id: "TotalRequestedPlotSize",
                                    label: "Total Requested Plot Size (m2)",
                                    type: "number",
                                    required: true,
                                    placeholder: '',
                                    max: 15
                                },
                                {
                                    id: "Location",
                                    label: "Preferred Location",
                                    type: "select",
                                    required: true,
                                    options: []
                                },
                            ]
                        }    
                    ]
                },
                {
                    title: "Open Yard Application",
                    description: "Application for setting up, expanding, or modifying an open yard project.",
                    sections: [
                        {
                            title: "Required Documents",
                            fields: [
                                {
                                    id: "ValidCommercialRegistration",
                                    label: "A Valid Commercial Registration",
                                    type: "file",
                                    required: true
                                },
                                {
                                    id: "ValidCommercialLicense",
                                    label: "A Valid Commercial License ",
                                    type: "file",
                                    required: true
                                },
                                {
                                    id: "OwnersIDs",
                                    label: "Owners ID",
                                    type: "file",
                                    required: true
                                },
                                {
                                    id: "EstablishmentCard",
                                    label: "The Establishment Card",
                                    type: "file",
                                    required: true
                                },
                                {
                                    id: "BusinessPlan",
                                    label: "Business Plan",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "ThreeYearsOfAuditedFinancialStatements",
                                    label: "Three Years of Audited Financial Statements (if applicable)",
                                    type: "file",
                                    required: false
                                },
                                {
                                    id: "TrafficListingFromMOI",
                                    label: "Traffic Listing from MOI (if applicable)",
                                    type: "file",
                                    required: false
                                },
                                {
                                    id: "PhotosOfMaterialsAndEquipment",
                                    label: "Photos of Materials & Equipment.",
                                    type: "file",
                                    required: true
                                },
                            ]
                        },
                    ]
                }
            ]

        default:
            throw new Error(`Unknown form type: ${formType}`)
    }
}


export function getCommonFormConfig(formType: string): FormConfig {
    switch (formType) {
        case "companyProfile":
            return {
                title: "",
                description: "",
                sections: [
                    {
                        title: "",
                        fields: [
                            {
                                id: "arabicName",
                                label: "Arabic Company Name",
                                type: "text",
                                required: true,
                                placeholder: "",
                            },
                            {
                                id: "englishName",
                                label: "English Company Name",
                                type: "text",
                                required: true,
                                placeholder: "",
                            },
                            {
                                id: "address",
                                label: "Address",
                                type: "text",
                                required: true,
                                placeholder: "",
                            },
                            {
                                id: "box",
                                label: "PO Box",
                                type: "text",
                                required: true,
                                placeholder: "",
                            },
                            {
                                id: "telephone",
                                label: "Telephone",
                                type: "text",
                                required: true,
                                placeholder: "30321867",
                            },
                            {
                                id: "crno",
                                label: "CR No.",
                                type: "text",
                                placeholder: "1623",
                                disabled: true,
                                required: true,
                            },
                            {
                                id: "category",
                                label: "Company Category",
                                type: "select",
                                options: [
                                    "SME Start-up & Micro Enterprise (0-9 employees)",
                                    "SME Small Enterprise (10-49 employees)",
                                    "SME Medium Enterprise (50-249 employees)",
                                    "Others",
                                ],
                                required: true,
                            },
                        ],
                    }
                ],
            }
        case "profileForm":
            return {
                title: "",
                description: "",
                sections: [
                    {
                        title: "",
                        fields: [
                            {
                                id: "firstName",
                                label: "First Name",
                                type: "text",
                                required: true,
                                placeholder: "Enter first name",
                            },
                            {
                                id: "lastName",
                                label: "Last Name",
                                type: "text",
                                required: true,
                                placeholder: "Enter last name",
                            },
                            {
                                id: "email",
                                label: "Email",
                                type: "text",
                                required: true,
                                placeholder: "example@domain.com",
                                disabled: true
                            },
                            {
                                id: "phone",
                                label: "Mobile Phone",
                                type: "text",
                                required: true,
                                placeholder: "+973 12345678",
                            },
                            {
                                id: "landline",
                                label: "Landline Number",
                                type: "text",
                                required: false,
                                placeholder: "44443333",
                            },
                        ],
                    },
                ],
            }
        // other cases (landUseLetter, rentalRelationship, etc.) remain as is
        default:
            throw new Error(`Unknown form type: ${formType}`)
    }
}
