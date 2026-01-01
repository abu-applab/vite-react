import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { lazy, Suspense, type JSX } from 'react';
import { getLocalStorageItem } from './lib/utils';
import { useLanguageInit } from './hooks/useLanguageInit';
import Loader from './components/loader';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components with retry mechanism
const lazyWithRetry = (componentImport: () => Promise<any>) => {
  return lazy(() =>
    componentImport().catch((error) => {
      // If it's a chunk load error, reload the page
      if (error?.message?.includes('Loading chunk') || error?.message?.includes('Failed to fetch')) {
        // Add a flag to prevent infinite reloads
        const reloadKey = 'vite_chunk_reload';
        const lastReload = sessionStorage.getItem(reloadKey);
        const now = Date.now();
        
        // Only reload if we haven't reloaded in the last 5 seconds
        if (!lastReload || (now - parseInt(lastReload)) > 5000) {
          sessionStorage.setItem(reloadKey, now.toString());
          window.location.reload();
          return new Promise(() => {}); // Never resolve to prevent further execution
        }
      }
      throw error;
    })
  );
};

const Login = lazyWithRetry(() => import('@/screens/authentication/login'));
const SignUp = lazyWithRetry(() => import('@/screens/authentication/signUp'));
const ForgotPassword = lazyWithRetry(() => import('@/screens/authentication/forgotPassword'));
const ResetPassword = lazyWithRetry(() => import('@/screens/authentication/resetPassword'));
const OtpVerification = lazyWithRetry(() => import('@/screens/authentication/otpVerification'));
const AddCompany = lazyWithRetry(() => import('@/screens/addCompany'));
const LoginLayout = lazyWithRetry(() => import('@/layout/login-layout'));
const PortalLayout = lazyWithRetry(() => import('@/layout/portal-layout'));
const HubPage = lazyWithRetry(() => import('@/screens/hubPage'));
const Service = lazyWithRetry(() => import('@/screens/service'));
const ApplicationPage = lazyWithRetry(() => import('@/screens/application'));
const AllocatedPlotsPage = lazyWithRetry(() => import('@/screens/allocatedPlotsPage'));
const PlotDetailsScreen = lazyWithRetry(() => import('@/screens/plotDetailsScreen'));
const DirectoryScreen = lazyWithRetry(() => import('@/screens/directoryScreen'));
const ViolationPage = lazyWithRetry(() => import('@/screens/violationsScreen'));
const BotRequestAndReportsPage = lazyWithRetry(() => import('@/screens/botRequestAndReports'));
const PaymentScreen = lazyWithRetry(() => import('@/screens/paymentScreen'));
const Agreements = lazyWithRetry(() => import('@/screens/agreements'));
const MyProfile = lazyWithRetry(() => import('@/screens/myProfile'));
const Notifications = lazyWithRetry(() => import('@/screens/notifications'));
const CompanyProfile = lazyWithRetry(() => import('@/screens/companyProfile'));
const AddNewCompany = lazyWithRetry(() => import('@/screens/addNewCompany'));

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
              element: <BotRequestAndReportsPage />,
            },
            {
              path: ":form",
              element: <BotRequestAndReportsPage />,
            },
          ],
        },
        {
          path: "bot-reports",
          children: [
            {
              index: true,
              element: <BotRequestAndReportsPage />,
            },
            {
              path: ":form",
              element: <BotRequestAndReportsPage />,
            },
          ],
        },
        {
          path: "violations",
          children: [
            {
              index: true,
              element: <ViolationPage resetTrigger={true}/>,
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
        {
          path: "add-new-company",
          element: <AddNewCompany />,
        },
      ],
    },
  ]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;