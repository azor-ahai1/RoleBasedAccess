import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: <FaLinkedin /> },
    { name: 'Twitter', url: '#', icon: <FaTwitter /> },
    { name: 'GitHub', url: '#', icon: <FaGithub /> }
  ];

  return (
    <footer className="bg-gradient-primary text-white py-8 border-t border-black">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-4">VRV Security</h3>
          <p className="text-sm">
            Empowering organizations with cutting-edge cybersecurity solutions.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {['Home', 'About', 'Services', 'Contact'].map((link) => (
              <li key={link}>
                <a 
                  href="#" 
                  className="text-white hover:text-yellow-300 transition-colors duration-200 ease-in-out"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
               <a 
                key={social.name} 
                href={social.url} 
                className="text-white hover:text-yellow-300 transition-colors duration-200 ease-in-out"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="text-sm">&copy; 2024 VRV Security. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;