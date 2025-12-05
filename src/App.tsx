import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, type JSX } from 'react';
import { getLocalStorageItem } from './lib/utils';
import { useLanguageInit } from './hooks/useLanguageInit';

// Lazy load components
const Login = lazy(() => import('./screens/authentication/login'));
const SignUp = lazy(() => import('./screens/authentication/signUp'));
const ForgotPassword = lazy(() => import('./screens/authentication/forgotPassword'));
const ResetPassword = lazy(() => import('./screens/authentication/resetPassword'));
const OtpVerification = lazy(() => import('./screens/authentication/otpVerification'));
const AddCompany = lazy(() => import('./screens/addCompany'));
const LoginLayout = lazy(() => import('./layout/login-layout'));
const PortalLayout = lazy(() => import('./layout/portal-layout'));
const HubPage = lazy(() => import('./screens/hubPage'));
const Service = lazy(() => import('./screens/service'));
const ApplicationPage = lazy(() => import('./screens/application'));
const AllocatedPlotsPage = lazy(() => import('./screens/allocatedPlotsPage'));
const PlotDetailsScreen = lazy(() => import('./screens/plotDetailsScreen'));
const DirectoryScreen = lazy(() => import('./screens/directoryScreen'));
const ViolationPage = lazy(() => import('./screens/violationsScreen'));
const BotRequestAndReportsPage = lazy(() => import('./screens/botRequestAndReportsPage'));
const PaymentScreen = lazy(() => import('./screens/paymentScreen'));
const Agreements = lazy(() => import('./screens/agreements'));
const MyProfile = lazy(() => import('./screens/myProfile'));
const Notifications = lazy(() => import('./screens/notifications'));
const CompanyProfile = lazy(() => import('./screens/companyProfile'));

const AUTH_TOKEN_KEY = 'auth_txn';

function App() {

  useLanguageInit()

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const authToken = getLocalStorageItem(AUTH_TOKEN_KEY);
    return authToken ? children : <Navigate to="/login" replace />;
  };

  const AuthRedirect = ({ children }: { children: JSX.Element }) => {
    const authToken = getLocalStorageItem(AUTH_TOKEN_KEY);
    return authToken ? <Navigate to="/portal" replace /> : children;
  };

  return (
    <Router>
      {/* <Suspense fallback={<div></div>}> */}
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<AuthRedirect><Login /></AuthRedirect>} />
          <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
          <Route path="/signup" element={<AuthRedirect><SignUp /></AuthRedirect>} />
          <Route path="/forgotpassword" element={<AuthRedirect><ForgotPassword /></AuthRedirect>} />
          <Route path="/resetpassword" element={<AuthRedirect><ResetPassword /></AuthRedirect>} />
          <Route path="/otpverification" element={<AuthRedirect><OtpVerification /></AuthRedirect>} />
          <Route path="/add-company" element={<AuthRedirect><AddCompany /></AuthRedirect>} />
        </Route>

        <Route path="/portal" element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
          <Route index element={<HubPage />} />
          <Route path="application" element={<ApplicationPage />} />
          <Route path="application/:id" element={<ApplicationPage />} />
          <Route path="payments" element={<PaymentScreen />} />
          <Route path="allocated-plots" element={<AllocatedPlotsPage />} />
          <Route path="agreements" element={<Agreements />} />
          <Route path="allocated-plots/:id" element={<PlotDetailsScreen />} />
          <Route path="bot-requests" element={<BotRequestAndReportsPage selectedBotType="request" />} />
          <Route path="bot-reports" element={<BotRequestAndReportsPage selectedBotType="reports" />} />
          <Route path="bot-requests/:form" element={<BotRequestAndReportsPage selectedBotType="request" />} />
          <Route path="bot-reports/:form" element={<BotRequestAndReportsPage selectedBotType="reports" />} />
          <Route path="violations" element={<ViolationPage />} />
          <Route path="violations/:id" element={<ViolationPage />} />
          <Route path="directory" element={<DirectoryScreen />} />
          <Route path="service" element={<Service />} />
          <Route path="service/:id" element={<Service />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="company-profile" element={<CompanyProfile />} />
        </Route>
      </Routes>
      {/* </Suspense> */}
    </Router>
  );
}

export default App;