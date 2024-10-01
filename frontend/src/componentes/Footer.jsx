import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  const socialLinks = [
    { href: "#", icon: <FaGithub className="w-6 h-6" aria-label="Github" /> },
    { href: "#", icon: <BsYoutube className="w-6 h-6" aria-label="YouTube" /> },
    { href: "#", icon: <FaLinkedin className="w-6 h-6" aria-label="LinkedIn" /> },
  ];

  return (
    <footer className=''>
      <div className="border-y-2 px-5 md:px-16">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-44 py-10'>
          {["COMPANY", "HELP CENTER", "LEGAL"].map((section, idx) => (
            <ul key={idx} className='text-sm space-y-2'>
              <li className='font-semibold text-base text-gray-700'>{section}</li>
              {section === "COMPANY" && (
                <>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">About</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Careers</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Blog</a></li>
                </>
              )}
              {section === "HELP CENTER" && (
                <>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Discord Server</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Twitter</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Facebook</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Contact Us</a></li>
                </>
              )}
              {section === "LEGAL" && (
                <>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Licensing</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Terms & Conditions</a></li>
                </>
              )}
              
            </ul>
          ))}
        </div>
      </div>

      <div className='flex w-full justify-around py-5'>
        <span className="font-semibold text-blue-500 text-xl">BreezBlogs</span>
        <div className="hidden md:block text-gray-400 text-sm">
          <p>&copy; 2024 DhiWise PVT. LTD. All rights reserved</p>
        </div>
        <div className="flex space-x-6">
          {socialLinks.map((link, idx) => (
            <a key={idx} href={link.href}>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
