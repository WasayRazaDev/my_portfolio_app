// import React from 'react';
// import Navbar from '../components/Navbar';
// import Home from '../components/Home';
// import About from '../components/About';
// import Services from '../components/Services';
// import Portfolio from '../components/Portfolio';
// import Contact from '../components/Contact';
// import Footer from '../components/Footer';
// import ProfilePic from '../assets/myprofile.png';

// // Default portfolio data for fallback
// const defaultPortfolioData = {
//   profile: {
//     name: "Wasay Raza",
//     role: "Web Developer",
//     cv: "#",
//     photo: ProfilePic,
//     stats: { exp: "2+", projects: "50+", clients: "30+" },
//     socials: {
//       github: "https://github.com",
//       linkedin: "https://linkedin.com",
//       instagram: "https://instagram.com",
//       facebook: "https://facebook.com"
//     }
//   },
//   services: [
//     { title: "Web Development", icon: "🌐", desc: "Crafting high-performance digital experiences." },
//     { title: "UI/UX Design", icon: "🎨", desc: "Designing intuitive and beautiful interfaces." },
//     { title: "App Solution", icon: "📱", desc: "Building scalable mobile applications." },
//     { title: "SEO Strategy", icon: "🚀", desc: "Optimizing your visibility on search engines." },
//     { title: "Digital Branding", icon: "💎", desc: "Creating a unique identity for your brand." },
//     { title: "Cloud Services", icon: "☁️", desc: "Deploying secure and reliable cloud systems." },
//   ],
//   about: {
//     description: "I am a specialized Web Developer and UI/UX Designer focusing on high-performance digital solutions.",
//     skills: [
//       { name: "Figma", level: 100, icon: "F" },
//       { name: "Adobe XD", level: 100, icon: "Xd" },
//       { name: "Photoshop", level: 85, icon: "Ps" },
//       { name: "Illustrator", level: 60, icon: "Ai" },
//       { name: "Premiere", level: 25, icon: "Pr" },
//     ]
//   },
//   projects: [
//     { 
//       id: 1, 
//       title: "E-Commerce App", 
//       category: "Web Development", 
//       img: "https://via.placeholder.com/600x400/111", 
//       github: "#",
//       gallery: ["https://via.placeholder.com/800x500/111", "https://via.placeholder.com/800x500/222", "https://via.placeholder.com/800x500/333"]
//     },
//     { 
//       id: 2, 
//       title: "Fitness Tracker", 
//       category: "UI/UX Design", 
//       img: "https://via.placeholder.com/600x400/222", 
//       github: "#",
//       gallery: ["https://via.placeholder.com/800x500/444", "https://via.placeholder.com/800x500/555"]
//     },
//     { 
//       id: 3, 
//       title: "Finance Dashboard", 
//       category: "React App", 
//       img: "https://via.placeholder.com/600x400/333", 
//       github: "#",
//       gallery: ["https://via.placeholder.com/800x500/666", "https://via.placeholder.com/800x500/777"]
//     }
//   ],
//   contact: {
//     email: "wasayammar122@gmail.com",
//     phone: "+92 323 7373925"
//   }
// };

// const PortfolioLayout = () => {
//   // Try to load saved data from localStorage
//   const savedData = localStorage.getItem('portfolio_data');
//   const portfolioData = savedData ? JSON.parse(savedData) : defaultPortfolioData;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-12 w-full bg-black text-white select-none relative">
//       {/* Fixed Navbar */}
//       <header className="col-span-full fixed top-0 w-full z-40">
//         <Navbar portfolioData={portfolioData} />
//       </header>

//       {/* Main Content Sections */}
//       <section id="home" className="col-span-full h-screen w-full">
//         <Home portfolioData={portfolioData} />
//       </section>

//       <section id="services" className="col-span-full h-screen w-full mt-20">
//         <Services portfolioData={portfolioData} />
//       </section>

//       <section id="about" className="col-span-full h-screen w-full">
//         <About portfolioData={portfolioData} />
//       </section>

//       <section id="portfolio" className="col-span-full h-screen w-full bg-slate-50">
//         <Portfolio portfolioData={portfolioData} />
//       </section>

//       <section id="contact" className="col-span-full h-screen w-full">
//         <Contact portfolioData={portfolioData} />
//       </section>

//       <footer className="col-span-full h-20 w-full bg-zinc-900">
//         <Footer portfolioData={portfolioData} />
//       </footer>
//     </div>
//   );
// };

// export default PortfolioLayout;










// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import Home from '../components/Home';
// import About from '../components/About';
// import Services from '../components/Services';
// import Portfolio from '../components/Portfolio';
// import Contact from '../components/Contact';
// import Footer from '../components/Footer';
// import ProfilePic from '../assets/myprofile.png';
// import { useAuth } from '../contexts/AuthContext';
// import { usePortfolio } from '../contexts/PortfolioContext';

