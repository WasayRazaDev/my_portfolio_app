import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProfilePic from './assets/myprofile.png'

const App = () => {

  const portfolioData = {
    profile: {
      name: "Wasay Raza",
      role: "Web Developer",
      cv : "#",
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
      // ... more projects here
    ],
    contact: {
      email: "wasayammar122@gmail.com",
      phone: "+92 323 7373925"
    }
  };


  return (
    /* The parent grid container. 
       'grid-rows-none' allows the sections to define their own heights.
    */
    <div className="grid grid-cols-1 md:grid-cols-12 w-full bg-black text-white select-none">
      
      {/* Fixed Navbar (does not take up grid row space) */}
      <header className="col-span-full fixed top-0 w-full z-50">
        <Navbar portfolioData={portfolioData} />
      </header>

      {/* Each section uses:
          - col-span-full: occupies all 12 grid columns
          - h-screen: height of the browser window
          - w-full: width of the browser window
      */}

      <section id="home" className="col-span-full h-screen w-full">
        <Home portfolioData={portfolioData} />
      </section>

      <section id="services" className="col-span-full h-screen w-full mt-20">
        <Services portfolioData={portfolioData} />
      </section>

      <section id="about" className="col-span-full h-screen w-full ">
        <About portfolioData={portfolioData} />
      </section>

      <section id="portfolio" className="col-span-full h-screen w-full bg-slate-50">
        <Portfolio portfolioData={portfolioData} />
      </section>

      <section id="contact" className="col-span-full h-screen w-full">
        <Contact portfolioData={portfolioData} />
      </section>

      <footer className="col-span-full h-20 w-full bg-zinc-900">
        <Footer portfolioData={portfolioData} />
      </footer>

    </div>
  )
}

export default App