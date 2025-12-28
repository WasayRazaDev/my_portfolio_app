import React from 'react'

const Services = (props) => {

  return (
    /* Height Calculation: 
       100vh (Full Viewport) - 5rem (Navbar h-20)
    */
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-6 md:px-20 py-5">
      
      {/* 1. CENTERED HEADER SECTION */}
      <div className="flex flex-col items-center text-center mb-10 max-w-2xl">
        <h2 className="text-[#FD6F00] font-bold tracking-[0.4em] uppercase mb-2 text-xs">
          My Services
        </h2>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Excellence in <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">Execution.</span>
        </h1>
        
        <div className="flex flex-col items-center gap-3">
          <p className="text-zinc-400 text-base leading-relaxed">
            I provide a wide range of services to help you build and grow your business in the digital age.
          </p>
          <div className="w-76 h-1 bg-gradient-to-r from-[#FD6F00] to-[#E60026] rounded-full"></div>
        </div>
      </div>

      {/* 2. THE 2x3 GRID */}
      {/* We use a max-width to keep the grid from getting too wide on huge monitors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {props.portfolioData.services.map((service, index) => (
          <div 
            key={index} 
            className="group relative bg-zinc-900/30 border border-zinc-800 p-8 rounded-[1.5rem] hover:border-[#FD6F00] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
          >
            {/* Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FD6F00]/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[1.5rem] transition-opacity pointer-events-none"></div>

            {/* Content Container */}
            <div className="relative z-10">
              <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FD6F00] transition-colors uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-zinc-500 leading-relaxed text-xs">
                {service.desc}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Services