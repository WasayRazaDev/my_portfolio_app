

import React from 'react'
import ProfilePic from '../assets/myprofile.png'
import { Instagram , Linkedin , Facebook, Github } from 'lucide-react'

const Home = (props) => {
  return (
    <div className="h-full w-full mt-6 bg-black flex flex-col md:flex-row items-center px-6 md:px-20">
      
      {/* LEFT SIDE: Textual Data */}
      <div className="flex-1 flex flex-col justify-center p-10 space-y-3 order-2 md:order-1 relative">
        
        {/* 1. Decorative Glow behind text */}
        <div className="absolute left-30 top-30 w-64 h-64 bg-[#FA6E00] rounded-full blur-[120px] opacity-20 pointer-events-none animate-ping"></div>

        <h2 className="text-[#959595] font-bold tracking-widest uppercase flex flex-col">
           Hi, I'm <span className="text-[#959595] text-3xl mt-2">{props.portfolioData.profile.name}</span>
        </h2>

        <h1 className="text-4xl md:text-7xl font-black text-white leading-tight relative">
          Creative <br />
          <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">
            {props.portfolioData.profile.role}
          </span>
        </h1>

        {/* 2. SOCIALS ROW */}
        <div className="flex gap-5 items-center">
          <a href={props.portfolioData.profile.socials.github} className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-white hover:border-[#FD6F00] hover:text-[#FD6F00] transition-all">
            <span className="text-xs"><Github /></span> {/* GitHub */}
          </a>
          <a href={props.portfolioData.profile.socials.linkedin} className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-white hover:border-[#FD6F00] hover:text-[#FD6F00] transition-all">
            <span className="text-xs"><Linkedin /></span> {/* LinkedIn */}
          </a>
          <a href={props.portfolioData.profile.socials.instagram} className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-white hover:border-[#FD6F00] hover:text-[#FD6F00] transition-all">
            <span className="text-xs"><Instagram /></span> {/* Instagram */}
          </a>
          <a href={props.portfolioData.profile.socials.facebook} className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-white hover:border-[#FD6F00] hover:text-[#FD6F00] transition-all">
            <span className="text-xs"><Facebook /></span> {/* FB */}
          </a>
        </div>
        



        {/* 3. CTA Buttons */}
        <div className="flex gap-4 pt-4">
          <a href="#contact">
            <button className="px-8 py-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
            Hire Me
          </button>
          </a>
          <a href={props.portfolioData.profile.cv} target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-3 border-2 border-[#FD6F00] text-[#FD6F00] font-bold rounded-full hover:bg-[#FD6F00] hover:text-white transition-all">
            Download CV
          </button>
          </a>
        </div>

        {/* 4. STATS SECTION (Separated by |) */}
        <div className="flex items-center gap-6 pt-8 text-white">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{props.portfolioData.profile.stats.exp}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-tighter">Experience</span>
          </div>
          
          <div className="h-10 w-[1px] bg-zinc-700"></div> {/* Separator | */}
          
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{props.portfolioData.profile.stats.projects}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-tighter">Projects</span>
          </div>

          <div className="h-10 w-[1px] bg-zinc-700"></div> {/* Separator | */}

          <div className="flex flex-col">
            <span className="text-2xl font-bold">{props.portfolioData.profile.stats.clients}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-tighter">Happy Clients</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Picture Pop-out Effect */}
        <div className="flex-1 flex justify-center items-center order-1 md:order-2 mb-20 md:mb-0 relative">
        
        {/* 1. Large Background Glow */}
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#FD6F00] rounded-full blur-[400px] opacity-10 animate-pulse"></div>

        <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] flex items-end justify-center">
            
            {/* 2. THE CIRCLE BORDER (Background of the image) */}
            <div className="absolute bottom-0 w-[80%] h-[80%] rounded-full border-4 border-[#FD6F00] bg-gradient-to-b from-zinc-900 to-black shadow-[0_0_50px_rgba(253,111,0,0.3)]"></div>

            {/* 3. THE IMAGE (Positioned to pop out) */}
            <div className="relative w-full h-full flex items-end justify-center overflow-visible">
            <img 
                src={props.portfolioData.profile.photo} 
                alt={props.portfolioData.profile.name}
                className="
                w-auto h-[105%]     /* Height is 110% to make it taller than the container */
                object-cover
                rounded-full
                grayscale hover:grayscale-0 
                transition-all duration-700
                drop-shadow-[0_10px_30px_rgba(0,0,0,1)] /* Adds depth behind the cutout */
                z-10
                mb-1               /* Adjust this to control how much sits inside the circle */
                "
            />
            </div>

            {/* 4. OPTIONAL: Decorative Ring (Thin outer line) */}
            <div className="absolute bottom-[-10px] w-[85%] h-[85%] rounded-full border border-dashed border-zinc-700 animate-[spin_20s_linear_infinite] opacity-50"></div>
        </div>
        </div>

    </div>
  )
}

export default Home