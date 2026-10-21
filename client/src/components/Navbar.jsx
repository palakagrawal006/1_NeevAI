import React,{useState} from 'react'
import { motion , AnimatePresence  } from "framer-motion";
import logo from "../assets/logo.png"
import { useSelector, useDispatch } from 'react-redux';
import  axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Pricing from './../pages/Pricing';

function Navbar() {
    const {userData} = useSelector((state) =>state.user)
    const credits = userData?.credits || 0;

    const [showCredits, setShowCredits] = useState(false) 
    const [showProfile, setShowProfile] = useState(false) 

    const navigate = useNavigate()
    const dispatch = useDispatch() //to remove userData

    const handleSignOut = async()=>{
      try {
        await axios.get(`${serverUrl}/api/auth/logout` , {withCredentials:true})
        localStorage.removeItem("token") 
        dispatch(setUserData(null))
        navigate("/auth")
      
      } catch (error) {
        console.error("Logout failed", error);
        alert("Logout failed. Please try again.");
      }
    }

  return (
  
  <motion.div
    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='relative z-20 mx-8 mt-6 rounded-2xl bg-[#16325B] border border-white/10 shadow-xl flex items-center justify-between px-8 py-4'
  >
        {/* left :Logo & Brand*/}
        <div className='flex place-items-stretch-center gap-3'>
           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 shadow-inner">
           <img src={logo}alt="NeevAI" className="w-full h-full object-contain"/>
          </div>

          <span className="text-2xl hidden md:block font-bold text-center text-white tracking-tight">NeevAI </span>
        </div>
  
        {/* right :Actions*/}
        <div className ="flex items-center gap-6 relative">
            <div className="relative">

                <motion.div
                onClick={()=>{setShowCredits(!showCredits); setShowProfile(false)} }
                whileHover = {{scale:1.05}}
                whileTap = {{scale:0.95}}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-cyan-500/30 text-white text-sm  cursor-pointer transition-all">
                    <span className="text-cyan-400 text-xl">💠</span>
                    <span className="font-bold">{credits}</span>

                    <motion.span 
                    whileHover = {{scale:1.02}}
                    whileTap = {{scale:0.97}}
                    className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-cyan-500 text-black text-lg font-extrabold leading-none pb-1">+
                    </motion.span>
                </motion.div>

                {/* when showCredits true--  */}
                <AnimatePresence>
                {showCredits && 
                    <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 15, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className='absolute right-0 mt-3 w-64 rounded-2xl
                    bg-[#264c85]
                    border border-white/10
                    shadow-2xl
                    p-5 text-white'
                    >

                      <h4 className="font-bold text-white mb-1">Buy Credits</h4>
                      <p className="text-sm text-blue-100/70 mb-4">Use credits to generate AI notes, diagrams and PDF's</p>
                      <button  onClick={()=> {setShowCredits(false) ; navigate("/pricing")} }className="w-full py-2 rounded-lg bg-linear-to-br from-white to-gray-200 text-black font-semibold hover:opacity-90">Buy More Credits</button>

                    </motion.div>
                }</AnimatePresence>
            </div>


                {/* profile */}

            <div className="relative">
              <motion.div
              onClick ={()=>{setShowProfile(!showProfile);setShowCredits(false) }}
              whileHover = {{scale:1.1}}
              whileTap = {{scale:0.97}}
              className="h-10 w-10 rounded-full bg-cyan-500 border-2 border-[#16325B] flex items-center justify-center text-[#16325B] font-black cursor-pointer shadow-lg">
                <span className="text-lg">{userData?.name?.[0]?.toUpperCase() || 'U'}</span>
              </motion.div>

              {/* Profile Dropdown */}
                <AnimatePresence>
                {showProfile && 
                    <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 15, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className='absolute right-0 mt-3 w-52  rounded-2xl
                   bg-[#264c85]
                    border border-white/10
                    shadow-2xl overflow-hidden
                    p-2 text-white'
                    >
                      <MenuItem text="History" onClick={()=>{setShowProfile(false) ; navigate("/history")}}/>
                      <div className="h-px bg-white/10 mx-3"></div>
                      <MenuItem text="Sign Out" red  onClick={handleSignOut}/>          


                    </motion.div>
                }</AnimatePresence>

            </div>
        </div>

  </motion.div>

  )
}


function MenuItem({onClick , text , red}){
  return (
    <div onClick={onClick}  className={`w-full text-left py-3 px-5 text-sm  font-medium cursor-pointer transition-colors  rounded-lg ${ red ? "text-red-400 hover:bg-red-500/10" : "text-blue-50 hover:bg-white/10"}`}>{text}</div>
  )
}

export default Navbar