import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import MermaidSetup from './MermaidSetup';
import { motion, AnimatePresence } from "framer-motion";
import RechartSetup from "./RechartSetup";
import { downloadPdf } from './../services/api.js';


const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-xl font-black text-[#16325B] mt-6 mb-3 border-b border-slate-100 pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-bold text-[#16325B] mt-5 mb-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-slate-700 mt-4 mb-1">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-slate-600 leading-relaxed mb-3 text-sm">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-5 space-y-1 text-slate-600 mb-3">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="text-sm leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#16325B]">{children}</strong>
  ),
};


function FinalResult({ result }) {
 const [activeTab, setActiveTab] = useState("notes");

 if (
    !result ||
    !result.notes ||
    !result.revisionPoints
  ) {
    return null;
  }

  const hasDiagram = result.diagram?.data && result.diagram.data.trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden"
    >

      {/* Header */}
      <div className="bg-[#16325B] px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-white font-black text-base tracking-tight">📘 Generated Notes</p>
          <p className="text-cyan-300 text-[10px] mt-0.5 font-medium uppercase tracking-widest">
            AI-powered exam material
          </p>
        </div>
 
        {/* Download button */}
        <button
          onClick={()=>downloadPdf(result)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition"
        >
          📄 Download PDF
        </button>
      </div>


      {/* Tab Buttons —  4 buttons */}
      <div className="flex gap-2 px-6 pt-4 pb-0">
 
        <button
          onClick={() => setActiveTab("notes")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all
            ${activeTab === "notes"
              ? "bg-[#16325B] text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
        >
          📝 Notes
        </button>
 
        <button
          onClick={() => setActiveTab("revision")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all
            ${activeTab === "revision"
              ? "bg-[#16325B] text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
        >
          ⚡ Revision
        </button>
 
        {/* only show Diagram button if diagram exists */}
        {hasDiagram && (
          <button
            onClick={() => setActiveTab("diagram")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all
              ${activeTab === "diagram"
                ? "bg-[#16325B] text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
          >
            📊 Diagram
          </button>
        )}

        {/* chart */}
        {result.charts && result.charts.length > 0 && (<button
          onClick={() => setActiveTab("charts")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all
            ${activeTab === "charts"
              ? "bg-[#16325B] text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
        >
          📈 Charts
        </button>
        )}
 
      </div>

       {/* Divider */}
      <div className="mx-6 mt-3 border-t border-slate-100" />

      
      {/* Content — show based on activeTab */}
      <div className="p-6">
 
        {/* NOTES */}
        {activeTab === "notes" && (
          <ReactMarkdown components={markdownComponents}>
            {result.notes}
          </ReactMarkdown>
        )}


        {/* REVISION */}
        {activeTab === "revision" && (
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-4">
              ⚡ Quick Revision Points
            </p>
            
             <ul className="space-y-2">
            {result.revisionPoints.map((point, i) => (
              <li key={i} className="flex gap-3 bg-cyan-50 border border-cyan-100 rounded-xl px-4 py-2.5">
                <span className="text-cyan-500 font-black text-xs shrink-0">{i + 1}.</span>
                <span className="text-slate-700 text-sm">{point}</span>
              </li>
            ))}
          </ul>
          </div>
        )}


        {/* DIAGRAM */}
        
        {activeTab === "diagram" && hasDiagram && (
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-4">
              📊 Topic Diagram
            </p>
            <MermaidSetup diagram={result.diagram.data} />
            <p className="mt-3 text-[11px] text-slate-400 italic">
              Take a screenshot to save this diagram for future reference.
            </p>
          </div>
        )}

        {/* charts */}
        {activeTab === "charts" && (
           <div>
          <RechartSetup charts={result.charts} />

          <p className="mt-3 text-[11px] text-slate-400 italic">
              Take a screenshot to save this diagram for future reference.
          </p>
           </div>
        )}
 
      </div>
    </motion.div>
  );
}

export default FinalResult;