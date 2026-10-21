import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup  } from "firebase/auth";
import {auth, provider} from "../utils/firebase.js";
import axios from "axios"
import { serverUrl } from './../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth() {

  const dispatch = useDispatch()

  const handleGoogleAuth = async() => {
    try{
      // const response = await signInWithRedirect(auth , provider ) // by firebase
      const response = await signInWithPopup (auth , provider ) // by firebase

      // console.log(response); 
    //   // This gives you a Google Access Token. You can use it to access the Google API.
      const User = response.user 
      const name = User.displayName 
      const email = User.email 

      // send name and email to the "http:localhost:8000/api/auth/google"
      const result = await axios.post(`${serverUrl}/api/auth/google`, {name , email},{ withCredentials:true})

      // console.log(result.data) //user 
      if (result.data.token) localStorage.setItem("token", result.data.token)
      dispatch(setUserData(result.data.user))
    } 
    catch(err){
      console.error("Auth failed:", err.message || err.response?.data);
    }
  }










  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 px-6 md:px-12 font-sans selection:bg-cyan-100">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mt-6 rounded-2xl bg-[#16325B] border border-white/10 px-8 py-5 shadow-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-inner">
             <span className="text-[#16325B] font-black text-xl"><img src="logo.png" alt="NeevAI logo" /></span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">NeevAI</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-semibold">
              AI-powered exam oriented notes & revision
            </p>
          </div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl lg:text-6xl font-black leading-tight text-[#16325B]">
            Master Your <br />
            <span className="text-cyan-500">Exams with NeevAI</span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-md leading-relaxed">
            Generate high-yield notes, project notes, charts, graphs, and download clean PDFs in seconds. 
            Built for students who value their time.
          </p>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 px-8 py-4 rounded-xl flex items-center gap-4 bg-[#16325B] text-white font-bold text-lg shadow-xl shadow-blue-900/20 hover:bg-[#1e447a] transition-all"
           onClick={handleGoogleAuth}>
            <div className="bg-white p-1 rounded-md">
              <FcGoogle size={22} />
            </div>
            Continue with Google
          </motion.button>

          <div className="mt-8 flex items-center gap-3 text-sm font-medium text-slate-500">
            {/* create dot */}
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
            Includes <span className="text-[#16325B] font-bold">50 FREE credits</span> for new users
          </div>
        </motion.div>

        {/* RIGHT CONTENT - Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Feature icon="🎁" title="50 Credits" des="Start generating instantly for free."  />
          <Feature icon="📘" title="Smart Notes" des="Exam-oriented, high-yield content."/>
          <Feature icon="📊" title="Visual Charts" des="Auto-generated flowcharts & graphs."  />
          <Feature icon="📁" title="Project Notes" des="Well-structured documentation for assignments & projects." />
          <Feature icon="⬇️" title="Free PDF Download" des="Clean, printable, and well-formatted."  />
        </div>
      </main>
    </div>
  );
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

export default Auth;