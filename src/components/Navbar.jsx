// import React from 'react'

// const Navbar = (props) => {
//   const navLinks = [
//     { name: 'Home', href: '#home' },
//     { name: 'Services', href: '#services' },
//     { name: 'About', href: '#about' },
//     { name: 'Portfolio', href: '#portfolio' },
//     { name: 'Contact', href: '#contact' },
//   ]

//   return (
//     <nav className="w-full h-20 px-6 md:px-12 flex items-center justify-between backdrop-blur-md fixed top-0 z-50 shadow-sm bg-transparent select-none">
      
//       {/* 1. LOGO with Linear Gradient (FA6E00 to E60026) */}
//       <div className="flex-shrink-0">
//         <h1 className="text-2xl font-black tracking-tighter italic">
//           <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">
//             {props.portfolioData.profile.name}'s Portfolio
//           </span>
//         </h1>
//       </div>

//       {/* 2. SELECTION SECTION */}
//       <ul className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-[#959595]">
//         {navLinks.map((link) => (
//           <li key={link.name}>
//             <a 
//               href={link.href} 
//               /* Hover Color: FD6F00 */
//               className="hover:text-[#FD6F00] transition-colors duration-300"
//             >
//               {link.name}
//             </a>
//           </li>
//         ))}
//       </ul>

//       {/* 3. HIRE ME BUTTON (Gradient: FD6F00 to E46400) */}
//       <div className="flex items-center">
//         <a href="#contact">
//             <button className="px-8 py-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] text-white text-sm font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg  uppercase">
//           Hire Me
//         </button>
//         </a>

//       </div>

//     </nav>
//   )
// }

// export default Navbar




import React, { useState } from 'react'
import Login from '../pages/Login' // Make sure to import your LoginPage

const Navbar = (props) => {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ]

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="w-full h-20 px-6 md:px-12 flex items-center justify-between backdrop-blur-md fixed top-0 z-50 shadow-sm bg-transparent select-none">
        
        {/* 1. LOGO with Linear Gradient */}
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
                className="hover:text-[#FD6F00] transition-colors duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* 3. BUTTONS SECTION */}
        <div className="flex items-center gap-4">
          {/* Dashboard Button */}
          <button 
            onClick={() => setShowLogin(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-[#FD6F00] to-[#E46400] text-white text-sm font-bold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg uppercase flex items-center gap-2 group"
          >
            <svg 
              className="w-4 h-4 group-hover:rotate-12 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Dashboard
          </button>

          {/* HIRE ME BUTTON */}
          <a href="#contact">
            <button className="px-8 py-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] text-white text-sm font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg uppercase">
              Hire Me
            </button>
          </a>
        </div>

      </nav>

      {/* Show Login Page Overlay */}
      {showLogin && (
        <div className="fixed inset-0 z-[100]">
          <Login onLogin={() => setShowLogin(false)} />
        </div>
      )}
    </>
  )
}

export default Navbar