// // Default portfolio data for fallback
// const defaultPortfolioData = {
//   profile: {
//     name: "Wasay Raza",
//     role: "Web Developer",
//     cv: "#",
//     photo: ProfilePic,
//     stats: { exp: "2+", projects: "50+", clients: "30+" },
//     socials: {
//       github: "https://github.com",
//       linkedin: "https://linkedin.com",
//       instagram: "https://instagram.com",
//       facebook: "https://facebook.com"
//     }
//   },
//   services: [
//     { title: "Web Development", icon: "🌐", desc: "Crafting high-performance digital experiences." },
//     { title: "UI/UX Design", icon: "🎨", desc: "Designing intuitive and beautiful interfaces." },
//     { title: "App Solution", icon: "📱", desc: "Building scalable mobile applications." },
//     { title: "SEO Strategy", icon: "🚀", desc: "Optimizing your visibility on search engines." },
//     { title: "Digital Branding", icon: "💎", desc: "Creating a unique identity for your brand." },
//     { title: "Cloud Services", icon: "☁️", desc: "Deploying secure and reliable cloud systems." },
//   ],
//   about: {
//     description: "I am a specialized Web Developer and UI/UX Designer focusing on high-performance digital solutions.",
//     skills: [
//       { name: "Figma", level: 100, icon: "F" },
//       { name: "Adobe XD", level: 100, icon: "Xd" },
//       { name: "Photoshop", level: 85, icon: "Ps" },
//       { name: "Illustrator", level: 60, icon: "Ai" },
//       { name: "Premiere", level: 25, icon: "Pr" },
//     ]
//   },
//   projects: [
//     { 
//       id: 1, 
//       title: "E-Commerce App", 
//       category: "Web Development", 
//       img: "https://via.placeholder.com/600x400/111", 
//       github: "#",
//       gallery: ["https://via.placeholder.com/800x500/111", "https://via.placeholder.com/800x500/222", "https://via.placeholder.com/800x500/333"]
//     },
//     { 
//       id: 2, 
//       title: "Fitness Tracker", 
//       category: "UI/UX Design", 
//       img: "https://via.placeholder.com/600x400/222", 
//       github: "#",
//       gallery: ["https://via.placeholder.com/800x500/444", "https://via.placeholder.com/800x500/555"]
//     },
//     { 
//       id: 3, 
//       title: "Finance Dashboard", 
//       category: "React App", 
//       img: "https://via.placeholder.com/600x400/333", 
//       github: "#",
//       gallery: ["https://via.placeholder.com/800x500/666", "https://via.placeholder.com/800x500/777"]
//     }
//   ],
//   contact: {
//     email: "wasayammar122@gmail.com",
//     phone: "+92 323 7373925"
//   }
// };

// const PortfolioLayout = () => {
//   const { user } = useAuth();
//   const { portfolioData, loading, error, refreshPortfolio } = usePortfolio();
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const [lastRefresh, setLastRefresh] = useState(Date.now());

//   // Use API data or fallback to default
//   const dataToUse = portfolioData || defaultPortfolioData;

//   // Auto-refresh every 10 seconds if enabled
//   useEffect(() => {
//     if (!autoRefresh) return;
    
//     const interval = setInterval(() => {
//       console.log('Auto-refreshing portfolio data...');
//       refreshPortfolio && refreshPortfolio();
//       setLastRefresh(Date.now());
//     }, 10000); // 10 seconds
    
//     return () => clearInterval(interval);
//   }, [autoRefresh, refreshPortfolio]);

//   // Listen for manual refresh events
//   useEffect(() => {
//     const handleRefresh = () => {
//       console.log('Manual refresh triggered');
//       refreshPortfolio && refreshPortfolio();
//       setLastRefresh(Date.now());
//     };

//     window.addEventListener('refreshPortfolio', handleRefresh);
    
//     return () => {
//       window.removeEventListener('refreshPortfolio', handleRefresh);
//     };
//   }, [refreshPortfolio]);

//   if (loading) {
//     return (
//       <div className="col-span-full h-screen flex items-center justify-center bg-black">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
//           <p className="text-white">Loading Portfolio...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="col-span-full h-screen flex items-center justify-center bg-black">
//         <div className="text-center text-red-400">
//           <p className="text-xl mb-4">⚠️ Error loading portfolio</p>
//           <p className="mb-4">{error}</p>
//           <p className="text-gray-400">Using cached data</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-12 w-full bg-black text-white select-none relative">
//       {/* Auto-refresh toggle */}
//       <div className="fixed top-20 right-6 z-50">
//         <button
//           onClick={() => {
//             refreshPortfolio && refreshPortfolio();
//             setLastRefresh(Date.now());
//           }}
//           className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm mb-2"
//         >
//           🔄 Refresh Now
//         </button>
//         <div className="flex items-center gap-2 text-xs">
//           <input
//             type="checkbox"
//             id="autoRefresh"
//             checked={autoRefresh}
//             onChange={(e) => setAutoRefresh(e.target.checked)}
//             className="rounded"
//           />
//           <label htmlFor="autoRefresh" className="text-gray-400">
//             Auto-refresh (10s)
//           </label>
//         </div>
//       </div>

//       {/* Fixed Navbar */}
//       <header className="col-span-full fixed top-0 w-full z-40">
//         <Navbar portfolioData={dataToUse} />
//       </header>

