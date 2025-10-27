import React, { useEffect } from "react";
import manateqLogo from "../assets/images/manateq-login-logo.svg";

const Loader: React.FC = () => {
  // Disable background scroll when loader is visible
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // Prevent scroll
    return () => {
      document.body.style.overflow = originalOverflow; // Restore on unmount
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/40 z-[9999]">
      {/* Spinner */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full animate-spin">
          <div
            className="w-full h-full rounded-full p-3"
            style={{
              background: `conic-gradient(from 0deg, transparent 0%, #D9D9D9 30%, #880E27 100%)`,
            }}
          >
            <div className="w-full h-full rounded-full bg-stone-50"></div>
          </div>
        </div>

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src={manateqLogo}
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
