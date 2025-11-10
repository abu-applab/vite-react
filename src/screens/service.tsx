import { Fragment, useEffect, useState } from "react"
// import { ServiceHeader } from "@/components/service/serviceRequestPage/service-header"
import { ServiceFormHandler } from "@/components/service/createNewRequest/service-form-handler"
import { NewServiceRequestModal } from "@/components/service/serviceRequestPage/new-service-request-modal"
import { EmptyRequest } from "@/components/service/serviceRequestPage/empty-request"
import PageHeader from "@/components/pageHeader"
import { CreateAndFilter } from "@/components/createAndFilter"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import useNetworkRequest from "@/api/useNetworkRequest"
import { API_ENDPOINTS } from "@/api/apiEndpoints"
import { useApp } from "@/context/AppContext"
import ListOFCards from "@/components/listOfcards"
import { Eye, MessageSquareDot } from "lucide-react"
import Loader from "@/components/loader"

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
          label: "Total Plots",
          key: "totalPlots",
      },
      {
          label: "Main Contact",
          key: "mainConatact",
      },
      {
          label: "Phone Number",
          key: "phone",
      },
      {
          label: "Mail",
          key: "email",
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
  const { serviceFilter, setServiceFilter } = useApp();
  const networkRequest = useNetworkRequest();

  const currentPage = serviceFilter?.page ?? 1
  const totalPages = Math.ceil(totalRecords / PAGE_SIZE)

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      try {
        const params: Params = {
          Page: serviceFilter?.page ?? 1,
          PageSize: PAGE_SIZE,
          AccountId: '314cd4d3-097c-ef11-ac20-000d3a246e53'
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
    fetchRequests()
  }, [serviceFilter])

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
              <CreateAndFilter onNewRequest={() => setIsModalOpen(true)} filterConfig={filterKeys} />
              {/* <RequestedServiceList services={requestedServices} /> */}
              <ListOFCards cardsConfig={cardsConfig} cardsData={serviceData} />
              {totalPages > 1 && (
                <Pagination className="mt-6 flex justify-center">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                      />
                    </PaginationItem>
                    {(() => {
                      const pagesToShow: (number | string)[] = []
                      const maxVisible = 5 
                      if (totalPages <= maxVisible) {
                        for (let i = 1; i <= totalPages; i++) pagesToShow.push(i)
                      } else {
                        pagesToShow.push(1)
                        if (currentPage > 3) pagesToShow.push("...")
                        const start = Math.max(2, currentPage - 1)
                        const end = Math.min(totalPages - 1, currentPage + 1)
                        for (let i = start; i <= end; i++) pagesToShow.push(i)
                        if (currentPage < totalPages - 2) pagesToShow.push("...")
                        pagesToShow.push(totalPages)
                      }
                      return pagesToShow.map((page, idx) => (
                        <PaginationItem key={idx}>
                          {page === "..." ? (
                            <span className="px-2 text-gray-400">…</span>
                          ) : (
                            <PaginationLink
                              onClick={() => handlePageChange(Number(page))}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))
                    })()}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
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
