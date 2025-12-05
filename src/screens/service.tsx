import { useEffect, useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
// import { ServiceHeader } from "@/components/service/serviceRequestPage/service-header"
import { ServiceFormHandler } from "@/components/service/createNewRequest/serviceFormHandler"
import { NewServiceRequestModal, serviceOptions } from "@/components/service/serviceRequestPage/new-service-request-modal"
import { EmptyRequest } from "@/components/service/serviceRequestPage/empty-request"
import { CreateAndFilter } from "@/components/createAndFilter"
import useNetworkRequest from "@/api/useNetworkRequest"
import { API_ENDPOINTS } from "@/api/apiEndpoints"
import { useApp } from "@/context/AppContext"
import ListOFCards from "@/components/listOfcards"
import { Eye, MessageSquareDot } from "lucide-react"
import Loader from "@/components/loader"
import CustomPagination from "@/components/customPagination"
import { PAGE_SIZE } from "@/constants"
import Breadcrumb from "@/components/appBreadcrumb"
import { useNavigate } from "react-router-dom"
// import { AttachmentPopup } from "@/components/violationScreen/attachmentPopup"

// const header = {
//   title: "service_request",
//   homeLink: 'companyName',
//   contentLinks: ['all_service_requests', 'new_service_request'],
// }

const filterKeys = {
  title: 'Service Request',
  createNewRequest: 'New Service Request',
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

const cardsConfigBase = {
  icon: MessageSquareDot,
  id: "requestId",
  subTitle: "serviceType",
  title: "referenceNumber",
  status: 'status',
  showBelow: true,
  fields: [
    {
      label: "plot_number",
      key: "plotNumber",
    },
    {
      label: "submitted_date",
      key: "submittedDate",
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
interface ServiceData {
  requestId: string;
  referenceNumber: string;
  serviceType: string;
  status: string;
  plotNumber: string;
  submittedDate: string;
}

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedServiceData, setSelectedServiceData] = useState<ServiceData | null>(null)
  const [loading, setLoading] = useState(false)
  const [serviceData, setServiceData] = useState<any[]>([])
  const { serviceFilter, setServiceFilter, selectedCompany } = useApp();
  const [serviceDetails, setServiceDetails] = useState<any>(null)
  // const [isCreateNewService, setCreateNewService] = useState(false);
  const networkRequest = useNetworkRequest();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)

  const handleCardSelect = async (card: any) => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams();
      params.append("requestId", card.requestId);

      const response = await networkRequest(API_ENDPOINTS.getServiceRequestDetails, {
        method: "GET",
        body: params,
      });
      if (response.success) {
        const details = response.data;
        setServiceDetails(details)
      }


      console.log("Service request details response:", response);
    } catch (error) {
      console.error("Error fetching service request details:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const cardActions = {
    view: (card: any) => {
      setSelectedServiceData(card);
      setSelectedService(card.serviceType);
      navigate(`/portal/service/${card.requestId}`)
    },
  };

  const cardsConfig = {
    ...cardsConfigBase,
    menuOptions: cardsConfigBase.menuOptions.map((option) => ({
      ...option,
      onClick: (card: any) => {
        handleCardSelect(card);
        const handler = cardActions[option.actionKey as keyof typeof cardActions];
        if (handler) handler(card);
      },
    })),
  };



  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams();

        params.append("AccountId", selectedCompany?.accountID ?? "");
        params.append("Page", (serviceFilter?.page ?? 1).toString());
        params.append("PageSize", PAGE_SIZE.toString());
        serviceFilter?.searchTerm && params.append("SearchTerm", (serviceFilter?.searchTerm));

        if (serviceFilter?.status) {
          serviceFilter.status.split(",").forEach(val => {
            params.append("StatusArray", val);
          });
        }
        const response = await networkRequest(API_ENDPOINTS.getAllServiceRequests, { method: "GET", body: params })

        if (response?.success) {
          const totalPages = Math.ceil(response.data.totalRecords / PAGE_SIZE)
          setServiceData(response.data.data)
          setServiceFilter((prev) => ({
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
    if (selectedCompany?.accountID && !selectedService) {
      fetchRequests()
    }
  }, [serviceFilter?.page,
  serviceFilter?.status,
  serviceFilter?.searchTerm,
  selectedCompany?.accountID,
    selectedService
  ])

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (serviceFilter?.totalPages ?? 0)) {
      setServiceFilter((prev: any) => ({
        ...prev,
        page: newPage,
      }))
    }
  }

  const hideFilters = serviceData.length === 0 && !serviceFilter?.searchTerm && !serviceFilter?.status && !loading;


  const breadcrumbs = useMemo(() => {
    const items: { label: string; path?: string; onClick?: () => void }[] = [
      { label: selectedCompany?.englishName ?? "Home", path: "/portal" },
      {
        label: "service_request",
        onClick: () => {
          setSelectedService("");
          setSelectedServiceData(null);
          navigate("/portal/service");
        }
      },
    ];

    if (selectedServiceData) {
      items.push({
        label: selectedServiceData.referenceNumber || "Details",
        path: ""
      });
    } else if (selectedService) {
      const option = serviceOptions.find(o => o.key === selectedService);
      if (option) {
        items.push({
          label: `Create ${t(option.title)} Request`,
          path: ""
        });
      }
    }

    return items;
  }, [selectedCompany, selectedService, selectedServiceData, t, navigate]);
  return (
    <div className="">
      {/* <PageHeader header={header} selectedForm={selectedService} /> */}
      <Breadcrumb items={breadcrumbs} />
      {isLoading && <Loader />}
      {!selectedService ? (
        <div className="min-h-[55vh]">
          <CreateAndFilter onNewRequest={() => setIsModalOpen(true)} filterConfig={filterKeys} setAppliedFilter={setServiceFilter} appliedFilter={serviceFilter} hideFilters={hideFilters} />
          <div className="">
            <ListOFCards cardsConfig={cardsConfig} cardsData={serviceData} cardClick={true} />
            {!!(serviceFilter?.totalPages && serviceFilter.totalPages > 1) && <CustomPagination handlePageChange={handlePageChange} currentPage={serviceFilter?.page} totalPages={serviceFilter?.totalPages ?? 0} />}
            {!loading && serviceData.length === 0 && (
              hideFilters ? <EmptyRequest title='no_service_requests_yet' description="havent_submitted_request_yet" buttonText="submit_new_request" onNewRequest={() => setIsModalOpen(true)} />
                : <EmptyRequest hideButton={true} title={'no_requests_found'} />)}
          </div>
        </div>
      ) : (
        <ServiceFormHandler
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          onBack={() => setSelectedService("")}
          serviceDetails={serviceDetails}
        />
      )}

      <NewServiceRequestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        setSelectedService={setSelectedService}
      />
      {loading && <Loader />}
      {/* <AttachmentPopup open={true} onOpenChange={() => {}}/> */}
    </div>
  )
}

export default Service
