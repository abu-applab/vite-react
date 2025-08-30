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


function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const defaultLanguage = localStorage.getItem("lang") || "en";
    console.log(' localStorage.getItem("lang"): ',  localStorage.getItem("lang"));
    const currentPath = window.location.pathname;
    const hasLanguage = currentPath.startsWith('/en') || currentPath.startsWith('/ar');
    if (!hasLanguage) {
      const newPath = `/${defaultLanguage}${currentPath}`
      window.location.pathname = newPath;
    }
     else {
      const pathLang = window.location.pathname.split('/')[1];
      i18n.changeLanguage(pathLang);
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
          <Route path="add-company" element={<AddCompany />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/portal" element={<PortalLayout />}>
          <Route index element={<HubPage />} />
          <Route path="/portal/application" element={<HubPage />} />
          <Route path="/portal/payments" element={<HubPage />} />
          <Route path="/portal/allocated-plots" element={<HubPage />} />
          <Route path="/portal/bot-reports" element={<HubPage />} />
          <Route path="/portal/violations" element={<HubPage />} />
          <Route path="/portal/directory" element={<HubPage />} />
          <Route path="/portal/service" element={<Service />} />
          {/* <Route path="add-company" element={<AddCompany />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
