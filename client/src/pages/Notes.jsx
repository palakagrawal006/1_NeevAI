import React ,{useState} from 'react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
import TopicForm from './../components/TopicForm';
import Sidebar from './../components/Sidebar';
import FinalResult from './../components/FinalResult';

function Notes() {
    const navigate = useNavigate()
    const {userData} = useSelector((state) =>state.user)
    const credits = userData?.credits || 0;

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

  return (
    <div className ="min-h-screen bg-[#F8FAFC] text-slate-900 px-6 md:px-12 font-sans selection:bg-cyan-100 pb-20">

      {/* header */}
        <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mt-6 rounded-2xl bg-[#16325B] border border-white/10 px-4  md:px-8 py-4 md:py-5 shadow-xl flex items-center justify-between gap-6"
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

            <button onClick={()=>navigate("/history")} className='flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition'> 
                📚 Your Notes
            </button>
        </div>
      </motion.header>

     

      <main className="max-w-7xl mx-auto px-6 mt-8 mb-24 flex flex-col gap-8">

          {/* TOP — TopicForm always full width */}
           <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-black text-[#16325B] mb-2">Create New Notes</h2>
              <p className="text-slate-500 text-sm mb-3 font-medium">
                Fill in the details below to generate your exam-ready material.
              </p>

            <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError}/>
          </motion.div>

          {loading && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-center text-black font-medium "
          >
            Generating exam-focused notes…
          </motion.div>
        )}

        {error && (
          <div className="mb-6 text-center text-red-600 font-medium">
            {error}
          </div>
        )}

         {/* BOTTOM — Awaiting placeholder */}
          {!result && !loading  && (<motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.01 }}
            className="h-65 rounded-3xl flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-200 text-slate-400 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-4xl mb-4 border border-slate-100">
              📘
            </div>
            <p className="text-base font-bold text-slate-600">Awaiting your topic...</p>
            <p className="text-xs text-slate-400 mt-2 max-w-[200px] text-center leading-relaxed">
              Once you submit the form, your smart notes and diagrams will appear here.
            </p>
          </motion.div>
           )}

           {/* BOTTOM — Sidebar + FinalResult after result */}
          {result && (
            <motion.div initial={{ opacity: 0 , y:30 }} 
            animate={{ opacity: 1 , y:0 }}
            transition={{duration: 0.4}}
            className = "grid grid-cols-12 gap-6">
                
                {/* sidebar */}
                <div className="col-span-12 lg:col-span-3">
                  <Sidebar result={result.data}/>
                </div>

                <div className="col-span-12 lg:col-span-9">
                  <FinalResult result={result.data}/>
                </div>
            </motion.div>
          )}
     </main>
     </div>
  )
}

export default Notes