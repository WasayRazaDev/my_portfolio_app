import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="w-full h-20 px-6 md:px-12 flex items-center justify-between backdrop-blur-md fixed top-0 z-50 shadow-sm bg-transparent select-none">

      {/* 1. LOGO with Linear Gradient (FA6E00 to E60026) */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-black tracking-tighter italic">
          <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">
            {props.portfolioData.profile.name}'s Portfolio
          </span>
        </h1>
      </div>

      {/* 2. SELECTION SECTION */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-[#959595]">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              /* Hover Color: FD6F00 */
              className="hover:text-[#FD6F00] transition-colors duration-300"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {/* Hire Me Button */}
        <a href="#contact">
          <button className="px-8 py-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] text-white text-sm font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg uppercase">
            Hire Me
          </button>
        </a>

        {/* Dashboard Button */}
        <NavLink to="/dashboard">
          {({ isActive }) => (
            <button className={`
            px-6 py-3 text-sm font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg uppercase
            ${isActive
                ? "bg-white text-black ring-4 ring-[#FD6F00]/50"
                : "bg-gradient-to-r from-[#FD6F00] to-[#3B3BFF] text-white"
              }
          `}>
              Dashboard
            </button>
          )}
        </NavLink>
      </div>

    </nav>
  )
}

export default Navbar