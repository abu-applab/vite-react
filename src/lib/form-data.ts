export interface FormField {
    id: string;
    label: string;
    type: "text" | "select" | "textarea" | "file" | "number" | "multiselect" | "datepicker";
    required: boolean;
    placeholder?: string;
    options?: string[] | { id: string, name: string, agreementId?: string, disabled?: boolean }[];
    disabled?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    dependsOn?: string
    showIfSelected?: string
    showStage?: 1 | 2
    minYear?: number,
    maxYear?: number,
    subTitle?: string

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
                title: "rental_relation",
                description: "rental_relationship_desc",
                needsPlots: true,
                sections: [
                    {
                        title: "request_details",
                        fields: [
                            {
                                id: "company",
                                label: "company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "agreement",
                                type: "select",
                                required: true,
                                dependsOn: "Plot",
                                options: [],
                                disabled: true
                            },
                            {
                                id: "duration",
                                label: "duration",
                                type: "number",
                                required: true,
                                placeholder: "Enter duration (in months)",
                                max: 240,
                                min: 1,
                            },
                            {
                                id: "amount",
                                label: "amount",
                                type: "number",
                                required: true,
                                placeholder: "Enter Amount",
                            },
                            {
                                id: "comments",
                                label: "comments",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                    },
                    {
                        title: "required_documents",
                        subTitle: "(Note: Allowed file types: PDF, JPG, PNG. Max 2MB per file)",
                        fields: [
                            {
                                id: "CrOfOwner",
                                label: "cr_of_the_owner",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "CrOfTenant",
                                label: "cr_of_the_tenant",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "CompletionCertificate",
                                label: "completion_certificate",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "SubleaseAgreement",
                                label: "sublease_agreement",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "RentalRelationshipForm",
                                label: "rental_relationship_form",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "LeaseAuthorizationForm",
                                label: "lease_authorization_form",
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
                title: "certified_copy_of_agreement_form",
                description: "certifiedCopyOfAgreement_desc",
                needsPlots: true,
                sections: [
                    {
                        title: "request_details",
                        fields: [
                            {
                                id: "company",
                                label: "company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "agreement",
                                type: "select",
                                required: true,
                                dependsOn: "Plot",
                                options: [],
                                disabled: true
                            },
                            {
                                id: "comments",
                                label: "comments",
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
                title: "kahramaa",
                description: "kahramaa_desc",
                needsPlots: true,
                sections: [
                    {
                        title: "request_details",
                        fields: [
                            {
                                id: "company",
                                label: "company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "agreement",
                                type: "select",
                                required: true,
                                dependsOn: "Plot",
                                options: [],
                                disabled: true
                            },
                            {
                                id: "comments",
                                label: "comments",
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
                title: "complaint",
                description: "complaint_desc",
                needsPlots: true,
                sections: [
                    {
                        title: "request_details",
                        fields: [
                            {
                                id: "company",
                                label: "company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                            },
                            {
                                id: "description",
                                label: "description",
                                type: "text",
                                required: true,
                                placeholder: "Enter description",
                                min: 3,
                                max: 100
                            },
                            {
                                id: "comments",
                                label: "comments",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                    },
                    {
                        title: "required_documents",
                        subTitle: "(Note: Allowed file types: PDF, JPG, PNG. Max 2MB per file)",
                        fields: [
                            {
                                id: "ComplaintLetter",
                                label: "letter_with_full_description_of_complaint",
                                type: "file",
                                required: true,
                            },
                        ]
                    }
                ],
            }
        case "demarcationLetter":
            return {
                title: "demarcation_letter",
                description: "demarcationLetter_desc",
                needsPlots: true,
                sections: [
                    {
                        title: "request_details",
                        fields: [
                            {
                                id: "company",
                                label: "company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "agreement",
                                type: "select",
                                required: true,
                                dependsOn: "Plot",
                                options: [],
                                disabled: true
                            },
                            {
                                id: "buildingPermitApplicationNumber",
                                label: "building_permit_application_number",
                                type: "number",
                                required: true,
                                placeholder: "Enter building permit application number",
                                max: 10
                            },
                            {
                                id: "comments",
                                label: "comments",
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
                title: "update_company_information",
                description: "updateCompanyInformation_desc",
                needsPlots: true,
                needsSignatory: true,
                sections: [
                    {
                        title: "request_details",
                        fields: [
                            {
                                id: "company",
                                label: "company",
                                type: "select",
                                required: true,
                                options: [],
                                showStage: 1
                            },
                            {
                                id: "plot",
                                label: "plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                                showStage: 1
                            },
                            {
                                id: "agreement",
                                label: "agreement",
                                type: "select",
                                required: true,
                                dependsOn: "Plot",
                                options: [],
                                disabled: true
                            },
                            {
                                id: "requiredUpdate",
                                label: "required_update",
                                type: "multiselect",
                                required: true,
                                options: [
                                    { id: "companyName", name: "company_name" },
                                    { id: "signatory", name: "signatory" },
                                ],
                                showStage: 2
                            },
                            {
                                id: "newCompanyNameEn",
                                label: "new_company_name_en",
                                type: "text",
                                required: true,
                                placeholder: "Enter new company name in English",
                                min: 3,
                                max: 80,
                                showIfSelected: 'companyName',
                                showStage: 2
                            },
                            {
                                id: "newCompanyNameAr",
                                label: "new_company_name_ar",
                                type: "text",
                                required: true,
                                placeholder: "Enter new company name in Arabic",
                                min: 3,
                                max: 80,
                                showIfSelected: 'companyName',
                                showStage: 2
                            },
                            {
                                id: "newSignatory",
                                label: "new_signatory",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching signatory...", disabled: true }],
                                showIfSelected: 'signatory',
                                showStage: 2
                            },
                            {
                                id: "comment",
                                label: "comments",
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
                        title: "required_documents",
                        subTitle: "(Note: Allowed file types: PDF, JPG, PNG. Max 2MB per file)",
                        fields: [
                            {
                                id: "NOCToWhomItMayConcern",
                                label: "noc_to_whom_it_may_concern",
                                type: "file",
                                required: true,
                            },
                            {
                                id: "NewCRCopy",
                                label: "new_ommercial_registration_copy",
                                type: "file",
                                required: true,
                            },
                        ]
                    }
                ],
            }
        case "updateContactDetails":
            return {
                title: "update_contact_details",
                description: "updateContactDetails_desc",
                needsPlots: true,
                sections: [
                    {
                        title: "request_details",
                        fields: [
                            {
                                id: "company",
                                label: "company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "agreement",
                                type: "select",
                                required: true,
                                dependsOn: "Plot",
                                options: [],
                                disabled: true
                            },
                            {
                                id: "requiredUpdateSet",
                                label: "required_update",
                                type: "multiselect",
                                required: true,
                                options: [
                                    { id: "Email", name: "new_email" },
                                    { id: "Phone", name: "new_phone" },
                                    { id: "POBox", name: "new_po_box" },
                                ],
                            },
                            {
                                id: "email",
                                label: "new_email",
                                type: "text",
                                required: true,
                                placeholder: "Enter new email",
                                showIfSelected: "Email",
                                max: 50,
                            },
                            {
                                id: "phone",
                                label: "new_phone",
                                type: "number",
                                required: true,
                                placeholder: "Enter new phone number",
                                showIfSelected: "Phone",
                            },
                            {
                                id: "pOBox",
                                label: "new_po_box",
                                type: "number",
                                required: true,
                                placeholder: "Enter new PO box number",
                                showIfSelected: "POBox",
                            },
                            {
                                id: "comments",
                                label: "comments",
                                type: "textarea",
                                required: false,
                                placeholder: "Enter any additional comments",
                                min: 3,
                                max: 200
                            },
                        ],
                    },
                    {
                        title: "required_documents",
                        subTitle: "(Note: Allowed file types: PDF, JPG, PNG. Max 2MB per file)",
                        fields: [
                            {
                                id: "LetterAttachment",
                                label: "letter_attachment",
                                type: "file",
                                required: true,
                            },
                        ]
                    }
                ],
            }
        case "technicalQueries":
            return {
                title: "technical_queries",
                description: "technicalQueries_desc",
                needsPlots: true,
                sections: [
                    {
                        title: "request_details",
                        fields: [
                            {
                                id: "company",
                                label: "company",
                                type: "select",
                                required: true,
                                options: [],
                            },
                            {
                                id: "plot",
                                label: "plot",
                                type: "select",
                                required: true,
                                options: [{ id: "loading", name: "Fetching plots...", disabled: true }],
                                dependsOn: "agreement",
                            },
                            {
                                id: "agreement",
                                label: "agreement",
                                type: "select",
                                required: true,
                                dependsOn: "Plot",
                                options: [],
                                disabled: true
                            },
                            {
                                id: "subject",
                                label: "subject",
                                type: "text",
                                required: true,
                                placeholder: "Enter subjects",
                            },
                            {
                                id: "comments",
                                label: "comments",
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
                                    id: "description_of_proposed_business_activities",
                                    label: "Comments (Optional)",
                                    type: "textarea",
                                    required: true,
                                    placeholder: "",
                                    min: 100,
                                    max: 500,
                                },
                            ],
                        },
                        {
                            title: "Requested Area",
                            fields: [
                                {
                                    id: "loacation",
                                    label: "Location",
                                    type: "select",
                                    required: true,
                                    options: []
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
                                    placeholder: "",
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
        case "Industrial":
            return [
                {
                    title: "industrial_application",
                    description: "industrial_application_desc",
                    key: "instruction",
                    sections: [
                        {
                            title: "instruction_title",
                            points: [
                                "industrial_instruction_point_1",
                                "industrial_instruction_point_2",
                                "industrial_instruction_point_3",
                                "industrial_instruction_point_4",
                            ],
                        },
                        {
                            title: "important_information_title",
                            points: [
                                "industrial_development_guidelines_design_criteria",
                                "industrial_lease_agreement",
                            ],
                        },
                        {
                            title: "required_documents_title",
                            key: "requiredDocuments",
                            points: [
                                "valid_commercial_registration",
                                "industrial_license_initial_approval",
                                "business_plan_feasibility_study",
                                "conceptual_site_layout",
                                "material_safety_data_sheets",
                                "owners_id",
                                "financial_capacity_proof",
                                "credit_bureau_consent_form",
                                "company_profile_if_applicable",
                                "three_years_audited_financial_statements_if_applicable",
                            ],
                        },
                    ],
                },
                {
                    title: "industrial_application",
                    description: "industrial_application_desc",
                    sections: [
                        {
                            title: "technology",
                            fields: [
                                {
                                    id: "technologyCountryOfOrigin",
                                    label: "technology_country_of_origin",
                                    type: "text",
                                    required: true,
                                    placeholder: "",
                                    min: 2,
                                    max: 100,
                                },
                                {
                                    id: "equipmentCountryOfOrigin",
                                    label: "equipment_country_of_origin",
                                    type: "text",
                                    required: true,
                                    placeholder: "",
                                    min: 2,
                                    max: 100,
                                },
                                {
                                    id: "equipmentYearOfProduction",
                                    label: "equipment_year_of_production",
                                    type: "datepicker",
                                    required: true,
                                    placeholder: "",
                                    minYear: 2000,
                                    maxYear: 2025,
                                }

                            ]
                        },
                        {
                            title: "Intended Use & Business Plan",
                            fields: [
                                {
                                    id: "landUse",
                                    label: "land_use",
                                    type: "select",
                                    required: true,
                                    options: [
                                        { id: 'LogisticsWarehousing', name: 'Logistics Warehousing' },
                                        { id: 'WorkshopsAssembly', name: 'Workshops Assembly' },
                                        { id: 'OpenYardsStorage', name: 'Open Yards Storage' },
                                        { id: 'Industry', name: 'Industry' },
                                        { id: 'NonIndustry', name: 'Non Industry' },
                                    ],
                                },
                                {
                                    id: "location",
                                    label: "location",
                                    type: "select",
                                    required: true,
                                    options: []
                                },
                                {
                                    id: "isicSection",
                                    label: "isic_section",
                                    type: "select",
                                    required: true,
                                    options: [{ id: "loading", name: "Fetching ISIC Section...", disabled: true }]
                                },
                                {
                                    id: "isicCode",
                                    label: "isic_code_description",
                                    type: "select",
                                    required: true,
                                    options: []
                                },
                                {
                                    id: "proposedBusinessActivity",
                                    label: "description_of_proposed_business_activities",
                                    type: "textarea",
                                    required: true,
                                    placeholder: "",
                                    min: 100,
                                    max: 500,
                                }
                            ]
                        },
                        {
                            title: "Estimated Requested Area (SQM)",
                            fields: [
                                {
                                    id: "openArea",
                                    label: "open_area_sqm",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "administration",
                                    label: "administration_sqm",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "laboratory",
                                    label: "laboratory_sqm",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "rawMaterialStorage",
                                    label: "raw_material_storage_sqm",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "productionArea",
                                    label: "production_area_sqm",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "finishedProductStorage",
                                    label: "finished_product_storage_sqm",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "maintenanceWorkshops",
                                    label: "maintenance_workshops_sqm",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "TotalRequestedPlotSize",
                                    label: "total_requested_plot_area_sqm",
                                    type: "number",
                                    required: true,
                                    disabled: true,
                                },
                            ]
                        },
                        {
                            title: "Utilities",
                            fields: [
                                {
                                    id: "potableWater",
                                    label: "portable_water",
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
                                    label: "natural_gas",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "seaCoolingWater",
                                    label: "sea_cooling_water",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "electricity",
                                    label: "electricity_kva",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "fuelProducts",
                                    label: "fuel_products",
                                    type: "number",
                                    required: true
                                }
                            ]
                        },
                        {
                            title: "product_information",
                            subTitle: "Add New Product",
                            key: "ProductsJson",
                        }
                    ]
                },
                {
                    title: "industrial_application",
                    description: "industrial_application_desc",
                    sections: [
                        {
                            title: "employment",
                            fields: [
                                {
                                    id: "currentNumberOfEmployees",
                                    label: "current_number_of_employees",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "additionalEmploymentProjected",
                                    label: "additional_employment_projected",
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
                                    label: "first_aid_equipment",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                },
                                {
                                    id: "fireFightingSystem",
                                    label: "fire_fighting_system",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                },
                                {
                                    id: "numberOfShifts",
                                    label: "number_of_shifts",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "safetyEquipmentSystem",
                                    label: "safety_equipment_system",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                },
                                {
                                    id: "workersFacilities",
                                    label: "workers_facilities",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                },
                                {
                                    id: "emergencyResponsePlan",
                                    label: "emergency_response_plan",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                },
                            ]
                        },
                        {
                            title: "environmental_information",
                            fields: [
                                {
                                    id: "gasesEmittedDustsInfo",
                                    label: "gases_emitted_dusts_info",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                    subTitle: "air_gases_type"
                                },
                                {
                                    id: "stackHeight",
                                    label: "stack_height",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "temperature",
                                    label: "temperature_celsius",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "rateOfEmission",
                                    label: "rate_of_emission",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "wasteType",
                                    label: "waste_type",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                    subTitle: "Waste",
                                },
                                {
                                    id: "industrialWasteWater",
                                    label: "industrial_waste_water",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                },
                                {
                                    id: "hazardousNonHazardous",
                                    label: "hazardous_non_hazardous",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                },
                                {
                                    id: "domesticWasteWater",
                                    label: "domestic_waste_water",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                },
                                {
                                    id: "wasteQuantity",
                                    label: "quantity",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "treatmentType",
                                    label: "treatment_type",
                                    type: "text",
                                    required: true,
                                    max: 100,
                                },
                                {
                                    id: "recyclingUsagePlans",
                                    label: "recycling_usage_plans",
                                    type: "text",
                                    required: true,
                                    max: 100
                                },
                                {
                                    id: "levelOfNoiseAtPlotBoundary",
                                    label: "level_of_noise_at_plot_boundary",
                                    type: "number",
                                    required: true,
                                    subTitle: "Noise",
                                }
                            ]
                        },
                        {
                            title: "project_financial_information",
                            fields: [
                                {
                                    id: "constructionCost",
                                    label: "construction_cost",
                                    type: "number",
                                    required: true,
                                    subTitle: "Cost of Project",
                                },
                                {
                                    id: "costOfPlantMachinery",
                                    label: "cost_of_plant_machinery",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "costOfOtherFixedAssets",
                                    label: "cost_of_other_fixed_assets",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "TotalCost",
                                    label: "total_cost",
                                    type: "number",
                                    required: true,
                                    disabled: true,
                                },
                                {
                                    id: "equity",
                                    label: "equity",
                                    type: "number",
                                    required: true,
                                    subTitle: "total_cost",
                                },
                                {
                                    id: "debt",
                                    label: "debt",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "workingCapital",
                                    label: "working_capital",
                                    type: "number",
                                    required: true
                                },
                                {
                                    id: "TotalFunding",
                                    label: "total_funding",
                                    type: "number",
                                    required: true,
                                    disabled: true,
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "industrial_application",
                    description: "industrial_application_desc",
                    sections: [
                        {
                            title: "required_documents",
                            fields: [
                                {
                                    id: "Documents.ValidCommercialRegistration",
                                    label: "valid_commercial_registration",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.OwnersId",
                                    label: "owners_id",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.BusinessPlan",
                                    label: "business_plan_feasibility_study",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.IndustrialLicense",
                                    label: "industrial_License",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.ConceptualSiteLayout1",
                                    label: "conceptual_site_layout",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.MaterialSafetyDataSheets",
                                    label: "material_safety_date_sheets",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.ConceptualSiteLayout2",
                                    label: "conceptual_site_layout",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.ProjectedCashFlow",
                                    label: "projected_cash_flow",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.FinancialCapacityProof",
                                    label: "financial_capacity_proo_to_execute_the_project",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.CreditBureauReport",
                                    label: "credit_bureau_repor_for_owner",
                                    type: "file",
                                    required: true
                                },

                                {
                                    id: "Documents.CompanyProfile",
                                    label: "company_profile_if_applicable",
                                    type: "file",
                                    required: false
                                },

                                {
                                    id: "Documents.AuditedFinancialStatements",
                                    label: "three_years_of_audited_financial_statements_if_applicable",
                                    type: "file",
                                    required: false
                                },

                            ]
                        },
                    ]
                }
            ]
        case "Logistics":
            return [
                {
                    title: "open_yard_application",
                    description: "open_yard_application_desc",
                    key: "instruction",
                    sections: [
                        {
                            title: "instruction_title",
                            points: [
                                "instruction_point_1",
                                "instruction_point_2",
                                "instruction_point_3",
                                "instruction_point_4",
                            ],
                        },
                        {
                            title: "important_information_title",
                            points: [
                                "open_yards_lease_agreement",
                                "open_yards_information",
                            ],
                        },
                        {
                            title: "required_documents_title",
                            key: "requiredDocuments",
                            points: [
                                "valid_commercial_registration",
                                "valid_commercial_license",
                                "establishment_card",
                                "owners_id",
                                "business_plan",
                                "three_years_audited_financial_statements",
                                "traffic_listing_moi",
                                "photos_materials_equipment",
                            ],
                        },
                    ],
                },

                {
                    title: "open_yard_application",
                    description: "open_yard_application_desc",
                    sections: [
                        {
                            title: "intended_use_business_plan",
                            fields: [
                                {
                                    id: "landUse",
                                    label: "land_use",
                                    type: "select",
                                    required: true,
                                    options: [
                                        { id: "LogisticsWarehousing", name: "Logistics Warehousing" },
                                        { id: "WorkshopsAssembly", name: "Workshops Assembly" },
                                        { id: "OpenYardsStorage", name: "Open Yards Storage" },
                                        { id: "Industry", name: "Industry" },
                                        { id: "NonIndustry", name: "Non Industry" },
                                    ],
                                },
                                {
                                    id: "cluster",
                                    label: "cluster",
                                    type: "select",
                                    required: true,
                                    options: [],
                                },
                                {
                                    id: "proposedBusinessActivity",
                                    label: "description_of_proposed_business_activities",
                                    type: "textarea",
                                    required: false,
                                    placeholder: "",
                                    min: 100,
                                    max: 500,
                                },
                            ],
                        },
                        {
                            title: "facility_requirements",
                            fields: [
                                {
                                    id: "totalRequestedPlotSize",
                                    label: "total_requested_plot_size_m2",
                                    type: "number",
                                    required: true,
                                    placeholder: "",
                                    max: 15,
                                },
                                {
                                    id: "location",
                                    label: "preferred_location",
                                    type: "select",
                                    required: true,
                                    options: [],
                                },
                            ],
                        },
                    ],
                },

                {
                    title: "open_yard_application",
                    description: "open_yard_application_desc",
                    sections: [
                        {
                            title: "required_documents",
                            fields: [
                                {
                                    id: "Documents.ValidCommercialRegistration",
                                    label: "valid_commercial_registration",
                                    type: "file",
                                    required: true,
                                },
                                {
                                    id: "Documents.ValidCommercialLicense",
                                    label: "valid_commercial_license",
                                    type: "file",
                                    required: true,
                                },
                                {
                                    id: "Documents.OwnersIDs",
                                    label: "owners_id",
                                    type: "file",
                                    required: true,
                                },
                                {
                                    id: "Documents.EstablishmentCard",
                                    label: "establishment_card",
                                    type: "file",
                                    required: true,
                                },
                                {
                                    id: "Documents.BusinessPlan",
                                    label: "business_plan",
                                    type: "file",
                                    required: true,
                                },
                                {
                                    id: "Documents.ThreeYearsOfAuditedFinancialStatements",
                                    label: "three_years_audited_financial_statements",
                                    type: "file",
                                    required: false,
                                },
                                {
                                    id: "Documents.TrafficListingFromMOI",
                                    label: "traffic_listing_moi",
                                    type: "file",
                                    required: false,
                                },
                                {
                                    id: "Documents.PhotosOfMaterialsAndEquipment",
                                    label: "photos_materials_equipment",
                                    type: "file",
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            ];


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

export const TotalCalculationMap: Record<string, string[]> = {
    TotalCost: ["constructionCost", "costOfPlantMachinery", "costOfOtherFixedAssets"],
    TotalFunding: ["equity", "debt", "workingCapital"],
    TotalRequestedPlotSize: [
        "openArea",
        "administration",
        "laboratory",
        "rawMaterialStorage",
        "productionArea",
        "finishedProductStorage",
        "maintenanceWorkshops",
    ],
};
