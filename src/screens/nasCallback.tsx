import Loader from "@/components/loader";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function NASCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    const returnedState = params.get("state");
    const savedState = sessionStorage.getItem("nas_oauth_state");

    if (!code || returnedState !== savedState) {
      console.error("Invalid NAS login attempt");
      navigate("/login");
      return;
    }

    fetch("/api/auth/nas/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Auth failed");
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("MSDFToken", data.accessToken);
        localStorage.setItem("idTokenHint", data.idToken);

        navigate('/portal');
      })
      .catch(() => navigate("/login"));
  }, []);

  return <div>
    <Loader />
  </div>;
}
