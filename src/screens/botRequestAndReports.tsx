import { useEffect, useMemo, useState } from "react";
import { Eye, CircleArrowRight, Trash2, MessageSquareDot } from "lucide-react"
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
import { BotRequestFromHandler } from "@/components/botRequestAndReports/botRequestFormHandler";
import { BotReportsFromHandler } from "@/components/botRequestAndReports/botReportsFormHandler";

interface BotRequestAndReportsFilter {
    page: number,
    status?: string,
    sortBy?: string,
    totalPages?: number
    searchTerm?: string
  }

const cardsConfigBase = {
    icon: MessageSquareDot,
    id: "referenceNumber",
    title: "referenceNumber",
    status: 'status',
    fields: [
        {
            label: "category",
            key: "category",
        },
        {
            label: "submitted_date",
            key: "submissionDate",
        },
        {
            label: "modified_on",
            key: "modifiedOn",
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
    icon: MessageSquareDot,
    id: "referenceNumber",
    title: "referenceNumber",
    fields: [
        {
            label: "modified_on",
            key: "modifiedOn",
        },
        {
            label: "month",
            key: "month",
        },
        {
            label: "year",
            key: "year",
        },
        {
            label: "submitted_date",
            key: "submissionDate",
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

const BotRequestAndReports = () => {
    const [activeTab, setActiveTab] = useState("bot-requests");
    const [isCreateBotRequest, setCreateBotRequest] = useState(false);
    const [isCreateBotReports, setCreateBotReports] = useState(false);
    const [botRequestAndReportsFilter, setBotRequestAndReportsFilter] = useState<BotRequestAndReportsFilter>({page: 1})
    const {
        botRequestFilter,
        setBotRequestFilter,
        botReportsFilter,
        setBotReportsFilter,
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

    useEffect(() => {
        if (activeTab === "botRequest") {
          setBotRequestFilter((prev) => ({
            ...prev,
            page: botRequestAndReportsFilter.page ?? 1,
            searchTerm: botRequestAndReportsFilter.searchTerm,
            status: botRequestAndReportsFilter.status,
          }))
        }
      
        if (activeTab === "botReports") {
          setBotReportsFilter((prev) => ({
            ...prev,
            page: botRequestAndReportsFilter.page ?? 1,
            searchTerm: botRequestAndReportsFilter.searchTerm,
            sortBy: botRequestAndReportsFilter.sortBy,
          }))
        }
      }, [
        botRequestAndReportsFilter,
        activeTab,
        setBotRequestFilter,
        setBotReportsFilter,
      ])
      

    useEffect(() => {
        const path = location.pathname;

        if (path.includes("/portal/bot-requests")) {
            // reverse mapping as requested
            setActiveTab("botRequest");
        } else if (path.includes("/portal/bot-reports")) {
            setActiveTab("botReports");

        }
    }, [location.pathname]);

    const filterKeys = useMemo(() => {
        let filter = {
            title: 'Applications',
            createNewRequest: activeTab === 'botRequest' ? 'add_new_bot_request' : 'add_new_bot_reports',
            filterTypes: [
                { id: '2', value: 'completed' },
                { id: '1', value: 'in_progress' },
                { id: '939330001', value: 'on_hold' },
            ],
            ...(activeTab !== 'botRequest' && {
                sortBy: [
                    { id: 'manateq_month', value: 'month' },
                    { id: 'manateq_year$desc', value: 'year_newest_to_oldest' },
                    { id: 'manateq_year$asc', value: 'year_oldest_to_newest' },
                    { id: 'createdon$desc', value: 'submitted_date_newest_to_oldest' },
                    { id: 'createdon$asc', value: 'submitted_date_oldest_to_newest' }
                ],
            })

        }
        return filter;
    }, [activeTab])


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
        const fetchBotRequests = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams();

                params.append("AccountId", selectedCompany?.accountID ?? "");
                params.append("Page", (botRequestFilter?.page ?? 1).toString());
                params.append("PageSize", PAGE_SIZE.toString());
                botRequestFilter?.searchTerm && params.append("SearchTerm", (botRequestFilter?.searchTerm));

                if (botRequestFilter?.status) {
                    botRequestFilter.status.split(",").forEach(val => {
                        params.append("StatusArray", val);
                    });
                }

                const response = await networkRequest(API_ENDPOINTS.GetBotRequests, { method: "POST", body: params, isParams: true })

                if (response?.success) {
                    const totalPages = Math.ceil(response.data.totalRecords / PAGE_SIZE)
                    setBotRequestData(response.data.records)
                    setBotRequestFilter((prev) => ({
                        ...prev,
                        totalPages: totalPages
                    }))
                } else {
                    setBotRequestData([])
                }
            } catch (error) {
                console.error("Error fetching service requests:", error)
            } finally {
                setLoading(false)
            }
        }
        if (selectedCompany?.accountID && !isCreateBotRequest) {
            fetchBotRequests()
        }
    }, [
        botRequestFilter?.status,
        botRequestFilter?.searchTerm,
        botRequestFilter?.page,
        selectedCompany?.accountID,
        isCreateBotRequest
    ])

    useEffect(() => {
        const fetchBotReports = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams();
                params.append("AccountId", selectedCompany?.accountID ?? "");
                params.append("Page", (botReportsFilter?.page ?? 1).toString());
                params.append("PageSize", PAGE_SIZE.toString());
                botReportsFilter?.searchTerm && params.append("SearchTerm", (botReportsFilter?.searchTerm));
                if (botReportsFilter?.sortBy) {
                    const sortBy = botReportsFilter?.sortBy?.split('$')?.[0]
                    console.log('sortBy: ', sortBy);
                    const sortOrder = botReportsFilter?.sortBy?.split('$')?.[1] ?? 'asc'
                    console.log('sortOrder: ', sortOrder);
                    params.append("sortOrder", (sortOrder));
                    params.append("sortBy", (sortBy));
                }

                const response = await networkRequest(API_ENDPOINTS.GetBotReports, { method: "POST", body: params, isParams: true })

                if (response?.success) {
                    const totalPages = Math.ceil(response.data.totalRecords / PAGE_SIZE)
                    setBotReportsData(response?.data?.records)
                    setBotReportsFilter((prev) => ({
                        ...prev,
                        totalPages: totalPages
                    }))
                } else {
                    setBotReportsData([])
                }
            } catch (error) {
                console.error("Error fetching service requests:", error)
            } finally {
                setLoading(false)
            }
        }
        if (selectedCompany?.accountID && !isCreateBotReports) {
            fetchBotReports()
        }
    }, [
        botReportsFilter?.page,
        botReportsFilter?.searchTerm,
        botReportsFilter?.sortBy,
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

    // fix this //
    const hideFilters = (botRequestData?.length === 0 && botReportsData?.length === 0 && !botRequestFilter?.searchTerm && !botRequestFilter?.status && !loading && !botReportsFilter?.sortBy)

    const breadcrumbs = useMemo(() => {
        const items: { label: string; path?: string; onClick?: () => void; isTranslated?: boolean }[] = [
            { label: selectedCompany?.englishName ?? "Home", path: "/portal" },
            {
                label: tabs.find((t) => t.id === activeTab)?.label ?? "bot_request",
                onClick: () => {
                    if (isCreateBotRequest) {
                        setCreateBotRequest(false);
                        setCreateBotReports(false);
                        navigate('/portal/bot-requests', {
                            state: {
                                from: 'botRequest',
                            }
                        })
                    }
                    if (isCreateBotReports) {
                        setCreateBotRequest(false);
                        setCreateBotReports(false);
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

        if (isCreateBotRequest) {
            items.push({ label: "add_new_bot_request" })
        } else if (isCreateBotReports) {
            items.push({ label: "add_new_bot_reports" })
        }

        return items;
    }, [selectedCompany, activeTab, isCreateBotRequest, isCreateBotReports, selectedInvestment, t, id]);

    const handleOnNewReques = () => {
        if (activeTab === 'botReports') {
            setCreateBotReports(true)
        } else {
            setCreateBotRequest(true)
        }
    }

    const isEmptyBotRequest =
        activeTab === 'botRequest' &&
        botRequestData?.length === 0 &&
        !loading;

    const isEmptyBotReports =
        activeTab === 'botReports' &&
        botReportsData?.length === 0 &&
        !loading;

    const heading = useMemo(() => {
        return !(isCreateBotRequest || isCreateBotReports) ? 'bot_request_and_reports' : (isCreateBotRequest ? 'bot_request_form' : 'bot_reports_form')
    }, [isCreateBotRequest, isCreateBotReports])

    return (
        <div className="flex-1">
            {/* Header */}
            {/* <PageHeader header={header} customTitle={id ? 'submitted_application' : ''} /> */}
            <Breadcrumb items={breadcrumbs} heading={heading} />

            {(!(isCreateBotRequest || isCreateBotReports)) ? (
                <div className="min-h-[55vh]">
                    <div>
                        <CreateAndFilter
                            onNewRequest={handleOnNewReques}
                            filterConfig={filterKeys}
                            setAppliedFilter={setBotRequestAndReportsFilter}
                            appliedFilter={botRequestAndReportsFilter}
                            hideFilters={hideFilters}
                            hideStatus={activeTab === 'botReports'}
                        />
                        <div className={`w-full min-h-[55vh] flex flex-col ${hideFilters && 'justify-center'}`}>
                            {
                                hideFilters ?
                                    (companies?.length > 0 ?
                                        <EmptyRequest title={activeTab === 'botReports' ? 'no_bot_reports_yet' : 'no_bot_requests_yet'} description={activeTab === 'botReports' ? "havent_submitted_bot_reports_yet" : 'havent_submitted_bot_requests_yet'} buttonText={activeTab === 'botReports' ? "submit_new_bot_reports" : "submit_new_bot_request"} onNewRequest={() => {
                                            if (activeTab === 'botRequest') {
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
                                                 ${isEmptyBotRequest || isEmptyBotReports ? "justify-center" : "justify-start"}
                                               `}
                                        >
                                            {activeTab === 'botRequest' &&
                                                ((botRequestData?.length > 0 && (botRequestFilter?.totalPages ?? 0) > 0) ?
                                                    <>
                                                        <ListOFCards cardsConfig={cardsConfig} cardsData={botRequestData} cardClick={true} />
                                                        {(botRequestFilter?.totalPages ?? 0) > 1 && (
                                                            <CustomPagination handlePageChange={(page) => handlePageChange(page, botRequestFilter?.totalPages ?? 0, setBotRequestFilter)} currentPage={botRequestFilter?.page ?? 1} totalPages={botRequestFilter?.totalPages ?? 0} />
                                                        )}
                                                    </>
                                                    : !loading && <EmptyRequest hideButton={true} title={'no_bot_requests_yet'} />)
                                            }
                                            {activeTab === 'botReports' &&
                                                ((botReportsData?.length > 0 && (botReportsFilter?.totalPages ?? 0) > 0) ?
                                                    <>
                                                        <ListOFCards cardsConfig={cardsDraftConfig} cardsData={botReportsData} cardClick={true} />
                                                        {(botReportsFilter?.totalPages ?? 0) > 1 && (
                                                            <CustomPagination handlePageChange={(page) => handlePageChange(page, botReportsFilter?.totalPages ?? 0, setBotReportsFilter)} currentPage={botReportsFilter?.page ?? 1} totalPages={botReportsFilter?.totalPages ?? 0} />
                                                        )}
                                                    </>
                                                    : !loading && <EmptyRequest hideButton={true} title={'no_bot_reports_yet'} />)
                                            }
                                        </div>

                                    </>
                            }
                        </div>
                    </div>
                </div>
            ) :
                <div>
                    {
                        isCreateBotRequest ?
                            <BotRequestFromHandler setCreateBotRequest={setCreateBotRequest} />
                            :
                            <BotReportsFromHandler setCreateBotReports={setCreateBotReports} />
                    }
                </div>
            }
            {loading && <Loader />}
        </div>
    )
}

export default BotRequestAndReports