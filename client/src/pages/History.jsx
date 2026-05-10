import React, {useState, useEffect} from 'react'
import { motion , AnimatePresence} from "framer-motion";
import { serverUrl } from './../App';
import { useSelector} from 'react-redux';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import FinalResult from './../components/FinalResult';

function History() {

  const [topics , setTopics]  = useState([])
  const [isSidebarOpen , setIsSidebarOpen]  = useState(false)
  const [selectedNote , setSelectedNote]  = useState(null)
  const [loading , setLoading]  = useState(false)
  const [activeNoteId , setActiveNoteId]  = useState(null)


  const navigate = useNavigate()
  const {userData} = useSelector((state) =>state.user)
  const credits = userData?.credits || 0;

  useEffect(()=>{
    const myNotes = async()=>{
      try {
        const res = await axios.get(`${serverUrl}/api/notes/getnotes`, {withCredentials: true})
        console.log(res.data) ; 

        setTopics(Array.isArray(res.data)? res.data: [] )

      } catch (error) {
         console.error("Failed to fetch notes:", error);
      }
    }
    myNotes()
  }, [])

  useEffect(()=>{
    if(window.innerWidth >= 1024) {
      setIsSidebarOpen(true)
    }
  }, [])


  const openNotes= async(notesId) =>{
    setLoading(true)
    setActiveNoteId(notesId)
    try {
      const res = await axios.get(`${serverUrl}/api/notes/${notesId}`, {withCredentials: true})

      console.log("SELECTED NOTE:", res.data.content)

      setSelectedNote(res.data.content)
      setLoading(false)

    } catch (error) {
      console.log("Open Notes error" , error)
      setLoading(false)
    }
  }

  

  return (
    <div className ="min-h-screen bg-[#F8FAFC] text-slate-900 px-6 md:px-12 font-sans selection:bg-cyan-100 pb-20 mb-6">

      {/* header */}
        <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mt-6 rounded-2xl bg-[#16325B] border border-white/10 px-4  md:px-8 py-4 md:py-5 shadow-xl flex items-center justify-between mb-4"
      >
        {/* brand identity */}
        <div  onClick={()=>navigate("/")} className ="flex items-center gap-3 cursor-pointer">
           
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 shadow-inner group-hover:scale-105 transition-transform">
                    <span className="text-[#16325B] font-black text-xl"><img src="logo.png" alt="NeevAI logo" /></span>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight mb-2">NeevAI</h1>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-semibold hidden md:block">
                    AI-powered exam oriented notes & revision
                    </p>
                </div>
            
        </div>


        <div className="flex items-center gap-4">

          {!isSidebarOpen &&
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-cyan-400 text-2xl">
          <GiHamburgerMenu />
        </button>}

           <motion.button onClick={()=>navigate("/pricing")} 
           whileHover={{ scale: 1.02 }}
           className='flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm'>
                <span className="text-cyan-400 text-lg md:text-xl">💠</span>
                <span className="font-bold text-xs md:text-sm">{credits}</span>

                <motion.span 
                whileHover = {{scale:1.02}}
                whileTap = {{scale:0.97}}
                className="ml-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center rounded-full bg-cyan-500 text-black text-sm md:text-lg font-extrabold leading-none pb-0.5">+
                </motion.span>
            </motion.button>
        </div>

      </motion.header>

      {/* main */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">

          {/* sidebar */}
        <motion.div 
          initial={{ x:-320 }}
          animate={{ x:0}}
          exit={{ x:-320}}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`
            fixed lg:static
            top-0 left-0 z-50 lg:z-auto 
            w-72 lg:w-auto 
            h-full lg:h-[calc(100vh-120px)]
            col-span-1
            bg-[#16325B]
            lg:rounded-2xl
            border border-white/10 shadow-lg p-5 overflow-y-auto
            transition-transform duration-300
            lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-sm font-bold text-cyan-300 mb-4 flex items-center gap-1"
          >
            ← Back
          </button>

          <div className="mb-4 space-y-1 " >
            <button onClick={()=>navigate("/notes")} className="w-full px-3 py-2 rounded-lg text-sm text-gray-200 bg-white/10 hover:bg-white/20 text-start font-medium"> <span className="text-lg font-extrabold">+</span> New Notes</button>

            <hr className="border-white/10 mb-4" />

            <h2 className="mb-4 text-lg font-bold text-white ">
              📚 Your Notes
            </h2>

            {/* list */}
            {topics.length === 0 && (
              <p className="text-sm text-gray-400">No notes created yet</p>
            )}

            <ul className="space-y-3">
              {topics.map((t, i)=>(
            <li key={i} 
            onClick ={()=>openNotes(t._id)}
            className={`cursor-pointer rounded-xl p-3  transition-all border
              
              ${activeNoteId === t._id 
              ? "bg-cyan-100 border-l-cyan-500 border-cyan-200 shadow-sm"
              :" bg-slate-100  border-slate-200  border-l-2 border-l-cyan-500 hover:bg-cyan-50 hover:border-l-cyan-400 shadow-sm"}
              `}>
                    <p className="text-sm font-bold text-[#16325B]">{t.topic}</p>

                    <div className="flex flex-wrap gap-1.5 mt-2"> 

                      {t.classLevel && 
                      <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700 text-[10px] font-medium">Class Level : {t.classLevel}</span>
                      }
                      {t.examType && 
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-medium">{t.examType}</span>
                      }
                    </div>

                    <div className="flex gap-3 mt-1.5 text-[10px] text-slate-500">
                      {t.revisionMode && <span>🔥Revision</span>}
                      {t.includeDiagram && <span>📊 Diagram</span>}
                      {t.includeChart && <span>📈 Chart</span>}
                    </div>
                </li>
              ))}
            </ul>
          </div>
          </motion.div>

            
          <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 min-h-[75vh]"
        >
          {loading ? (
            <div className="flex items-center justify-center min-h-[75vh]">
              <p className="text-slate-400 font-medium animate-pulse">Loading notes...</p>
            </div>
          ) : !selectedNote ? (
            <div className="flex flex-col items-center justify-center min-h-[75vh] text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-4xl mb-4">📖</div>
              <p className="text-slate-600 font-bold text-lg">Select a note to view</p>
              <p className="text-slate-400 text-sm mt-1">Click any note from the sidebar</p>
            </div>
          ) : (
            <FinalResult result={selectedNote} />
          )}
        </motion.div>

      </div>
      </div>
  )
}

export default History