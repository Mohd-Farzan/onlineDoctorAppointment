import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="flex text-zinc-900 font-semibold">
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
              <Link to="/home/about" className="hover:text-slate-200">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/home/services" className=" hover:text-slate-200">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/doctors" className=" hover:text-slate-200">
                Our Doctors
              </Link>
            </li>
            <li>
              <Link to="/home/contact" className=" hover:text-slate-200">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="">Phone : (+91)6387980421 (8707018191)</p>
          <p className="">Email : mohdfarzan701@gmail.com || Sayyedfaiz336@gmail.com
          </p>
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