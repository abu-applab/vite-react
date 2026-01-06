import { useEffect } from "react";

export default function NASLogout() {
  useEffect(() => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/login";
  }, []);

  return <p>Logging out...</p>;
}