//       {/* Main Content Sections */}
//       <section id="home" className="col-span-full h-screen w-full">
//         <Home portfolioData={dataToUse} />
//       </section>

//       <section id="services" className="col-span-full h-screen w-full mt-20">
//         <Services portfolioData={dataToUse} />
//       </section>

//       <section id="about" className="col-span-full h-screen w-full">
//         <About portfolioData={dataToUse} />
//       </section>

//       <section id="portfolio" className="col-span-full h-screen w-full">
//         <Portfolio portfolioData={dataToUse} />
//       </section>

//       <section id="contact" className="col-span-full h-screen w-full">
//         <Contact portfolioData={dataToUse} />
//       </section>

//       <footer className="col-span-full h-20 w-full bg-zinc-900">
//         <Footer portfolioData={dataToUse} />
//       </footer>
//     </div>
//   );
// };

// export default PortfolioLayout;























import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ProfilePic from '../assets/myprofile.png';
import { useAuth } from '../contexts/AuthContext';
import { usePortfolio } from '../contexts/PortfolioContext';

// Default portfolio data for fallback
const defaultPortfolioData = {
  profile: {
    name: "Wasay Raza",
    role: "Web Developer",
    cv: "#",
    photo: ProfilePic,
    stats: { exp: "2+", projects: "50+", clients: "30+" },
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com"
    }
  },
  services: [
    { title: "Web Development", icon: "🌐", desc: "Crafting high-performance digital experiences." },
    { title: "UI/UX Design", icon: "🎨", desc: "Designing intuitive and beautiful interfaces." },
    { title: "App Solution", icon: "📱", desc: "Building scalable mobile applications." },
    { title: "SEO Strategy", icon: "🚀", desc: "Optimizing your visibility on search engines." },
    { title: "Digital Branding", icon: "💎", desc: "Creating a unique identity for your brand." },
    { title: "Cloud Services", icon: "☁️", desc: "Deploying secure and reliable cloud systems." },
  ],
  about: {
    description: "I am a specialized Web Developer and UI/UX Designer focusing on high-performance digital solutions.",
    skills: [
      { name: "Figma", level: 100, icon: "F" },
      { name: "Adobe XD", level: 100, icon: "Xd" },
      { name: "Photoshop", level: 85, icon: "Ps" },
      { name: "Illustrator", level: 60, icon: "Ai" },
      { name: "Premiere", level: 25, icon: "Pr" },
    ]
  },
  projects: [
    { 
      id: 1, 
      title: "E-Commerce App", 
      category: "Web Development", 
      img: "https://via.placeholder.com/600x400/111", 
      github: "#",
      gallery: ["https://via.placeholder.com/800x500/111", "https://via.placeholder.com/800x500/222", "https://via.placeholder.com/800x500/333"]
    },
    { 
      id: 2, 
      title: "Fitness Tracker", 
      category: "UI/UX Design", 
      img: "https://via.placeholder.com/600x400/222", 
      github: "#",
      gallery: ["https://via.placeholder.com/800x500/444", "https://via.placeholder.com/800x500/555"]
    },
    { 
      id: 3, 
      title: "Finance Dashboard", 
      category: "React App", 
      img: "https://via.placeholder.com/600x400/333", 
      github: "#",
      gallery: ["https://via.placeholder.com/800x500/666", "https://via.placeholder.com/800x500/777"]
    }
  ],
  contact: {
    email: "wasayammar122@gmail.com",
    phone: "+92 323 7373925"
  }
};

const PortfolioLayout = () => {
  const { user } = useAuth();
  const { portfolioData, loading, error } = usePortfolio();

  // Use API data or fallback to default
  const dataToUse = portfolioData || defaultPortfolioData;

  if (loading) {
    return (
      <div className="col-span-full h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full h-screen flex items-center justify-center bg-black">
        <div className="text-center text-red-400">
          <p className="text-xl mb-4">⚠️ Error loading portfolio</p>
          <p className="mb-4">{error}</p>
          <p className="text-gray-400">Using cached data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 w-full bg-black text-white select-none relative">
      {/* Fixed Navbar */}
      <header className="col-span-full fixed top-0 w-full z-40">
        <Navbar portfolioData={dataToUse} />
      </header>

      {/* Main Content Sections */}
      <section id="home" className="col-span-full h-screen w-full">
        <Home portfolioData={dataToUse} />
      </section>

      <section id="services" className="col-span-full h-screen w-full mt-20">
        <Services portfolioData={dataToUse} />
      </section>

      <section id="about" className="col-span-full h-screen w-full">
        <About portfolioData={dataToUse} />
      </section>

      <section id="portfolio" className="col-span-full h-screen w-full">
        <Portfolio portfolioData={dataToUse} />
      </section>

      <section id="contact" className="col-span-full h-screen w-full">
        <Contact portfolioData={dataToUse} />
      </section>

      <footer className="col-span-full h-20 w-full bg-zinc-900">
        <Footer portfolioData={dataToUse} />
      </footer>
    </div>
  );
};

export default PortfolioLayout;