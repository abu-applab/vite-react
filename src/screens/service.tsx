import { API_SERVICES_ENDPOINTS } from "@/api/apiEndpoints"
import useNetworkRequest from "@/api/useNetworkRequest"
import DynamicForm from "@/components/dynamic-form"
import FormSubmitted from "@/components/formSubmitted"
import { NewServiceRequestModal, serviceOptions } from "@/components/service/new-service-request-modal"
import { RequestedService } from "@/components/service/requested-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getServiceFormConfig } from "@/lib/form-data"
import { CirclePlus, Search } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const requestedServicesData = [
  {
    id: "AP-IZ-LE-81686",
    plotNumber: "28368",
    serviceType: "Land Use Letter",
    submittedDate: "12-07-2025",
    status: "Approved",
  },
  {
    id: "AP-IZ-LE-81686",
    plotNumber: "28368",
    serviceType: "Land Transfer",
    submittedDate: "12-07-2025",
    status: "In progress",
  },
  {
    id: "AP-IZ-LE-81686",
    plotNumber: "28368",
    serviceType: "Sublease",
    submittedDate: "12-07-2025",
    status: "Rejected",
  },
  {
    id: "AP-IZ-LE-81686",
    plotNumber: "28368",
    serviceType: "Rental Relationship Request",
    submittedDate: "12-07-2025",
    status: "In progress",
  },
]

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const [requestedServices, setRequestedServices] = useState(requestedServicesData)
  const [formState, setFormState] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const networkRequest = useNetworkRequest()


  const handleInputChange = (fieldId: string, value: any) => {
    setFormState((prev) => ({ ...prev, [fieldId]: value }))
    setErrors((prev) => ({ ...prev, [fieldId]: "" }))
  }

  const validateForm = () => {
    const config = getServiceFormConfig(selectedService)
    let newErrors: Record<string, string> = {}
    config.sections.forEach((section) => {
      section.fields?.forEach((field) => {
        if (field.required && !formState[field.id]) {
          newErrors[field.id] = `${field.label} is required`
        }
        console.log('formState[field.id]: ', formState[field.id]);
        console.log('field.max: ', field.max);
        console.log('formState[field.id]: ', formState[field.id]?.length);
        if (field.max &&  field.max < formState[field.id]?.length) {
          newErrors[field.id] = `Maximum ${field.max} characters allowed`
        }
        if (formState[field.id] && field.min &&  field.min > formState[field.id]?.length) {
          newErrors[field.id] = `Minimum ${field.min} characters required`
        }
      })
    })
    setErrors(newErrors)
    console.log('formState: ', formState);
    return Object.keys(newErrors).length === 0
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (validateForm()) {
  //     const serviceTitle = serviceOptions.find((service) => service.key === selectedService)?.title ?? "Unknown Service"
  //     const newRequest = {
  //       id: "AP-IZ-LE-81686",
  //       plotNumber: "28368",
  //       serviceType: serviceTitle,
  //       submittedDate: "12-07-2025",
  //       status: "Approved",
  //     }
  //     setRequestedServices((prev) => [...prev, newRequest])
  //     setIsFormSubmitted(true)
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const apiConfig = (API_SERVICES_ENDPOINTS as Record<string, { url: string; method: string }>)[selectedService];

    if (!apiConfig) {
      console.error("No API endpoint found for:", selectedService);
      return;
    }

    try {
      const response = await networkRequest(apiConfig.url, {
        method: apiConfig.method as "POST",
        body: { /* form data here */ },
      });

      // Example of updating UI after API success
      const serviceTitle =
        serviceOptions.find((s) => s.key === selectedService)?.title ??
        "Unknown Service";

      const newRequest = {
        id: response?.id || "TEMP-ID",
        plotNumber: response?.plotNumber || "Unknown",
        serviceType: serviceTitle,
        submittedDate: new Date().toLocaleDateString(),
        status: response?.status || "Pending",
      };

      setRequestedServices((prev) => [...prev, newRequest]);
      setIsFormSubmitted(true)
      console.log("Service submitted successfully:", response);
    } catch (err: any) {
      console.error("API Error:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="mx-[80px] mt-10">
      <div>
        <h1 className="text-2xl mb-1">Service Request</h1>
        <div className="mb-6 text-base text-muted-foreground">
          <Link to="/portal">Al Noor Real Estate W.L.L</Link>
          <span className="mx-2">›</span>
          <span className="text-maroon-100">New Service Request</span>
        </div>
      </div>
      {(!selectedService || isModalOpen) ? (
        <>
          <div className="flex flex-row items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-maroon-100" />
              <Input placeholder="Search..." className="pl-10 bg-background" />
            </div>
            <div className="flex gap-2">
              <Button className="text-black bg-white hover:bg-gray-100" onClick={() => setIsModalOpen(true)}>
                <CirclePlus className="h-4 w-4 mr-2" />
                New Service Request
              </Button>
              <Select defaultValue="">
                <SelectTrigger className="w-48 bg-background">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="al-noor">Al Noor Real Estate W.L.L</SelectItem>
                  <SelectItem value="qatar-bank">Qatar International Islamic Bank</SelectItem>
                  <SelectItem value="mesaieed">Mesaieed Petrochemical Holding Company</SelectItem>
                  <SelectItem value="ezdan">Ezdan Holding Group</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32 bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {requestedServices.map((request, index) => (
              <RequestedService key={index} request={request} />
            ))}
          </div>
        </>
      )
        : <>
          {isFormSubmitted ? (
            <FormSubmitted onGoToRequest={() => setSelectedService("")} />
          ) : (
            <DynamicForm
              config={getServiceFormConfig(selectedService)}
              formData={formState}
              errors={errors}
              setErrors={setErrors}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              handlePerviousButton={() => setSelectedService("")}
            />
          )}
        </>
      }
      <NewServiceRequestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
      />
    </div>
  )
}

export default Service