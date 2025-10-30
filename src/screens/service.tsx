import { Fragment, useState } from "react"
import { ServiceHeader } from "@/components/service/serviceRequestPage/service-header"
import { RequestedServiceList } from "@/components/service/serviceRequestPage/requested-service-list"
import { ServiceFormHandler } from "@/components/service/createNewRequest/service-form-handler"
import { NewServiceRequestModal } from "@/components/service/serviceRequestPage/new-service-request-modal"
import { EmptyRequest } from "@/components/service/serviceRequestPage/empty-request"
import PageHeader from "@/components/pageHeader"

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
]

const header = {
  title: "Service Request",
  homeLink: 'companyName',
  contentLinks: ['All Service Requests', 'New Service Request'],
}

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const [requestedServices, setRequestedServices] = useState(requestedServicesData)

  const handleServiceAdded = (service: any) => {
    setRequestedServices((prev) => [...prev, service])
  }

  return ( 
    <Fragment>
      <PageHeader header={header} />
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
    </Fragment>
  )
}

export default Service
