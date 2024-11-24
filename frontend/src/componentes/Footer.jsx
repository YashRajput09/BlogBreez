import React from 'react';
import {Link} from 'react-router-dom'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { CgInfinity } from "react-icons/cg";


const Footer = () => {
  const socialLinks = [
    { href: "https://github.com/YashRajput09", icon: <FaGithub className="w-6 h-6" aria-label="Github" /> },
    { href: "#", icon: <BsYoutube className="w-6 h-6" aria-label="YouTube" /> },
    { href: "https://www.linkedin.com/in/yashvardhan-rajput-134305276/", icon: <FaLinkedin className="w-6 h-6" aria-label="LinkedIn" /> },
  ];

  return (
    <footer className=''>
      <div className="border-y-2 px-5 md:px-16">
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-44 py-10'>
          {["COMPANY", "HELP CENTER", "LEGAL"].map((section, idx) => (
            <ul key={idx} className='text-sm space-y-2'>
              <li className='font-semibold text-base text-gray-700'>{section}</li>
              {section === "COMPANY" && (
                <>
                  <li><a href="/about" className="text-gray-500 hover:text-gray-700">About</a></li>
                  <li><a href="/careers" className="text-gray-500 hover:text-gray-700">Careers</a></li>
                  <li><a href="blogs" className="text-gray-500 hover:text-gray-700">Blog</a></li>
                </>
              )}
              {section === "HELP CENTER" && (
                <>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Discord Server</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Twitter</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-gray-700">Facebook</a></li>
                  <li><a href="/contact" className="text-gray-500 hover:text-gray-700">Contact Us</a></li>
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
        <Link to={'/'} className="flex font-semibold text-blue-500 text-xl gap-1">
        <CgInfinity className="text-3xl" /> 
        BreezBlogs</Link>
        <div className="hidden md:block text-gray-400 text-sm">
          <p>&copy; 2024 BreezBlogs PVT. LTD. All rights reserved</p>
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
