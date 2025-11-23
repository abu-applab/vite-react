import { useEffect, useLayoutEffect, useState } from "react";
import { Factory, FileSpreadsheet, Eye, Truck, CircleArrowRight, Trash2 } from "lucide-react"
import AddNewApplication from "@/components/applicationPage/addNewApplication";
import { InvestmentSelector } from "@/components/applicationPage/investmentSelector";
import logistics from '../assets/images/logestics.svg'
import industrial from '../assets/images/industrial.svg'
import commercial from '../assets/images/commercial.svg'
import openYards from '../assets/images/open-yards.svg'
import alKhor from '../assets/images/Al-khor.svg'
import smiZone from '../assets/images/SMI-zone.svg'
import alKaranaa from '../assets/images/Al-Karaana.svg'
import mesaieed from '../assets/images/Mesaieed.svg'
import { useApp } from "@/context/AppContext";
import PageHeader from "@/components/pageHeader";
import { CreateAndFilter } from "@/components/createAndFilter";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_ENDPOINTS } from "@/api/apiEndpoints";
import ListOFCards from "@/components/listOfcards";
import CustomPagination from "@/components/customPagination";
import Loader from "@/components/loader";
import { useNavigate, useParams } from "react-router-dom";
import { EmptyRequest } from "@/components/service/serviceRequestPage/empty-request";
import { PAGE_SIZE } from "@/constants";
import { useTranslation } from "react-i18next";

interface InvestmentOptions {
    id: string
    title: string
    description?: string
    image: string
    disabled?: boolean
    investments?: string[]
    applicationType?: string
}

interface InvestmentType {
    title: string,
    description: string,
    options: InvestmentOptions[]
}

const investmentTypes: InvestmentType =
{
    title: 'What kind of Investment are you looking for?',
    description: 'Select the investment type that best matches your requirements, Options are shown below.',
    options: [
        {
            id: "logisticsPark",
            title: "logistics_park",
            description: "logistics_park_desc",
            image: logistics,
            disabled: true
        },
        {
            id: "Industrial",
            title: "industrial",
            description: "industrial_desc",
            image: industrial,
        },
        {
            id: "commercial",
            title: "commercial",
            description: "commercial_desc",
            image: commercial,
            disabled: true,
        },
        {
            id: "Logistics",
            title: "open_yards",
            description: "open_yards_desc",
            image: openYards,
        },
    ]
}


const investmentLocations: InvestmentType =
{
    title: 'Which location would you like to choose?',
    description: 'choose from available locations for your selected investment type.',
    options: [
        {
            id: "7703413e-4094-ea11-8106-00155d0d0b8c",
            title: "al_khor_industrial_zone",
            image: alKhor,
            investments: ['Logistics', 'Industrial']
        },
        {
            id: "b8797db0-4094-ea11-8106-00155d0d0b8c",
            title: "al_karaana_industrial_zone",
            image: alKaranaa,
            investments: ['Logistics', 'Industrial'],
        },
        {
            id: "40bae3c1-b36b-ed11-811e-00155d0d0b8c",
            title: "small_medium_ind",
            image: smiZone,
            investments: ['Industrial'],
            applicationType: "SMI",
        },
        {
            id: "edb79af3-c0d5-e611-80d3-00155d0d0b8cc",
            title: "mesaieed_industrial_zone",
            image: mesaieed,
            investments: ['Industrial'],
            applicationType: "MIZ",
        },
    ]
}

const cardsConfigBase = {
    icon: FileSpreadsheet,
    id: "applicationId",
    subTitle: "locationNameEn",
    title: "referenceNumber",
    status: 'status',
    fields: [
        {
            label: "location",
            key: "locationNameEn",
        },
        {
            label: "submitted_date",
            key: "submissionDate",
        },
    ],
    menuOptions: [
        {
            label: "view_details",
            icon: Eye,
            actionKey: "view"
        },
    ]
}

