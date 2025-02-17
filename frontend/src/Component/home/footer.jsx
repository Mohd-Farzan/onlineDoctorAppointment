import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">DocConnect</h3>
          <p className="">
            Making healthcare accessible and convenient for everyone.
          </p>
        </div>
  
        {/* Column 2: Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-zinc-700">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className=" hover:text-zinc-700">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/doctors" className=" hover:text-zinc-700">
                Our Doctors
              </Link>
            </li>
            <li>
              <Link to="/contact" className=" hover:text-zinc-700">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="">123 Health Street, Medical City, MC 12345</p>
          <p className="">Phone: (123) 456-7890</p>
          <p className="">Email: info@docconnect.com</p>
        </div>
      </div>
  
      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-8 text-center">
        <p className="">&copy; 2025 DocConnect. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer