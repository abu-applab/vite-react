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
  const config = getServiceFormConfig(selectedService);
  let newErrors: Record<string, string> = {};

  // --- Helper Functions ---
  const isEmpty = (val: any) => val === undefined || val === null || val === "";
  const isDigitsOnly = (val: string) => /^\d+$/.test(val);
  const hasSpecialChars = (val: string) => /[^A-Za-z0-9\u0600-\u06FF\s]/.test(val);
  const isArabic = (val: string) => /[\u0600-\u06FF]/.test(val);
  const isEnglish = (val: string) => /[A-Za-z]/.test(val);
  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValidPhone = (val: string) => /^\d{8}$/.test(val);
  const isValidPOBox = (val: string) => /^\d{5,8}$/.test(val);

  const validateTextLength = (field: any, value: string) => {
    if (field.max && value.length > field.max)
      return `Maximum ${field.max} characters allowed`;
    if (field.min && value.length < field.min)
      return `Minimum ${field.min} characters required`;
  };

  const validateDuration = (field: any, value: number) => {
    if (field.min && value < field.min || field.max && value > field.max)
      return `Duration must be between ${field.min} and ${field.max} months.`;
  };

  const validateCompanyName = (field: any, value: string) => {
    if (hasSpecialChars(value)) return "Special characters are not allowed.";
    if (field.label.includes("(EN)") && isArabic(value)) return "Must be English characters.";
    if (field.label.includes("(AR)") && isEnglish(value)) return "Must be Arabic characters.";
  };

  // --- Main Validation Loop ---
  config.sections.forEach(section => {
    section.fields?.forEach(field => {
      const value = formState[field.id]?.trim?.() || formState[field.id];

      // Required
      if (field.required && isEmpty(value)) {
        newErrors[field.id] = `${field.label} is required`;
        return;
      }

      // Service-specific rule
      if (selectedService === "certifiedCopyOfAgreement" && field.id === "comments" && isDigitsOnly(value)) {
        newErrors[field.id] = "This field cannot contain digits only.";
        return;
      }

      // Text / Textarea validations
      if (["text", "textarea"].includes(field.type) && value) {
        const err = validateTextLength(field, value);
        if (err) {
          newErrors[field.id] = err;
          return;
        }
      }

      // Duration check
      if (field.label === "Duration" && value) {
        const err = validateDuration(field, Number(value));
        if (err) newErrors[field.id] = err;
      }

      // Number validations
      if (field.type === "number" && value) {
        if (field.max && String(value).length > field.max)
          newErrors[field.id] = `Accepts up to ${field.max} digits only`;
      }

      // Company name
      if (field.label.includes("New Company Name") && value) {
        const err = validateCompanyName(field, value);
        if (err) newErrors[field.id] = err;
      }

      // Email / Phone / PO Box
      if (field.label === "New Email" && value && !isValidEmail(value))
        newErrors[field.id] = "Please enter a valid email address.";

      if (field.label === "New Phone" && value && !isValidPhone(value))
        newErrors[field.id] = "Must contain exactly 8 digits.";

      if (field.label === "New PO Box" && value && !isValidPOBox(value))
        newErrors[field.id] = "Must contain 5 to 8 digits.";
    });
  });

  setErrors(newErrors);
  console.log("formState:", formState);
  return Object.keys(newErrors).length === 0;
};

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