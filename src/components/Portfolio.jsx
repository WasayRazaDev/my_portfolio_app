
import React, { useState } from 'react'

const Portfolio = (props) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setCurrentImgIndex(0);
  };

  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  };

  return (
    <div className="relative">
      {/* 1. MAIN SECTION CONTAINER (Blur removed) */}
      <div className="min-h-[calc(100vh-5rem)] w-full bg-black flex flex-col items-center justify-center px-6 md:px-20 py-20">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase italic">
            Recent <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">Works</span>
          </h1>
          <div className="w-24 h-1 bg-[#FD6F00] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 2x2 UNIFORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-7xl">
          {props.portfolioData.projects.map((project) => (
            <div key={project.id} className="group relative aspect-video rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800">
              <img src={project.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="" />

              {/* SLIDE UP OVERLAY */}
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out backdrop-blur-sm">
                
                <h3 className="text-white text-3xl font-black mb-6 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75 uppercase italic">
                  {project.title}
                </h3>
                
                <div className="flex gap-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                  <a href={project.github} className="px-6 py-2 bg-zinc-800 text-white rounded-full font-bold hover:bg-white hover:text-black transition-colors border border-zinc-700">GitHub</a>
                  <button 
                    onClick={() => handleOpenModal(project)}
                    className="px-6 py-2 bg-gradient-to-r from-[#FD6F00] to-[#E46400] text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(253,111,0,0.4)] transition-all"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. MODAL SLIDER (Arrows visible on hover) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Dark Backdrop (No Blur) */}
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedProject(null)}></div>
          
          <div className="relative w-full max-w-5xl aspect-video bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex items-center group/modal">
            
            {/* Image Counter */}
            <div className="absolute top-8 left-10 z-20 text-white font-black text-xl italic opacity-50">
                0{currentImgIndex + 1} / 0{selectedProject.gallery.length}
            </div>

            {/* Close Button */}
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-10 z-20 text-white text-4xl hover:text-[#FD6F00] transition-colors">&times;</button>

            {/* Left Arrow Control */}
            <button 
              onClick={prevImg} 
              className="absolute left-6 z-20 w-14 h-14 rounded-full bg-black/50 hover:bg-[#FD6F00] text-white flex items-center justify-center transition-all opacity-0 group-hover/modal:opacity-100 border border-zinc-700"
            >
                &#10094;
            </button>

            {/* The Main Slider Image */}
            <img 
              src={selectedProject.gallery[currentImgIndex]} 
              className="w-full h-full object-cover transition-opacity duration-300" 
              key={currentImgIndex} 
              alt="Project Showcase" 
            />

            {/* Right Arrow Control */}
            <button 
              onClick={nextImg} 
              className="absolute right-6 z-20 w-14 h-14 rounded-full bg-black/50 hover:bg-[#FD6F00] text-white flex items-center justify-center transition-all opacity-0 group-hover/modal:opacity-100 border border-zinc-700"
            >
                &#10095;
            </button>

            {/* Info Bar */}
            <div className="absolute bottom-0 w-full p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                <p className="text-[#FD6F00] font-bold uppercase tracking-[0.4em] text-[10px] mb-2">{selectedProject.category}</p>
                <h2 className="text-white text-4xl font-black italic uppercase tracking-tighter">{selectedProject.title}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Portfolio