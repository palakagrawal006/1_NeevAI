import React from 'react'
import { motion } from "framer-motion"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  axios from 'axios';
import { serverUrl } from './../App';
import { setUserData } from '../redux/userSlice';

function Footer() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
    
    <motion.footer 
    initial={{ opacity: 0, y:20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{once:true}}
    transition={{ duration: 0.6 }}
    className='mx-6 mb-6 mt-24 rounded-2xl bg-[#16325B] border border-white/5 px-8 py-8  text-white shadow-blue-900/20'>

            {/* first section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <motion.div className="flex flex-col gap-4 ">

                <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer ">
                    <img src={logo} alt="NeevAI logo" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform"/>
                   <span className="text-2xl font-black tracking-tight"
                    style={{ textShadow: "0 6px 18px rgba(0,0,0,0.4)" }}>
                   NeevAI
                    </span>
                </div>
                
                <p className='text-sm text-blue-100/60 leading-relaxed max-w-sm'> Empowering students with AI-driven revision tools to build a stronger academic foundation, one note at a time.
                    </p>
            </motion.div>

             {/* second section */}

            <div className="text-center ">
                <h1 className=" mb-6 font-bold text-cyan-400 uppercase tracking-widest text-xs" >Quick Platform</h1>
                <ul className="space-y-4 text-sm font-medium">
                    <li onClick={()=>navigate("/notes")} className="text-blue-100/80 hover:text-cyan-400 cursor-pointer transition-colors">Smart Notes</li>

                    <li onClick={()=>navigate("/history") }className="text-blue-100/80 hover:text-cyan-400 cursor-pointer transition-colors">Recent History</li>
                    <li onClick={()=>navigate("/pricing") }className="text-blue-100/80 hover:text-cyan-400 cursor-pointer transition-colors">Credits & Pricing</li>
                </ul>
            </div>

                {/* third section --account */}
             <div className="text-center ">
                <h1 className=" mb-6 font-bold text-cyan-400 uppercase tracking-widest text-xs" > Support & Account</h1>
                <ul className="space-y-4 text-sm font-medium">

                    <li onClick={()=>navigate("/auth")} className="text-blue-100/80 hover:text-cyan-400 cursor-pointer transition-colors">SignIn</li>

                    <li onClick={handleSignOut} className="text-red-400 hover:text-red-300 cursor-pointer transition-colors">SignOut</li>

                    <li className="text-blue-100/40 select-all cursor-copy">support@neevai.com</li>
                </ul>
            </div>
        </div>

        {/* bottom section */}
            {/* line  */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-blue-100/30">
                    Built for the next generation of learners.
                </p>
                <p className="text-xs text-blue-100/40 font-medium">
                    &copy; {new Date().getFullYear()} NeevAI. All rights reserved.
                </p>
            </div>
        {/* <div className="my-6 h-px bg-white/10"/>
        <p className="text-center text-xs text-gray-500">
            All rights reserved &#xA9; {new Date().getFullYear()} NeevAI.
        </p> */}

    </motion.footer>
  )
}

export default Footer