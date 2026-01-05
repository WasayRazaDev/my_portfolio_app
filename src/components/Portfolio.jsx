// import React from 'react'

// const Portfolio = () => {
//   const projects = [
//     { id: 1, title: "E-Commerce App", category: "Web Development", colSpan: "md:col-span-8", img: "https://via.placeholder.com/800x400" },
//     { id: 2, title: "Fitness Tracker", category: "UI/UX Design", colSpan: "md:col-span-4", img: "https://via.placeholder.com/400x400" },
//     { id: 3, title: "Finance Dashboard", category: "React App", colSpan: "md:col-span-4", img: "https://via.placeholder.com/400x400" },
//     { id: 4, title: "Social Media Platform", category: "Full Stack", colSpan: "md:col-span-8", img: "https://via.placeholder.com/800x400" },
//   ];

//   return (
//     <div className="min-h-[calc(100vh-5rem)] w-full bg-black flex flex-col items-center justify-center px-6 md:px-20 py-20">
      
//       {/* 1. HEADER */}
//       <div className="text-center mb-16">
//         <h2 className="text-[#FD6F00] font-bold tracking-[0.4em] uppercase mb-2 text-xs">Showcase</h2>
//         <h1 className="text-5xl md:text-6xl font-black text-white">
//           My <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">Works.</span>
//         </h1>
//         <div className="w-24 h-1 bg-[#FD6F00] mx-auto mt-4 rounded-full"></div>
//       </div>

//       {/* 2. PROJECT BENTO GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-7xl">
//         {projects.map((project) => (
//           <div 
//             key={project.id}
//             className={`group relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-zinc-800 h-[300px] md:h-[400px] ${project.colSpan}`}
//           >
//             {/* Project Image */}
//             <img 
//               src={project.img} 
//               alt={project.title}
//               className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
//             />

//             {/* Glassmorphism Overlay */}
//             <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-end p-8 backdrop-blur-sm">
//               <span className="text-[#FD6F00] font-bold text-xs uppercase tracking-widest mb-2">
//                 {project.category}
//               </span>
//               <h3 className="text-2xl font-bold text-white mb-4">
//                 {project.title}
//               </h3>
//               <button className="w-fit px-6 py-2 border border-[#FD6F00] text-[#FD6F00] rounded-full text-sm font-bold hover:bg-[#FD6F00] hover:text-white transition-all">
//                 View Case Study
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default Portfolio










// import React, { useState } from 'react'

// const Portfolio = () => {
//   const [selectedProject, setSelectedProject] = useState(null);

//   const projects = [
//     { 
//       id: 1, 
//       title: "E-Commerce App", 
//       category: "Web Development", 
//       img: "https://via.placeholder.com/600x400", // Thumbnail
//       github: "https://github.com/your-repo",
//       gallery: ["https://via.placeholder.com/800x1000/111", "https://via.placeholder.com/800x1000/222", "https://via.placeholder.com/800x1000/333", "https://via.placeholder.com/800x1000/444"]
//     },
//     { 
//       id: 2, 
//       title: "Fitness Tracker", 
//       category: "UI/UX Design", 
//       img: "https://via.placeholder.com/600x400",
//       github: "https://github.com/your-repo",
//       gallery: ["https://via.placeholder.com/800x1000/555", "https://via.placeholder.com/800x1000/666"]
//     },
//     { 
//       id: 3, 
//       title: "Finance Dashboard", 
//       category: "React App", 
//       img: "https://via.placeholder.com/600x400",
//       github: "https://github.com/your-repo",
//       gallery: ["https://via.placeholder.com/800x1000/777", "https://via.placeholder.com/800x1000/888"]
//     },
//     { 
//       id: 4, 
//       title: "Social Media Platform", 
//       category: "Full Stack", 
//       img: "https://via.placeholder.com/600x400",
//       github: "https://github.com/your-repo",
//       gallery: ["https://via.placeholder.com/800x1000/999", "https://via.placeholder.com/800x1000/000"]
//     },
//   ];

//   return (
//     <div className="relative">
//       {/* 1. MAIN SECTION CONTAINER */}
//       <div className={`min-h-[calc(100vh-5rem)] w-full bg-black flex flex-col items-center justify-center px-6 md:px-20 py-20 transition-all duration-500 ${selectedProject ? 'blur-xl scale-95 pointer-events-none' : 'blur-0 scale-100'}`}>
        
//         {/* HEADER */}
//         <div className="text-center mb-16">
//           <h2 className="text-[#FD6F00] font-bold tracking-[0.4em] uppercase mb-2 text-xs">Portfolio</h2>
//           <h1 className="text-5xl md:text-6xl font-black text-white">
//             My <span className="bg-gradient-to-r from-[#FA6E00] to-[#E60026] bg-clip-text text-transparent">Works.</span>
//           </h1>
//           <div className="w-24 h-1 bg-[#FD6F00] mx-auto mt-4 rounded-full"></div>
//         </div>

//         {/* 2. 2x2 UNIFORM GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
//           {projects.map((project) => (
//             <div 
//               key={project.id}
//               className="group relative aspect-video rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-zinc-800"
//             >
//               {/* Thumbnail Image */}
//               <img 
//                 src={project.img} 
//                 alt={project.title}
//                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
//               />

//               {/* HOVER OVERLAY (Center Buttons) */}
//               <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center backdrop-blur-sm">
//                 <h3 className="text-white text-2xl font-bold mb-6">{project.title}</h3>
                
//                 <div className="flex gap-4">
//                   {/* GitHub Link */}
//                   <a 
//                     href={project.github} 
//                     target="_blank" 
//                     rel="noreferrer"
//                     className="p-3 bg-zinc-800 rounded-full hover:bg-white hover:text-black transition-all text-white text-sm font-bold px-6 border border-zinc-700"
//                   >
//                     GitHub
//                   </a>
                  
//                   {/* View More Trigger */}
//                   <button 
//                     onClick={() => setSelectedProject(project)}
//                     className="p-3 bg-gradient-to-r from-[#FD6F00] to-[#E46400] rounded-full text-white text-sm font-bold px-6 shadow-lg shadow-orange-900/20 hover:scale-105 transition-transform"
//                   >
//                     View More
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 3. MODAL GALLERY POPUP */}
//       {selectedProject && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-300">
//           {/* Backdrop (Click to close) */}
//           <div 
//             className="absolute inset-0 bg-black/60" 
//             onClick={() => setSelectedProject(null)} 
//           />
          
//           <div className="relative bg-zinc-900 w-full max-w-4xl max-h-[85vh] rounded-[3rem] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
            
//             {/* Modal Header */}
//             <div className="p-8 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
//               <h2 className="text-[#FD6F00] text-2xl font-black uppercase tracking-tighter">
//                 {selectedProject.title}
//               </h2>
//               <button 
//                 onClick={() => setSelectedProject(null)}
//                 className="w-10 h-10 flex items-center justify-center bg-zinc-800 hover:bg-red-500 text-white rounded-full transition-colors text-xl"
//               >
//                 &times;
//               </button>
//             </div>

//             {/* Scrollable Gallery Content */}
//             <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
//               {selectedProject.gallery.map((image, i) => (
//                 <div key={i} className="group overflow-hidden rounded-2xl border border-zinc-800">
//                   <img 
//                     src={image} 
//                     alt={`Gallery ${i}`} 
//                     className="w-full h-auto object-cover" 
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Portfolio
















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
              <img src={project.img || '/default-profile.png'} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="" />

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
              src={selectedProject.gallery[currentImgIndex]  || '/default-profile.png'} 
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