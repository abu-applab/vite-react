import { Fragment, useEffect, useState } from "react"
// import { ServiceHeader } from "@/components/service/serviceRequestPage/service-header"
import { ServiceFormHandler } from "@/components/service/createNewRequest/service-form-handler"
import { NewServiceRequestModal } from "@/components/service/serviceRequestPage/new-service-request-modal"
import { EmptyRequest } from "@/components/service/serviceRequestPage/empty-request"
import PageHeader from "@/components/pageHeader"
import { CreateAndFilter } from "@/components/createAndFilter"
import useNetworkRequest from "@/api/useNetworkRequest"
import { API_ENDPOINTS } from "@/api/apiEndpoints"
import { useApp } from "@/context/AppContext"
import ListOFCards from "@/components/listOfcards"
import { Eye, MessageSquareDot } from "lucide-react"
import Loader from "@/components/loader"
import CustomPagination from "@/components/customPagination"

const header = {
  title: "Service Request",
  homeLink: 'companyName',
  contentLinks: ['All Service Requests', 'New Service Request'],
}

const filterKeys = {
  title: 'Service Request',
  createNewRequest: 'New Service Request',
  filterTypes: [
    { id: '939330000', value: 'Approved' },
    { id: '939330005', value: 'Pre-Approved' },
    { id: '939330001', value: 'Rejected' },
    { id: '1', value: 'In Progress' },
    { id: '939330003', value: 'Cancelled' },
    { id: '2', value: 'Pending Work' },
    { id: '939330002', value: 'Pending Investor Update' },
    { id: '939330004', value: 'Pending Request Fees' },
  ]
}

const cardsConfigBase = {
  icon: MessageSquareDot,
  id: "requestId",
  subTitle: "serviceType",
  title: "referenceNumber",
  status: 'status',
  fields: [
    {
      label: "Plot Number",
      key: "plotNumber",
    },
    {
      label: "Submitted Date",
      key: "submittedDate",
    },
  ],
  menuOptions: [
    {
      label: "View Details",
      icon: Eye,
      actionKey: "view"
    },
  ]
}

const PAGE_SIZE = 4

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [serviceData, setServiceData] = useState<any[]>([])
  const { serviceFilter, setServiceFilter, selectedCompany } = useApp();
  // const [isCreateNewService, setCreateNewService] = useState(false);
  const networkRequest = useNetworkRequest();

  const cardActions = {
    view: (card: any) => {
      setSelectedService(card.requestId);
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


  return (
    <Fragment>
      <PageHeader header={header} selectedForm={selectedService} />
      {!selectedService ? (
        <div>
          {
            (serviceData.length === 0 && !serviceFilter?.searchTerm && !serviceFilter?.status && !loading) ?
             <EmptyRequest title='No Service Requests Yet' description="You haven’t submitted any service requests yet." buttonText="Submit New Request" />
            : (
              <>
                <CreateAndFilter onNewRequest={() => setIsModalOpen(true)} filterConfig={filterKeys} setAppliedFilter={setServiceFilter} appliedFilter={serviceFilter} />
                {(serviceData.length != 0) && (serviceFilter?.totalPages ?? 0) > 0 ? (
                  <>
                    <ListOFCards cardsConfig={cardsConfig} cardsData={serviceData} />
                    <CustomPagination handlePageChange={handlePageChange} currentPage={serviceFilter?.page} totalPages={serviceFilter?.totalPages ?? 0} />
                  </>) :
                  !loading && <EmptyRequest hideButton={true} title={'No requests found'} />}
              </>

            )
          }
        </div>
      ) : (
        <ServiceFormHandler
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          onBack={() => setSelectedService("")}
        />
      )}

      <NewServiceRequestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        setSelectedService={setSelectedService}
      />
      {loading && <Loader />}
    </Fragment>
  )
}

export default Service
