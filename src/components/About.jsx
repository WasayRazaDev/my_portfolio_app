import React from 'react'
import ProfilePic from '../assets/myprofile.png'

const About = (props) => {

  return (
    <div className="min-h-[calc(100vh-5rem)] w-full bg-black flex flex-col items-center justify-center px-6 md:px-20 py-20">
      
      {/* 1. SECTION HEADING */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
          About <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">Me.</span>
        </h1>
        <div className="w-24 h-1 bg-[#FD6F00] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center gap-12 md:gap-24">
        
        {/* LEFT SIDE: Picture Pop-out (As per your design) */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-[#FD6F00] rounded-full blur-[500px] opacity-10 animate-pulse"></div>
          
          <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] flex items-end justify-center">
            <div className="absolute bottom-0 w-[90%] h-[90%] rounded-full border-4 border-[#FD6F00] bg-zinc-900 shadow-[0_0_50px_rgba(253,111,0,0.2)]"></div>
            
            <div className="relative w-full h-full flex items-end justify-center overflow-visible">
              <img 
                src={props.portfolioData.profile.photo} 
                alt={props.portfolioData.profile.name} 
                className="w-auto h-[120%] object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 drop-shadow-[0_10px_30px_rgba(0,0,0,1)] z-10 mb-1"
              />
            </div>
            <div className="absolute bottom-[-10px] w-[95%] h-[95%] rounded-full border border-dashed border-zinc-700 animate-[spin_30s_linear_infinite] opacity-30"></div>
          </div>
        </div>

        {/* RIGHT SIDE: Description & Skill Circles */}
        <div className="flex-1 flex flex-col space-y-10">
          <div className="space-y-6">
            <h3 className="text-[#FD6F00] font-bold text-xl uppercase tracking-widest">Personal Info</h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {props.portfolioData.about.description}
            </p>
          </div>

          {/* SKILLS PERFORMANCE ROW (As shown in your image) */}
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            {props.portfolioData.about.skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center gap-4 group">
                {/* Circular Progress Bar */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40" cy="40" r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-zinc-800"
                    />
                    <circle
                      cx="40" cy="40" r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={226}
                      strokeDashoffset={226 - (226 * skill.level) / 100}
                      strokeLinecap="round"
                      className="text-[#FD6F00] transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute text-zinc-400 text-xs font-bold border border-zinc-700 px-2 py-1 rounded-md bg-zinc-900 group-hover:text-white transition-colors">
                    {skill.icon}
                  </div>
                </div>
                
                {/* Skill Labels */}
                <div className="text-center">
                  <span className="block text-[#FD6F00] font-black text-lg">{skill.level}%</span>
                  <span className="block text-zinc-500 text-[10px] uppercase tracking-tighter font-bold">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default About