import React from 'react'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Services from '../components/Services'
import About from '../components/About'
import Portfolio from '../components/Portfolio'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import usePortfolioData from "../hooks/usePortfolioData";

const LandingPage = () => {
  const { portfolioData } = usePortfolioData();

  if (!portfolioData) return null;

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

export default LandingPage