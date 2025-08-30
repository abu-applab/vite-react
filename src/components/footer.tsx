import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import footerLogo from "../assets/images/footer-logo.svg"

export default function Footer() {
  return (
    <footer className="bg-[#8A7A52] text-white mt-[70px]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full flex items-center justify-center">
            <img src={footerLogo} alt="footer logo" />
          </div>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:opacity-75 transition">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" className="hover:opacity-75 transition">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="hover:opacity-75 transition">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:opacity-75 transition">
            <Youtube className="h-5 w-5" />
          </a>
          <a href="#" className="hover:opacity-75 transition">
            <Twitter className="h-5 w-5" />
          </a>
        </div>

        <div className="hidden md:block">
          <a href="#top" className="text-sm text-white hover:underline">
            (SCROLL UP)
          </a>
        </div>
      </div>

      <div className="bg-white text-gray-700 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-6 py-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms and Conditions</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Support Center</a>
        </div>
        <div className="text-center text-xs py-2 border-t border-gray-200">
          © Manateq Partners Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
