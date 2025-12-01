// /network/apiEndpoints.js

export const API_ENDPOINTS = {
  getPlots: '/WebApp/getPlots',
  getSignatories: '/WebApp/getSignatories',
  getCompanies: '/WebApp/getCompanies',
  getClusters: '/WebApp/getClusters',
  getLocations: '/WebApp/getLocations',
  getHSCodes: '/WebApp/getHSCodes',
  createApplication: '/WebApp/createApplication',
  updateApplication: '/WebApp/updateApplication',
  deleteApplication: '/WebApp/deleteApplication',
  submitApplication: '/WebApp/submitApplication',
  getISICSections: '/WebApp/getISICSections',
  getISICCodesBySectionId: '/WebApp/getISICCodesBySectionId',
  getAllServiceRequests: "/WebApp/getAllServiceRequests",
  getApplicationsList: '/WebApp/getApplicationsList',
  getApplication: '/WebApp/getApplication',
  getFindingsList: "/WebApp/getFindingsListFromOP",
  GetFindingFromOP: "/WebApp/GetFindingFromOP",
  updateFindingDetails: "/WebApp/updateFindingDetails",
  logIn: "/RegistrationAndLogin/login",
  logOut: "/RegistrationAndLogin/logout",
  signUp: "/RegistrationAndLogin/signup",
  validateApi: "/RegistrationAndLogin/validate-otp",
  resendOtp: "/RegistrationAndLogin/resend-otp",

  forgotpassword: "/RegistrationAndLogin/requestPasswordReset",
  resetPassword: "/RegistrationAndLogin/resetPassword",
}

export const API_SERVICES_ENDPOINTS = {
  rentalRelationship: {
    url: "/WebApp/createRentalRelationRequest",
    method: "POST",
    contentType: "multipart",
  },
  landTransfer: {
    url: "/WebApp/createLandTransfer",
    method: "POST",
    contentType: "multipart",
  },
  certifiedCopyOfAgreement: {
    url: "/WebApp/createCertifiedCopyOfAgreementRequest",
    method: "POST",
    contentType: "json",
  },
  demarcationLetter: {
    url: "/WebApp/createDemarcationLetterRequest",
    method: "POST",
    contentType: "json",
  },
  complaint: {
    url: "/WebApp/createComplaintRequest",
    method: "POST",
    contentType: "multipart",
  },
  technicalQueries: {
    url: "/WebApp/createTechnicalQueriesRequest",
    method: "POST",
    contentType: "json",
  },
  kahramaa: {
    url: "/WebApp/createKahramaRequest",
    method: "POST",
    contentType: "json",
  },
  updateContactDetails: {
    url: "/WebApp/createUpdateContactDetailRequest",
    method: "POST",
    contentType: "multipart",
  },
  updateCompanyInformation: {
    urls: [
      "/WebApp/createBasicCompanyUpdateRequest",
      "/WebApp/updateCompanyUpdateRequestDetails"
    ],
    method: "POST",
    contentType: "multipart",
  },
};
