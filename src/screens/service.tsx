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

interface Params {
  Page: number
  PageSize: number
  AccountId: string
  Status?: string
}

const header = {
  title: "Service Request",
  homeLink: 'companyName',
  contentLinks: ['All Service Requests', 'New Service Request'],
}

const filterKeys = {
  title: 'Service Request',
  createNewRequest: 'New Service Request',
  filterTypes: [
    { id: 'approved', value: 'Approved' },
    { id: 'in-progress', value: 'In Progress' },
    { id: 'pending', value: 'Pending Request Fees' },
    { id: 'cancelled', value: 'Cancelled' },
    { id: 'rejected', value: 'Rejected' },
    { id: 'pendingWork', value: 'Pending Work' },
    { id: 'pendingInvestorUpdate', value: 'Pending Investor Update' },
  ]
}

const cardsConfig = {
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
      onClick: () => {
        console.log("View clicked for:")
      },
    },
  ]  
}

const PAGE_SIZE = 4

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)
  const [serviceData, setServiceData] = useState<any[]>([])
  const { serviceFilter, setServiceFilter, selectedCompany } = useApp();
  const networkRequest = useNetworkRequest();

  const currentPage = serviceFilter?.page ?? 1
  const totalPages = Math.ceil(totalRecords / PAGE_SIZE)

  useEffect(() => {
    const fetchRequests = async () => {
      console.log('selectedCompany?.accountID: ', selectedCompany?.accountID);
      setLoading(true)
      try {
        const params: Params = {
          Page: serviceFilter?.page ?? 1,
          PageSize: PAGE_SIZE,
          AccountId: selectedCompany?.accountID ?? ''
        }
        if (serviceFilter?.status) params["Status"] = serviceFilter?.status

        const response = await networkRequest(API_ENDPOINTS.getAllServiceRequests, { method: "GET", body: params })

        if (response?.success) {
          setServiceData(response.data.data)
          setTotalRecords(response.data.totalRecords)
        }
      } catch (error) {
        console.error("Error fetching service requests:", error)
      } finally {
        setLoading(false)
      }
    }
    if(selectedCompany?.accountID && !selectedService) {
      fetchRequests()
    }
  }, [serviceFilter, selectedCompany?.accountID, selectedService])

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setServiceFilter((prev: any) => ({
        ...prev,
        page: newPage,
      }))
    }
  }


  return (
    <Fragment>
      <PageHeader header={header} />
      {!selectedService ? (
        <div>
          {(serviceData.length != 0) ?
            <>
              <CreateAndFilter onNewRequest={() => setIsModalOpen(true)} filterConfig={filterKeys} setAppliedFilter={setServiceFilter} appliedFilter={serviceFilter} />
              {/* <RequestedServiceList services={requestedServices} /> */}
              <ListOFCards cardsConfig={cardsConfig} cardsData={serviceData} />
              {totalPages > 1 && (
                <CustomPagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
              )}

            </> :
            (!loading && <EmptyRequest onNewRequest={() => setIsModalOpen(true)} />)
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
