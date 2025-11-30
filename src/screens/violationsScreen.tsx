import { API_ENDPOINTS } from "@/api/apiEndpoints";
import useNetworkRequest from "@/api/useNetworkRequest";
import { CreateAndFilter } from "@/components/createAndFilter";
import CustomPagination from "@/components/customPagination";
import ListOFCards from "@/components/listOfcards";
import Loader from "@/components/loader";
import PageHeader from "@/components/pageHeader";
import { EmptyRequest } from "@/components/service/serviceRequestPage/empty-request";
import { ViolationFormHandler } from "@/components/violationScreen/violationFormHandler";
import { PAGE_SIZE } from "@/constants";
import { useApp } from "@/context/AppContext";
import { Eye, SquareLibrary } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const header = {
    title: "violation_reports",
    homeLink: 'Home',
    contentLinks: ['all_violation_reports', 'all_violation_reports'],
}

const filterKeys = {
    title: 'Violation Reports',
    filterTypes: [
        { id: '120320000', value: 'closed+' },
        { id: '120320010', value: 'closed-' },
        { id: '120320020', value: 'open+60' },
        { id: '120320030', value: 'open+30' },
        { id: '120320040', value: 'overdue-30' },
        { id: '120320050', value: 'overdue-60' },
        { id: '120320060', value: 'overdue-60+' },
        { id: '120320001', value: 'default_notice_1' },
        { id: '120320002', value: 'default_notice_2' },
        { id: '120320003', value: 'sent_to_legal' },
        { id: '120320004', value: 'escalated_to_carr' },
        { id: '120320005', value: 'escalated_to_ncr' }
    ]
}

const cardsConfigBase = {
    icon: SquareLibrary,
    id: "requestId",
    title: "findingNumber",
    label: "workOrderType",
    tag: "workOrderType",
    status: 'actionPartyFindingStatus',
    showBelow: true,
    fields: [
        {
            label: "plot_number",
            key: "plotNumber",
        },
        {
            label: "finding_type",
            key: "findingType",
        },
        {
            label: "issuance_date",
            key: "issuanceDate",
        },
        {
            label: "expected_closeout_date",
            key: "expectedCloseOutDate",
        },
    ],
    menuOptions: [
        {
            label: "view_findings",
            icon: Eye,
            actionKey: "view"
        },
    ],
    warning: 'expectedCloseOutDate'
}

const ViolationPage = () => {

    const { violationFilter, setViolationFilter, selectedCompany } = useApp();
    const [loading, setLoading] = useState(false);
    const networkRequest = useNetworkRequest();
    const [violationData, setViolationData] = useState<any[]>([]);
    const [showFInding, setShowFinding] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const cardActions = {
        view: (card: any) => {
            setShowFinding(true);
            navigate(`/portal/violations/${card.id}`);
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

    useLayoutEffect(() => {
        // Run this only once — not on id changes
        const navType =
            (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type ||
            (performance.navigation?.type === 1 ? "reload" : "");


        if (id && navType === "reload") {
            navigate("/portal/violations", { replace: true });
        }
        // 👇 Empty dependency ensures this runs only once on page load
    }, []);


    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams();

                params.append("AccountId", selectedCompany?.accountID ?? "");
                // params.append("AccountId", '03a29bae-8b83-e511-80ca-00155d0c0f13');
                params.append("Page", (violationFilter?.page ?? 1).toString());
                params.append("PageSize", PAGE_SIZE.toString());
                violationFilter?.searchTerm && params.append("SearchTerm", (violationFilter?.searchTerm));

                if (violationFilter?.status) {
                    violationFilter.status.split(",").forEach(val => {
                        params.append("ActionPartyFindingStatusArray", val);
                    });
                }
                const response = await networkRequest(API_ENDPOINTS.getFindingsList, { method: "GET", body: params })
                console.log('response: ', response);

                if (response?.success) {
                    const totalPages = Math.ceil(response.data.totalRecords / PAGE_SIZE)
                    setViolationData(response?.data?.data)
                    setViolationFilter((prev) => ({
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
        if (selectedCompany?.accountID) {
            fetchRequests()
        }
    }, [
        selectedCompany?.accountID,
        violationFilter?.page,
        violationFilter?.status,
        violationFilter?.searchTerm,
    ]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= (violationFilter?.totalPages ?? 0)) {
            setViolationFilter((prev: any) => ({
                ...prev,
                page: newPage,
            }))
        }
    }

    const hideFilters = (violationData?.length === 0 || !violationData) && !violationFilter?.searchTerm && !violationFilter?.status && !loading

    return (
        <div className="">
            <PageHeader header={header} customTitle={id ? 'view_violation_report' : ''} />
            {!showFInding ? <div className="min-h-[55vh]">
                <>
                    <CreateAndFilter filterConfig={filterKeys} setAppliedFilter={setViolationFilter} appliedFilter={violationFilter} hideFilters={hideFilters}/>
                    <div className="">
                        <ListOFCards cardsConfig={cardsConfig} cardsData={violationData} />
                        {!!(violationFilter?.totalPages && violationFilter.totalPages > 1 && violationData.length > 0) && <CustomPagination handlePageChange={handlePageChange} currentPage={violationFilter?.page} totalPages={violationFilter?.totalPages ?? 0} />}
                        {!loading && (violationData?.length === 0 || !violationData) && <EmptyRequest hideButton={true} title={'no_violation_found'} />}
                    </div>
                </>
            </div> :
                <ViolationFormHandler
                    onBack={() => {
                        setShowFinding(false)
                        navigate("/portal/violations")
                    }
                    }
                />
            }
            {loading && <Loader />}
        </div>
    )
}

export default ViolationPage;