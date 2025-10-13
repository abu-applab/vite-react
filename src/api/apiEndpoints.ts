// /network/apiEndpoints.js

export const API_SERVICES_ENDPOINTS = {
    rentalRelationship: {
      url: "/api/WebApp/createRentalRelationRequest",
      method: "POST",
    },
    landTransfer: {
      url: "/api/WebApp/land-transfer",
      method: "POST",
    },
    certifiedCopyOfAgreement: {
      url: "/api/WebApp/createCertifiedCopyOfAgreementRequest",
      method: "POST",
    },
    demarcationLetter: {
      url: "/api/WebApp/createDemarcationLetterRequest",
      method: "POST",
    },
    complaint: {
      url: "/api/WebApp/createComplaintRequest",
      method: "POST",
    },
    technicalQueries: {
        url: "/api/WebApp/createTechnicalQueriesRequest",
        method: "POST",
    },
    kahramaa: {
        url: "/api/WebApp/createKahramaRequest",
        method: "POST",
    },
    updateContactDetail: {
      url: "/api/WebApp/updateContactDetail",
      method: "POST",
    },
    updateCompanyInformation: {
      url: "/api/WebApp/updateCompanyInformation",
      method: "POST",
    },
  };
  