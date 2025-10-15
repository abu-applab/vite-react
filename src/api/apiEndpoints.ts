// /network/apiEndpoints.js

export const API_SERVICES_ENDPOINTS = {
    rentalRelationship: {
      url: "/api/WebApp/createRentalRelationRequest",
      method: "POST",
      contentType: "multipart", 
    },
    landTransfer: {
      url: "/api/WebApp/createLandTransfer",
      method: "POST",
      contentType: "multipart", 
    },
    certifiedCopyOfAgreement: {
      url: "/api/WebApp/createCertifiedCopyOfAgreementRequest",
      method: "POST",
      contentType: "json", 
    },
    demarcationLetter: {
      url: "/api/WebApp/createDemarcationLetterRequest",
      method: "POST",
      contentType: "multipart", 
    },
    complaint: {
      url: "/api/WebApp/createComplaintRequest",
      method: "POST",
      contentType: "json", 
    },
    technicalQueries: {
        url: "/api/WebApp/createTechnicalQueriesRequest",
        method: "POST",
        contentType: "json", 
    },
    kahramaa: {
        url: "/api/WebApp/createKahramaRequest",
        method: "POST",
        contentType: "json", 
    },
    updateContactDetail: {
      url: "/api/WebApp/createUpdateContactDetailRequest",
      method: "POST",
      contentType: "multipart", 
    },
    updateCompanyInformation: {
      url: "/api/WebApp/updateCompanyUpdateRequestDetails",
      method: "POST",
      contentType: "multipart", 
    },
  };
  