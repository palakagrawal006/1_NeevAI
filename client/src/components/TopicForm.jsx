import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateNotes } from "../services/api.js";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });

      setResult(result);
      setLoading(false);
      setClassLevel("");
      setTopic("");
      setExamType("");
      setIncludeChart(false);
      setIncludeDiagram(false);
      setRevisionMode(false);

      if (typeof result.creditsLeft === "number") {
        dispatch(updateCredits(result.creditsLeft));
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "Failed to fetch notes from server",
      );
      setLoading(false);
    }
  };

  // progress bar
  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }

    // if loading
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost done…");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizing notes…");
      } else if (value > 40) {
        setProgressText("Processing content…");
      } else {
        setProgressText("Generating notes…");
      }

      setProgress(Math.floor(value));
    }, 700); //700 milisec

    return () => clearInterval(interval);
  }, [loading]);

  const inputClass =
    "w-full rounded-xl px-4 py-2.5 bg-slate-50 border border-slate-200 placeholder-slate-400 text-[#16325B] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/40"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 — Topic full width */}
        <input
          type="text"
          className={inputClass}
          placeholder="Enter topic (e.g. Artificial Intelligence)"
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
        />

        {/* Row 2 — Class/Level + Exam Type side by side */}
        <div className="flex gap-3">
          <input
            type="text"
            className={inputClass}
            placeholder="Class/Level (e.g. B-Tech 3rd year)"
            onChange={(e) => setClassLevel(e.target.value)}
            value={classLevel}
          />
          <input
            type="text"
            className={inputClass}
            placeholder="Exam Type (e.g. RGPV, CBSE, MP-Board)"
            onChange={(e) => setExamType(e.target.value)}
            value={examType}
          />
        </div>

        {/* Row 3 — Toggles + Generate button */}
        <div className="flex items-center gap-3 flex-wrap">
          <Toggle
            label="Revision Mode"
            checked={revisionMode}
            onChange={() => setRevisionMode(!revisionMode)}
          />

              {/* line */}
          <div className="w-px h-5 bg-slate-200" />  
          <Toggle
            label="Include Diagram"
            checked={includeDiagram}
            onChange={() => setIncludeDiagram(!includeDiagram)}
          />

          <div className="w-px h-5 bg-slate-200" />
          <Toggle
            label="Include Chart"
            checked={includeChart}
            onChange={() => setIncludeChart(!includeChart)}
          />

          <motion.button
            onClick={handleSubmit}
            whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            disabled={loading}
            className={`ml-auto px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap
            ${
              loading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-[#16325B] text-white shadow-lg shadow-blue-900/20 hover:bg-[#1e447a]"
            }`}
          >
            {loading ? "Generating Notes.. " : "Generate Notes"}
          </motion.button>
        </div>

        {/* progress bar  & text*/}
        {loading && (
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.6 }}
                className="h-full  bg-linear-to-r from-cyan-500 to-blue-600"
              ></motion.div>
            </div>

            <div className="flex justify-between text-xs text-gray-300">
              <span className="">{progressText}</span>
              <span className="">{progress}%</span>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Please do not close or refresh the page
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// buttons
function Toggle({ label, checked, onChange }) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={onChange}
    >

      <motion.div
        animate={{
          backgroundColor: checked ? "#22D3EE" : "#E2E8F0",
        }}
        className="relative w-9 h-5 rounded-full shrink-0"
      >
        <motion.div
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
        ></motion.div>
      </motion.div>

       <span className={`text-xs font-semibold whitespace-nowrap transition-colors ${checked ? "text-cyan-600" : "text-slate-500"}`}>
        {label}
      </span>
    </div>
  );
}

export default TopicForm;
