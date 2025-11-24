import { API_ENDPOINTS } from "@/api/apiEndpoints";
import useNetworkRequest from "@/api/useNetworkRequest";
import { CreateAndFilter } from "@/components/createAndFilter";
import CustomPagination from "@/components/customPagination";
import ListOFCards from "@/components/listOfcards";
import Loader from "@/components/loader";
import PageHeader from "@/components/pageHeader";
import { EmptyRequest } from "@/components/service/serviceRequestPage/empty-request";
import { PAGE_SIZE } from "@/constants";
import { useApp } from "@/context/AppContext";
import { SquareLibrary } from "lucide-react";
import { useEffect, useState } from "react";


const header = {
    title: "violation_reports",
    homeLink: 'Home',
    contentLinks: ['all_violation_reports', 'all_violation_reports'],
}

const filterKeys = {
    title: 'Violation Reports',
    filterTypes: [
        { id: '939330000', value: 'approved' },
        { id: '939330005', value: 'pre_approved' },
        { id: '939330001', value: 'rejected' },
        { id: '1', value: 'in_progress' },
        { id: '939330003', value: 'cancelled' },
        { id: '2', value: 'pending_work' },
        { id: '939330002', value: 'pending_investor_update' },
        { id: '939330004', value: 'pending_request_fees' },
    ]
}

const cardsConfig = {
    icon: SquareLibrary,
    id: "requestId",
    title: "findingNumber",
    label: "workOrderType",
    status: 'status',
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
}

const ViolationPage = () => {

    const { violationFilter, setViolationFilter, selectedCompany } = useApp();
    const [loading, setLoading] = useState(false);
    const networkRequest = useNetworkRequest();
    const [violationData, setViolationData] = useState<any[]>([])

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams();

                params.append("AccountId", selectedCompany?.accountID ?? "");
                // params.append("AccountId", 'b5c52ef7-a23f-e511-80ca-00155d0c0f13');
                params.append("Page", (violationFilter?.page ?? 1).toString());
                params.append("PageSize", PAGE_SIZE.toString());
                violationFilter?.searchTerm && params.append("SearchTerm", (violationFilter?.searchTerm));

                if (violationFilter?.status) {
                    violationFilter.status.split(",").forEach(val => {
                        params.append("StatusArray", val);
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

    return (
        <div className="">
            <PageHeader header={header} />
            {<div className="min-h-[55vh]">
                {(violationData?.length === 0 && !violationFilter?.searchTerm && !violationFilter?.status && !loading) ?
                    <div className="min-h-[45vh] flex items-center justify-center">
                        <EmptyRequest title='no_violation_found' description="no_violation_reports_found." hideButton />
                    </div>
                    :
                    <>
                        <CreateAndFilter filterConfig={filterKeys} setAppliedFilter={setViolationFilter} appliedFilter={violationFilter} />
                        <div className="">
                            <ListOFCards cardsConfig={cardsConfig} cardsData={violationData} />
                            {!!((violationFilter?.totalPages ?? 0) > 1) && <CustomPagination handlePageChange={handlePageChange} currentPage={violationFilter?.page} totalPages={violationFilter?.totalPages ?? 0} />}
                            {!loading && violationData?.length === 0 && <EmptyRequest hideButton={true} title={'no_violation_reports'} />}
                        </div>
                    </>}
            </div>
            }
            {loading && <Loader />}
        </div>
    )
}

export default ViolationPage;