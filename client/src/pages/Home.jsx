import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from "framer-motion"
import image from "../assets/img1.png"
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  return (

    <div className="min-h-screen overflow-x-hidden bg-white text-[#16325B] selection:bg-cyan-100 ">
      <Navbar/>

      {/* top section */}
      <section className ="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* left part */}
          <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
         className="text-center lg:text-left max-w-2xl mx-auto"
        >
          <motion.h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-[1.15] text-[#16325B]" >
          Create Smart <br />
            <span className="text-cyan-500">AI Notes</span> in Seconds
          </motion.h1>

         <p
          className="mt-6 mx-auto lg:mx-0 max-w-lg  md:text-lg text-base text-slate-600 leading-relaxed">
          Generate exam-focused notes, project documentation, flow diagrams and revision-ready content using AI—tailored for students who need to learn.
          </p>

          <motion.button
           onClick={() => navigate("/notes")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 flex items-center gap-4 px-10 py-4 rounded-2xl  bg-[#16325B] text-white font-bold text-lg shadow-xl shadow-blue-900/10 hover:bg-[#1e447a] transition-all mx-auto lg:mx-0">
            Get Started
          </motion.button>

        </motion.div>
        
        {/* right part */}
        <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1}}
        transition={{ duration: 0.7 }}
        className="relative flex justify-center lg:justify-end"
      >
      
        <img src={image} alt="img" className="right-0"/>
      </motion.div>

      </section>


      {/* bottom section */}
      <section className="max-w-7xl mx-auto px-8 py-10 ">
        <div className ="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Feature icon="📘" title="Smart Notes" des="Exam-oriented, high-yield content."/>
          <Feature icon="📊" title="Visual Charts" des="Auto-generated flowcharts & graphs."  />
          <Feature icon="📁" title="Project Notes" des="Well-structured documentation for assignments & projects." />
          <Feature icon="⬇️" title="Free PDF Download" des="Clean, printable, and well-formatted."  /></div>
      </section>


      {/* footer */}
      <Footer/>

    </div>
  )
}



function Feature({ icon, title, des }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      className={`p-4 rounded-2xl border border-slate-200 bg-white transition-all`}
    >
      <div className="text-4xl mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#16325B] mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{des}</p>
    </motion.div>
  );
}

export default Home
