import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { lazy, Suspense, type JSX } from 'react';
import { getLocalStorageItem } from './lib/utils';
import { useLanguageInit } from './hooks/useLanguageInit';
import Loader from './components/loader'; // Add a loader component if you don't have one

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
  useLanguageInit();

    // Helper components for auth
    const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
      const authToken = getLocalStorageItem(AUTH_TOKEN_KEY);
      return authToken ? children : <Navigate to="/login" replace />;
    };
  
    const AuthRedirect = ({ children }: { children: JSX.Element }) => {
      const authToken = getLocalStorageItem(AUTH_TOKEN_KEY);
      return authToken ? <Navigate to="/portal" replace /> : children;
    };
  

  // Create router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginLayout />,
      children: [
        {
          index: true,
          element: <AuthRedirect><Login /></AuthRedirect>,
        },
        {
          path: "login",
          element: <AuthRedirect><Login /></AuthRedirect>,
        },
        {
          path: "signup",
          element: <AuthRedirect><SignUp /></AuthRedirect>,
        },
        {
          path: "forgotpassword",
          element: <AuthRedirect><ForgotPassword /></AuthRedirect>,
        },
        {
          path: "resetpassword",
          element: <AuthRedirect><ResetPassword /></AuthRedirect>,
        },
        {
          path: "otpverification",
          element: <AuthRedirect><OtpVerification /></AuthRedirect>,
        },
        {
          path: "add-company",
          element: <AuthRedirect><AddCompany /></AuthRedirect>,
        },
      ],
    },
    {
      path: "/portal",
      element: <ProtectedRoute><PortalLayout /></ProtectedRoute>,
      children: [
        {
          index: true,
          element: <HubPage />,
        },
        {
          path: "application",
          children: [
            {
              index: true,
              element: <ApplicationPage />,
            },
            {
              path: ":id",
              element: <ApplicationPage />,
            },
          ],
        },
        {
          path: "payments",
          element: <PaymentScreen />,
        },
        {
          path: "allocated-plots",
          children: [
            {
              index: true,
              element: <AllocatedPlotsPage />,
            },
            {
              path: ":id",
              element: <PlotDetailsScreen />,
            },
          ],
        },
        {
          path: "agreements",
          element: <Agreements />,
        },
        {
          path: "bot-requests",
          children: [
            {
              index: true,
              element: <BotRequestAndReportsPage selectedBotType="request" />,
            },
            {
              path: ":form",
              element: <BotRequestAndReportsPage selectedBotType="request" />,
            },
          ],
        },
        {
          path: "bot-reports",
          children: [
            {
              index: true,
              element: <BotRequestAndReportsPage selectedBotType="reports" />,
            },
            {
              path: ":form",
              element: <BotRequestAndReportsPage selectedBotType="reports" />,
            },
          ],
        },
        {
          path: "violations",
          children: [
            {
              index: true,
              element: <ViolationPage />,
            },
            {
              path: ":id",
              element: <ViolationPage />,
            },
          ],
        },
        {
          path: "directory",
          element: <DirectoryScreen />,
        },
        {
          path: "service",
          children: [
            {
              index: true,
              element: <Service resetTrigger={true}/>,
            },
            {
              path: ":id",
              element: <Service />,
            },
          ],
        },
        {
          path: "my-profile",
          element: <MyProfile />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "company-profile",
          element: <CompanyProfile />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;