const cardsDraftConfigBase = {
    icon: FileSpreadsheet,
    id: "applicationId",
    subTitle: "locationNameEn",
    title: "referenceNumber",
    status: 'status',
    fields: [
        {
            label: "location",
            key: "locationNameEn",
        },
        {
            label: "created_date",
            key: "createdOn",
        },
    ],
    menuOptions: [
        {
            label: "continue",
            icon: CircleArrowRight,
            actionKey: "view"
        },
        {
            label: "delete",
            icon: Trash2,
            actionKey: "delete"
        },
    ]
}

const tabs = [
    { id: 'submitted', label: 'submitted_applications' },
    { id: 'drafted', label: 'drafted_applications' },
];

const header = {
    title: "applications",
    homeLink: 'companyName',
    contentLinks: ['view_applications', 'create_new_applications'],
}

const filterKeys = {
    title: 'Applications',
    createNewRequest: 'create_new_applications',
    filterTypes: [
        { id: '939330000', value: 'submitted' },
        { id: '939330001', value: 'review_in_progress' },
        { id: '939330002', value: 'approved' },
        { id: '939330003', value: 'Rejected' },
        { id: '939330005', value: 'pending_submit_transfer' },
        { id: '939330006', value: 'on_hold' },
        { id: '939330007', value: 'cancelled' },
        { id: '939330008', value: 'terminated' },
    ],
    applicationFilter: [
        { id: '100000000', value: 'Industrial', icon: Factory },
        { id: '100000001', value: 'Logistics', icon: Truck },
    ]
}

