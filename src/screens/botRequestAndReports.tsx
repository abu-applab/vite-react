import { useEffect, useMemo, useState } from "react";
import { Factory, FileSpreadsheet, Eye, Truck, CircleArrowRight, Trash2 } from "lucide-react"
import { useApp } from "@/context/AppContext";
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
import Breadcrumb from "@/components/appBreadcrumb";

interface BotRequestAndReportsProps {
    selectedTab: string
}

const cardsConfigBase = {
    icon: FileSpreadsheet,
    id: "applicationId",
    subTitle: "typeOfApplication",
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
    subTitle: "typeOfApplication",
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
    { id: 'botRequest', label: 'bot_request' },
    { id: 'botReports', label: 'bot_reports' },
];

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

const BotRequestAndReports = ({selectedTab}: BotRequestAndReportsProps) => {
    const [activeTab, setActiveTab] = useState(selectedTab);
    const [isCreateBotRequest, setCreateBotRequest] = useState(false);
    const [isCreateBotReports, setCreateBotReports] = useState(false);
    const {
        setApplicationFilter,
        applicationDraftFilter,
        setApplicationDarftFilter,
        applicationFilter,
        selectedCompany,
        selectedInvestment,
        companies,
    } = useApp();
    const [loading, setLoading] = useState(false);
    const networkRequest = useNetworkRequest();
    const [botRequestData, setBotRequestData] = useState([])
    const [botReportsData, setBotReportsData] = useState([])
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();


    const cardActions = {
        view: (card: any) => {
            console.log('card: ', card);
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

    // useEffect(() => {
    //     const navType =
    //         (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type ||
    //         (performance?.navigation?.type === 1 ? "reload" : "");


    //     if (id && navType === "reload") {
    //         navigate("/portal/violation", { replace: true });
    //     }
    // }, []);


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
                    setBotRequestData(response.data.data)
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
        if (selectedCompany?.accountID && !isCreateBotRequest) {
            fetchRequests()
        }
    }, [
        applicationFilter?.status,
        applicationFilter?.searchTerm,
        applicationFilter?.typeOfApplication,
        applicationFilter?.page,
        selectedCompany?.accountID,
        isCreateBotRequest
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
                    setBotReportsData(response.data.data)
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
        if (selectedCompany?.accountID && !isCreateBotReports) {
            fetchDraftRequests()
        }
    }, [
        applicationDraftFilter?.page,
        applicationFilter?.searchTerm,
        applicationFilter?.typeOfApplication,
        selectedCompany?.accountID,
        isCreateBotReports,
    ])


    const handlePageChange = (newPage: number, totalPages: number, setFilter: any) => {
        if (newPage > 0 && newPage <= totalPages) {
            setFilter((prev: any) => ({
                ...prev,
                page: newPage,
            }))
        }
    }

    const hideFilters = (botRequestData?.length === 0 && botReportsData?.length === 0 && !applicationFilter?.searchTerm && !applicationFilter?.typeOfApplication && !applicationFilter?.status && !loading)

    const breadcrumbs = useMemo(() => {
        const items: { label: string; path?: string; onClick?: () => void; isTranslated?: boolean }[] = [
            { label: selectedCompany?.englishName ?? "Home", path: "/portal" },
            {
                label: tabs.find((t) => t.id === activeTab)?.label ?? "bot_request",
                onClick: () => {
                    if (isCreateBotRequest) {
                        navigate('/portal/bot-requests', {
                            state: {
                                from: 'botRequest',
                              }
                        })
                    }
                    if (isCreateBotReports) {
                        navigate('/portal/bot-reports', {
                            state: {
                                from: 'botReports',
                              }
                        })
                    }
                    return;
                }
            },
        ];

        if(isCreateBotRequest) {
            items.push({label: "add_new_bot_request"})
        }else if(isCreateBotReports) {
            items.push({label: "add_new_bot_reports"})
        }

        return items;
    }, [selectedCompany, activeTab, isCreateBotRequest, isCreateBotReports,  selectedInvestment, t, id]);

    const isEmptySubmitted =
        activeTab === 'botRequest' &&
        botRequestData?.length === 0 &&
        !loading;

    const isEmptyDrafted =
        activeTab === 'botReports' &&
        botReportsData?.length === 0 &&
        !loading;

    return (
        <div className="">
            {/* Header */}
            {/* <PageHeader header={header} customTitle={id ? 'submitted_application' : ''} /> */}
            <Breadcrumb items={breadcrumbs} />

            {(!(isCreateBotRequest && isCreateBotReports)) ? (
                <div className="min-h-[55vh]">
                    <div>
                        <CreateAndFilter
                            onNewRequest={() => setCreateBotRequest(true)}
                            filterConfig={filterKeys}
                            setAppliedFilter={setApplicationFilter}
                            appliedFilter={applicationFilter}
                            hideFilters={hideFilters}
                        />
                        <div className={`w-full min-h-[55vh] flex flex-col ${hideFilters && 'justify-center'}`}>
                            {
                                hideFilters ?
                                    (companies?.length > 0 ?
                                        <EmptyRequest title='no_applications_found' description="havent_submitted_application_yet" buttonText="submit_new_applications" onNewRequest={() => {
                                            if(selectedTab === 'botRequest') {
                                                setCreateBotRequest(true)
                                            } else {
                                                setCreateBotReports(true)
                                            }
                                        }} />
                                        :
                                        <EmptyRequest title='no_companies_found' description="no_companies_found_desc" descriptionParams={{ entity: t('applications') }} buttonText="add_new_company" onNewRequest={() => navigate('/portal/add-new-company')} />
                                    )
                                    :
                                    <>
                                        <div className="flex items-center bg-white h-14 rounded-lg shadow-md gap-2 max-md:justify-between max-md:px-4 mt-6">
                                            {tabs.map((tab) => (
                                                <button key={tab.id} className={`py-2.5 h-full md:ml-10 text-sm font-medium ${activeTab === tab.id ? 'text-maroon-100 border-b-2 border-maroon-100' : 'text-black hover:text-gray-500'} focus:outline-none focus:text-maroon-100 cursor-pointer`} onClick={() => setActiveTab(tab.id)} > {t(tab.label)}
                                                </button>
                                            ))}
                                        </div>
                                        <div
                                            className={`
                                                 mt-4 w-full min-h-[35vh] rounded-b-lg flex-1 flex flex-col
                                                 ${isEmptySubmitted || isEmptyDrafted ? "justify-center" : "justify-start"}
                                               `}
                                        >
                                            {activeTab === 'botRequest' &&
                                                ((botRequestData?.length > 0 && (applicationFilter?.totalPages ?? 0) > 0) ?
                                                    <>
                                                        <ListOFCards cardsConfig={cardsConfig} cardsData={botRequestData} cardClick={true} />
                                                        {(applicationFilter?.totalPages ?? 0) > 1 && (
                                                            <CustomPagination handlePageChange={(page) => handlePageChange(page, applicationFilter?.totalPages ?? 0, setApplicationFilter)} currentPage={applicationFilter?.page ?? 1} totalPages={applicationFilter?.totalPages ?? 0} />
                                                        )}
                                                    </>
                                                    : !loading && <EmptyRequest hideButton={true} title={'no_applications_found'} />)
                                            }
                                            {activeTab === 'botReports' &&
                                                ((botReportsData?.length > 0 && (applicationDraftFilter?.totalPages ?? 0) > 0) ?
                                                    <>
                                                        <ListOFCards cardsConfig={cardsDraftConfig} cardsData={botReportsData} cardClick={true} />
                                                        {(applicationDraftFilter?.totalPages ?? 0) > 1 && (
                                                            <CustomPagination handlePageChange={(page) => handlePageChange(page, applicationDraftFilter?.totalPages ?? 0, setApplicationDarftFilter)} currentPage={applicationDraftFilter?.page ?? 1} totalPages={applicationDraftFilter?.totalPages ?? 0} />
                                                        )}
                                                    </>
                                                    : !loading && <EmptyRequest hideButton={true} title={'no_applications_found'} />)
                                            }
                                        </div>

                                    </>
                            }
                        </div>
                    </div>
                </div>
            ) :
                <div className="min-h-[55vh] flex items-center">
                </div>
            }
            {loading && <Loader />}
        </div>
    )
}

export default BotRequestAndReports