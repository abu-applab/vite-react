import { Link } from "react-router-dom"
import { useState } from "react"
import { ServiceHeader } from "@/components/service/serviceRequestPage/service-header"
import { RequestedServiceList } from "@/components/service/serviceRequestPage/requested-service-list"
import { ServiceFormHandler } from "@/components/service/createNewRequest/service-form-handler"
import { NewServiceRequestModal } from "@/components/service/serviceRequestPage/new-service-request-modal"
import { EmptyRequest } from "@/components/service/serviceRequestPage/empty-request"

const requestedServicesData = [
  {
    id: "AP-IZ-LE-81686",
    plotNumber: "28368",
    serviceType: "Land Use Letter",
    submittedDate: "12-07-2025",
    status: "Approved",
  },
  {
    id: "AP-IZ-LE-81687",
    plotNumber: "28368",
    serviceType: "Land Transfer",
    submittedDate: "12-07-2025",
    status: "In progress",
  },
  // {
  //   id: "AP-IZ-LE-81686",
  //   plotNumber: "28368",
  //   serviceType: "Sublease",
  //   submittedDate: "12-07-2025",
  //   status: "Rejected",
  // },
  // {
  //   id: "AP-IZ-LE-81686",
  //   plotNumber: "28368",
  //   serviceType: "Rental Relationship Request",
  //   submittedDate: "12-07-2025",
  //   status: "In progress",
  // },
]

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const [requestedServices, setRequestedServices] = useState(requestedServicesData)

  const handleServiceAdded = (service: any) => {
    setRequestedServices((prev) => [...prev, service])
  }

  return (
    <div className="md:mx-[80px] md:mt-10 m-4">
      <div className="hidden md:block">
        <h1 className="text-2xl mb-1">Service Request</h1>
        <div className="mb-6 text-base text-muted-foreground">
          <Link to="/portal">Al Noor Real Estate W.L.L</Link>
          <span className="mx-2">›</span>
          <span className="text-maroon-100">New Service Request</span>
        </div>
      </div>

      {!selectedService ? (
        <div>
          { requestedServicesData.length != 0 ?
            <>
              <ServiceHeader onNewRequest={() => setIsModalOpen(true)} />
              <RequestedServiceList services={requestedServices} />
            </> :
            <EmptyRequest onNewRequest={() => setIsModalOpen(true)}/>
          }
        </div>
      ) : (
        <ServiceFormHandler
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          onBack={() => setSelectedService("")}
          onServiceAdded={handleServiceAdded}
        />
      )}

      <NewServiceRequestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        setSelectedService={setSelectedService}
      />
    </div>
  )
}

export default Service
