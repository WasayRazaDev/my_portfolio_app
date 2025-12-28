import React from 'react'

const Contact = (props) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] w-full bg-black flex flex-col items-center justify-center px-6 md:px-20 py-20">
      
      {/* 1. HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-[#FD6F00] font-bold tracking-[0.4em] uppercase mb-2 text-xs">Get in Touch</h2>
        <h1 className="text-5xl md:text-6xl font-black text-white">
          Contact <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">Me.</span>
        </h1>
        <div className="w-24 h-1 bg-[#FD6F00] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-16">
        
        {/* LEFT SIDE: Contact Info */}
        <div className="flex-1 space-y-10">
          <div className="space-y-4">
            <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter">Let's talk about <br/> your project.</h3>
            <p className="text-zinc-500 text-lg">I'm currently available for freelance work and full-time positions. If you have a project that needs some creative injection, that's where I come in.</p>
          </div>

          <div className="space-y-6">
            {/* Contact Item */}
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#FD6F00] group-hover:bg-[#FD6F00] group-hover:text-white transition-all duration-300">
                <span className="text-xl font-bold">@</span>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Email Me</p>
                <p className="text-white font-bold text-lg">{props.portfolioData.contact.email}</p>
              </div>
            </div>

            {/* Contact Item */}
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#FD6F00] group-hover:bg-[#FD6F00] group-hover:text-white transition-all duration-300">
                <span className="text-xl font-bold">#</span>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Call Me</p>
                <p className="text-white font-bold text-lg">{props.portfolioData.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Contact Form */}
        <div className="flex-1 bg-zinc-900/50 p-8 md:p-12 rounded-[3rem] border border-zinc-800 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FD6F00] blur-[100px] opacity-10"></div>
          
          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#FD6F00] transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#FD6F00] transition-colors"
              />
            </div>
            <input 
              type="text" 
              placeholder="Subject" 
              className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#FD6F00] transition-colors"
            />
            <textarea 
              placeholder="Message" 
              rows="4" 
              className="w-full bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#FD6F00] transition-colors resize-none"
            ></textarea>
            
            <button className="w-full py-5 bg-gradient-to-r from-[#FD6F00] to-[#E46400] text-white font-black rounded-2xl uppercase tracking-[0.2em] shadow-lg shadow-orange-900/20 hover:scale-[1.02] active:scale-95 transition-all">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Contact