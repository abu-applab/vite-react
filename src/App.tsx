import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/login';
import LoginLayout from './layout/login-layout';
import AddCompany from './screens/addCompany';
import PortalLayout from './layout/portal-layout';
import HubPage from './screens/hubPage';
import Service from './screens/service';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationPage from './screens/application';
import AllocatedPlotsPage from './screens/allocatedPlotsPage';
import PlotDetailsScreen from './screens/plotDetailsScreen';
import DirectoryScreen from './screens/directoryScreen';
import ViolationPage from './screens/violationsScreen';
import BotRequestAndReportsPage from './screens/botRequestAndReportsPage';
import PaymentScreen from './screens/paymentScreen';
import Agreements from './screens/agreements';
import MyProfile from './screens/myProfile';
import Notifications from './screens/notifications';
// import Settings from './screens/settings'
import CompanyProfile from './screens/companyProfile';

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const defaultLanguage = localStorage.getItem("lang") || "en";
    const currentPath = window.location.pathname;
    const hasLanguage = currentPath.startsWith('/en') || currentPath.startsWith('/ar');
    if (!hasLanguage) {
      const newPath = `/${defaultLanguage}${currentPath}`
      window.location.pathname = newPath;
    }
     else {
      const pathLang = window.location.pathname.split('/')[1];
      i18n.changeLanguage(pathLang);
      const html = document.documentElement;
      html.setAttribute("lang", pathLang);
      html.setAttribute("dir", pathLang === "ar" ? "rtl" : "ltr");
    }
  }, [])

  const getBaseName = () => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/ar")) {
      localStorage.setItem("lang", "ar")
      return "/ar";
    }
    localStorage.setItem("lang", "en")
    return "/en";
  };

  return (
    <Router basename={getBaseName()}>
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path="/add-company" element={<AddCompany />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<HubPage />} />
          <Route path="/portal/application" element={<ApplicationPage />} />
          <Route path="/portal/application/:id" element={<ApplicationPage />} />
          <Route path="/portal/payments" element={<PaymentScreen />} />
          <Route path="/portal/allocated-plots" element={<AllocatedPlotsPage />} />
          <Route path="/portal/agreements" element={<Agreements />} />
          <Route path="/portal/allocated-plots/:id" element={<PlotDetailsScreen />} />
          <Route path="/portal/bot-requests" element={<BotRequestAndReportsPage selectedBotType="request" />} />
          <Route path="/portal/bot-reports/" element={<BotRequestAndReportsPage selectedBotType="reports" />} />
          <Route path="/portal/bot-requests/:form" element={<BotRequestAndReportsPage selectedBotType="request" />} />
          <Route path="/portal/bot-reports/:form" element={<BotRequestAndReportsPage selectedBotType="reports" />} />
          <Route path="/portal/violations" element={<ViolationPage />} />
          <Route path="/portal/directory" element={<DirectoryScreen />} />
          <Route path="/portal/service" element={<Service />} />
          <Route path="/portal/my-profile" element={<MyProfile />} />
          <Route path="/portal/notifications" element={<Notifications />} />
          {/* <Route path="/portal/settings" element={<Settings />} /> */}
          <Route path="/portal/company-profile" element={<CompanyProfile />} />
          {/* <Route path="add-company" element={<AddCompany />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
