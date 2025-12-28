import React from 'react'
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react'

const Footer = (props) => {
  return (
    <footer className="w-full bg-black border-t border-zinc-900 py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* 1. BRANDING / LOGO */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h1 className="text-2xl font-black tracking-tighter italic">
            <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">
              {props.portfolioData.profile.name.toUpperCase()}
            </span>
          </h1>
          <p className="text-zinc-500 text-xs uppercase tracking-[0.3em]">
            {props.portfolioData.profile.role}
          </p>
        </div>

        {/* 2. QUICK LINKS (Center) */}
        <ul className="flex flex-wrap justify-center gap-6 text-zinc-400 text-sm font-bold uppercase tracking-widest">
          <li><a href="#home" className="hover:text-[#FD6F00] transition-colors">Home</a></li>
          <li><a href="#services" className="hover:text-[#FD6F00] transition-colors">Services</a></li>
          <li><a href="#about" className="hover:text-[#FD6F00] transition-colors">About</a></li>
          <li><a href="#portfolio" className="hover:text-[#FD6F00] transition-colors">Portfolio</a></li>
          <li><a href="#contact" className="hover:text-[#FD6F00] transition-colors">Contact</a></li>
        </ul>

        {/* 3. SOCIALS (Right) */}
        <div className="flex gap-4">
          <a 
            href={props.portfolioData.profile.socials.github} 
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-[#FD6F00] hover:text-[#FD6F00] hover:-translate-y-1 transition-all duration-300"
          >
            <Github size={20} />
          </a>
          <a 
            href={props.portfolioData.profile.socials.linkedin} 
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-[#FD6F00] hover:text-[#FD6F00] hover:-translate-y-1 transition-all duration-300"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href={props.portfolioData.profile.socials.instagram} 
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-[#FD6F00] hover:text-[#FD6F00] hover:-translate-y-1 transition-all duration-300"
          >
            <Instagram size={20} />
          </a>
          <a 
            href={props.portfolioData.profile.socials.facebook} 
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-[#FD6F00] hover:text-[#FD6F00] hover:-translate-y-1 transition-all duration-300"
          >
            <Facebook size={20} />
          </a>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
        <p>© 2025 All Rights Reserved. Created by {props.portfolioData.profile.name}</p>
        <p className="mt-2 md:mt-0">Designed with React + Tailwind CSS</p>
      </div>
    </footer>
  )
}

export default Footer