const ApplicationPage = () => {
    const [step, setStep] = useState(0);
    const [activeTab, setActiveTab] = useState('submitted');
    const [isCreateNewApplication, setCreateNewApplication] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<string>("");
    const { setSelectedInvestment, setApplicationFilter, applicationDraftFilter, setApplicationDarftFilter, applicationFilter, selectedCompany } = useApp();
    const [loading, setLoading] = useState(false);
    const networkRequest = useNetworkRequest();
    const [applicationData, setApplicationData] = useState([])
    const [applicationDraftData, setApplicationDarftData] = useState([])
    const [refreshDraft, setRefreshDraft] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const {t} = useTranslation();

    const cardActions = {
        view: (card: any) => {
            console.log("Viewing:", card.typeOfApplication);
            const locationName = investmentLocations.options.find((loc) => loc.title === card.locationNameEn)
            setSelectedApplication(card.typeOfApplication);
            setStep(2)
            setCreateNewApplication(true);
            setSelectedInvestment(() => ({
                application: '',
                location: locationName?.title,
                locationId: locationName?.id,
                applicationType: card?.applicationType?.replace(/\s+/g, "") ?? '',
                status: card?.status ?? ''
            }));
            navigate(`/portal/application/${card.applicationId}`);
        },
        delete: async (card: any) => {
            setLoading(true);
            try {
                const response = await networkRequest(
                    `${API_ENDPOINTS.deleteApplication}?id=${card.applicationId}`,
                    { method: "POST" }
                );

                if (response.success) {
                    setRefreshDraft(prev => !prev);
                    console.log("Deleted successfully", card.applicationId);
                }
            } catch (error) {
                console.error("Delete failed:", error);
            }
        },
    };

    const cardsConfig = {
        ...cardsConfigBase,
        menuOptions: cardsConfigBase.menuOptions.map((option) => ({
            ...option,
            onClick: (card: any) => {
                const handler = cardActions[option.actionKey as keyof typeof cardActions];
                if (handler) handler(card);
            },
        })),
    };

    const cardsDraftConfig = {
        ...cardsDraftConfigBase,
        menuOptions: cardsDraftConfigBase.menuOptions.map((option) => ({
            ...option,
            onClick: (card: any) => {
                const handler = cardActions[option.actionKey as keyof typeof cardActions];
                if (handler) handler(card);
            },
        })),
    };

    useEffect(() => {
        if (!id) {
            setCreateNewApplication(false);
            setStep(0);
            setSelectedApplication("");
        }
    }, [id]);

    useLayoutEffect(() => {
        // Run this only once — not on id changes
        const navType =
            (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type ||
            (performance.navigation?.type === 1 ? "reload" : "");


        if (id && navType === "reload") {
            navigate("/portal/application", { replace: true });
        }
        // 👇 Empty dependency ensures this runs only once on page load
    }, []);


    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams();

                params.append("AccountId", selectedCompany?.accountID ?? "");
                params.append("Page", (applicationFilter?.page ?? 1).toString());
                params.append("PageSize", PAGE_SIZE.toString());
                applicationFilter?.searchTerm && params.append("SearchTerm", (applicationFilter?.searchTerm));
                applicationFilter?.typeOfApplication && params.append("TypeOfApplication", (applicationFilter?.typeOfApplication));

                if (applicationFilter?.status) {
                    applicationFilter.status.split(",").forEach(val => {
                        params.append("StatusArray", val);
                    });
                } else {
                    filterKeys.filterTypes.forEach((val) => {
                        params.append("StatusArray", val.id);
                    })
                }

                const response = await networkRequest(API_ENDPOINTS.getApplicationsList, { method: "GET", body: params })

                if (response?.success) {
                    const totalPages = Math.ceil(response.data.totalRecords / PAGE_SIZE)
                    setApplicationData(response.data.data)
                    setApplicationFilter((prev) => ({
                        ...prev,
                        totalPages: totalPages
                    }))
                }
            } catch (error) {
                console.error("Error fetching service requests:", error)
            } finally {
                setLoading(false)
            }
        }
        if (selectedCompany?.accountID && !isCreateNewApplication) {
            fetchRequests()
        }
    }, [
        applicationFilter?.status,
        applicationFilter?.searchTerm,
        applicationFilter?.typeOfApplication,
        applicationFilter?.page,
        selectedCompany?.accountID,
        isCreateNewApplication
    ])

    useEffect(() => {
        const fetchDraftRequests = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams();
                params.append("AccountId", selectedCompany?.accountID ?? "");
                params.append("Page", (applicationFilter?.page ?? 1).toString());
                params.append("PageSize", PAGE_SIZE.toString());
                params.append("StatusArray", '939330004');
                applicationFilter?.searchTerm && params.append("SearchTerm", (applicationFilter?.searchTerm));
                applicationFilter?.typeOfApplication && params.append("TypeOfApplication", (applicationFilter?.typeOfApplication));

                const response = await networkRequest(API_ENDPOINTS.getApplicationsList, { method: "GET", body: params })

                if (response?.success) {
                    const totalPages = Math.ceil(response.data.totalRecords / PAGE_SIZE)
                    setApplicationDarftData(response.data.data)
                    setApplicationDarftFilter((prev) => ({
                        ...prev,
                        totalPages: totalPages
                    }))
                }
            } catch (error) {
                console.error("Error fetching service requests:", error)
            } finally {
                setLoading(false)
            }
        }
        if (selectedCompany?.accountID && !isCreateNewApplication) {
            fetchDraftRequests()
        }
    }, [
        applicationDraftFilter?.page,
        applicationFilter?.searchTerm,
        applicationFilter?.typeOfApplication,
        selectedCompany?.accountID,
        isCreateNewApplication,
        refreshDraft
    ])


    const handlePageChange = (newPage: number, totalPages: number, setFilter: any) => {
        if (newPage > 0 && newPage <= totalPages) {
            setFilter((prev: any) => ({
                ...prev,
                page: newPage,
            }))
        }
    }

    const filteredInvestmentLocations = {
        ...investmentLocations,
        options: investmentLocations.options.filter(option =>
            option?.investments?.includes(selectedApplication)
        )
            .map(option => {
                // Disable Al Khor & Al Karaana when selectedApplication is 'industrial'
                if (
                    selectedApplication === "Industrial" &&
                    ["al_khor_industrial_zone", "al_karaana_industrial_zone"].includes(option.title)
                ) {
                    return { ...option, disabled: true };
                }
                return option;
            }),
    };


    const steps = [
        {
            id: 1,
            title: "Select Investment Type",
            component: (
                <InvestmentSelector
                    handleSelectedOption={(val: string) => {
                        setSelectedApplication(val);
                        setStep(1);
                    }}
                    investmentContent={investmentTypes}
                />
            ),
        },
        {
            id: 2,
            title: "Select Location",
            component: (
                <InvestmentSelector
                    handleSelectedOption={(val: string) => {
                        const locationName = investmentLocations.options.find((loc) => loc.id === val)
                        const application = selectedApplication === "Logistics" ? 'Open Yards' : locationName?.title
                        setSelectedInvestment({
                            application: application ?? '',
                            applicationType: locationName?.applicationType ?? 'LogisticsParks',
                            location: locationName?.title ?? '',
                            locationId: locationName?.id ?? ''
                        })
                        setStep(2); // Go to AddNewApplication (step 3 → index 2)
                    }}
                    investmentContent={filteredInvestmentLocations}
                />
            ),
        },
        {
            id: 3,
            title: "Add New Application",
            component: (
                <AddNewApplication
                    selectedApplication={selectedApplication}
                    setSelectedApplication={setSelectedApplication}
                    setCreateNewApplication={setCreateNewApplication}
                    setStep={setStep}
                />
            ),
        },
    ];


    return (
        <div className="">
            {/* Header */}
            <PageHeader header={header} />

            {(!isCreateNewApplication) ? (
                (applicationData.length === 0 && applicationDraftData.length === 0 && !applicationFilter?.searchTerm && !applicationFilter?.typeOfApplication && !applicationFilter?.status && !loading) ?
                    <EmptyRequest title='no_applications_found' description="havent_submitted_application_yet" buttonText="submit_new_applications" />
                    :
                    <div>
                        <CreateAndFilter
                            onNewRequest={() => setCreateNewApplication(true)}
                            filterConfig={filterKeys}
                            setAppliedFilter={setApplicationFilter}
                            appliedFilter={applicationFilter}
                        />
                        <div className="w-full min-h-[55vh] mt-6">
                            <div className="flex items-center bg-white h-[56px] rounded-lg shadow-md gap-[8px] max-md:justify-between max-md:px-4">
                                {tabs.map((tab) => (
                                    <button key={tab.id} className={`py-[10px] h-full md:ml-[40px] text-sm font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 `} onClick={() => setActiveTab(tab.id)} > {t(tab.label)}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 w-full min-h-[35vh] rounded-b-lg">
                                {activeTab === 'submitted' &&
                                    ((applicationData.length > 0 && (applicationFilter?.totalPages ?? 0) > 0) ?
                                        <>
                                            <ListOFCards cardsConfig={cardsConfig} cardsData={applicationData} />
                                            {(applicationFilter?.totalPages ?? 0) > 1 && (
                                                <CustomPagination handlePageChange={(page) => handlePageChange(page, applicationFilter?.totalPages ?? 0, setApplicationFilter)} currentPage={applicationFilter?.page ?? 1} totalPages={applicationFilter?.totalPages ?? 0} />
                                            )}
                                        </>
                                        : !loading && <EmptyRequest hideButton={true} title={'no_applications_found'} />)
                                }
                                {activeTab === 'drafted' &&
                                    ((applicationDraftData.length > 0 && (applicationDraftFilter?.totalPages ?? 0) > 0) ?
                                        <>
                                            <ListOFCards cardsConfig={cardsDraftConfig} cardsData={applicationDraftData} />
                                            {(applicationDraftFilter?.totalPages ?? 0) > 1 && (
                                                <CustomPagination handlePageChange={(page) => handlePageChange(page, applicationDraftFilter?.totalPages ?? 0, setApplicationDarftFilter)} currentPage={applicationDraftFilter?.page ?? 1} totalPages={applicationDraftFilter?.totalPages ?? 0} />
                                            )}
                                        </>
                                        : !loading && <EmptyRequest hideButton={true} title={'no_applications_found'} />)
                                }
                            </div>
                        </div>
                    </div>
            ) :
                <div>{steps[step].component}</div>
            }
            {loading && <Loader />}
        </div>
    )
}

export default ApplicationPage