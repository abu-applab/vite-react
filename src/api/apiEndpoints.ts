// /network/apiEndpoints.js

export const API_ENDPOINTS = {
   getPlots: '/getPlots',
   getSignatories: '/getSignatories',
   getCompanies: '/getCompanies',
   getClusters: '/getClusters',
   getLocations: '/getLocations',
   getHSCodes: '/getHSCodes',
   createApplication: '/createApplication',
   updateApplication: '/updateApplication',
   deleteApplication: '/deleteApplication',
   submitApplication: '/submitApplication',
   getISICSections: 'getISICSections',
   getISICCodesBySectionId: '/getISICCodesBySectionId',
   getAllServiceRequests: "/getAllServiceRequests"
}

export const API_SERVICES_ENDPOINTS = {
    rentalRelationship: {
      url: "/createRentalRelationRequest",
      method: "POST",
      contentType: "multipart", 
    },
    landTransfer: {
      url: "/createLandTransfer",
      method: "POST",
      contentType: "multipart", 
    },
    certifiedCopyOfAgreement: {
      url: "/createCertifiedCopyOfAgreementRequest",
      method: "POST",
      contentType: "json", 
    },
    demarcationLetter: {
      url: "/createDemarcationLetterRequest",
      method: "POST",
      contentType: "json", 
    },
    complaint: {
      url: "/createComplaintRequest",
      method: "POST",
      contentType: "multipart", 
    },
    technicalQueries: {
        url: "/createTechnicalQueriesRequest",
        method: "POST",
        contentType: "json", 
    },
    kahramaa: {
        url: "/createKahramaRequest",
        method: "POST",
        contentType: "json", 
    },
    updateContactDetails: {
      url: "/createUpdateContactDetailRequest",
      method: "POST",
      contentType: "multipart", 
    },
    updateCompanyInformation: {
      urls: [
        "/createBasicCompanyUpdateRequest", 
        "/updateCompanyUpdateRequestDetails"
      ],
      method: "POST",
      contentType: "multipart", 
    },
};
