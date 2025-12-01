// /network/apiEndpoints.js

export const API_ENDPOINTS = {
  getPlots: '/Proxy/WebApp/getPlots',
  getSignatories: '/Proxy/WebApp/getSignatories',
  getCompanies: '/Proxy/WebApp/getCompanies',
  getClusters: '/Proxy/WebApp/getClusters',
  getLocations: '/Proxy/WebApp/getLocations',
  getHSCodes: '/Proxy/WebApp/getHSCodes',
  createApplication: '/Proxy/WebApp/createApplication',
  updateApplication: '/Proxy/WebApp/updateApplication',
  deleteApplication: '/Proxy/WebApp/deleteApplication',
  submitApplication: '/Proxy/WebApp/submitApplication',
  getISICSections: '/Proxy/WebApp/getISICSections',
  getISICCodesBySectionId: '/Proxy/WebApp/getISICCodesBySectionId',
  getAllServiceRequests: "/Proxy/WebApp/getAllServiceRequests",
  getApplicationsList: '/Proxy/WebApp/getApplicationsList',
  getApplication: '/Proxy/WebApp/getApplication',
  getFindingsList: "/Proxy/WebApp/getFindingsListFromOP",
  GetFindingFromOP: "/Proxy/WebApp/GetFindingFromOP",
  updateFindingDetails: "/Proxy/WebApp/updateFindingDetails",
  logIn: "/RegistrationAndLogin/login",
  logOut: "/RegistrationAndLogin/logout",
  signUp: "/RegistrationAndLogin/signup",
  validateApi: "/RegistrationAndLogin/validate-otp",
  resendOtp: "/RegistrationAndLogin/resend-otp",

  forgotpassword: "/RegistrationAndLogin/requestPasswordReset",
  resetPassword: "/Proxy/RegistrationAndLogin/resetPassword",
}

export const API_SERVICES_ENDPOINTS = {
  rentalRelationship: {
    url: "/Proxy/WebApp/createRentalRelationRequest",
    method: "POST",
    contentType: "multipart",
  },
  landTransfer: {
    url: "/Proxy/WebApp/createLandTransfer",
    method: "POST",
    contentType: "multipart",
  },
  certifiedCopyOfAgreement: {
    url: "/Proxy/WebApp/createCertifiedCopyOfAgreementRequest",
    method: "POST",
    contentType: "json",
  },
  demarcationLetter: {
    url: "/Proxy/WebApp/createDemarcationLetterRequest",
    method: "POST",
    contentType: "json",
  },
  complaint: {
    url: "/Proxy/WebApp/createComplaintRequest",
    method: "POST",
    contentType: "multipart",
  },
  technicalQueries: {
    url: "/Proxy/WebApp/createTechnicalQueriesRequest",
    method: "POST",
    contentType: "json",
  },
  kahramaa: {
    url: "/Proxy/WebApp/createKahramaRequest",
    method: "POST",
    contentType: "json",
  },
  updateContactDetails: {
    url: "/Proxy/WebApp/createUpdateContactDetailRequest",
    method: "POST",
    contentType: "multipart",
  },
  updateCompanyInformation: {
    urls: [
      "/Proxy/WebApp/createBasicCompanyUpdateRequest",
      "/Proxy/WebApp/updateCompanyUpdateRequestDetails"
    ],
    method: "POST",
    contentType: "multipart",
  },
};
