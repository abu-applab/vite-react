import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalStorageItem } from './lib/utils';

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

// Constants
const SUPPORTED_LANGUAGES = ['en', 'ar'] as const;
const DEFAULT_LANGUAGE = 'en';
const AUTH_TOKEN_KEY = 'auth_txn';
const LANG_KEY = 'lang';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const defaultLanguage = localStorage.getItem(LANG_KEY) || DEFAULT_LANGUAGE;
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const firstSegment = pathSegments[0];

    const hasLanguage = SUPPORTED_LANGUAGES.includes(firstSegment as typeof SUPPORTED_LANGUAGES[number]);

    if (!hasLanguage) {
      window.location.pathname = `/${defaultLanguage}${currentPath}`;
    } else {
      i18n.changeLanguage(firstSegment);
      const html = document.documentElement;
      html.setAttribute("lang", firstSegment);
      html.setAttribute("dir", firstSegment === "ar" ? "rtl" : "ltr");
    }
  }, [i18n]);

  const getBaseName = (): string => {
    const currentPath = window.location.pathname;
    const pathLang = currentPath.split('/')[1];

    if (pathLang === 'ar') {
      localStorage.setItem(LANG_KEY, 'ar');
      return '/ar';
    }

    localStorage.setItem(LANG_KEY, 'en');
    return '/en';
  };

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const authToken = getLocalStorageItem(AUTH_TOKEN_KEY);
    return authToken ? children : <Navigate to="/login" replace />;
  };

  const AuthRedirect = ({ children }: { children: JSX.Element }) => {
    const authToken = getLocalStorageItem(AUTH_TOKEN_KEY);
    return authToken ? <Navigate to="/portal" replace /> : children;
  };

  return (
    <Router basename={getBaseName()}>
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
          <Route path="directory" element={<DirectoryScreen />} />
          <Route path="service" element={<Service />} />
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