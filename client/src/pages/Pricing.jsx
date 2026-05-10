

import React, { useState } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from './../App';
 
const PLANS = [
  {
    title: "Starter",
    price: "₹99",
    amount: 99,
    credits: "50 Credits",
    description: "Perfect for quick revisions",
    features: [
      "Generate AI notes",
      "Exam-focused answers",
      "Diagram & charts support",
      "Fast generation"
    ]
  },
  {
    title: "Pro",
    price: "₹199",
    amount: 199,
    credits: "120 Credits",
    description: "Best for regular exam prep",
    features: [
      "Everything in Starter",
      "Priority generation",
      "Revision mode",
      "Download PDF"
    ],
    popular: true
  },
  {
    title: "Elite",
    price: "₹349",
    amount: 349,
    credits: "250 Credits",
    description: "For serious exam warriors",
    features: [
      "Everything in Pro",
      "Unlimited diagrams",
      "Chart generation",
      "Full history access"
    ]
  }
]
 
function Pricing() {
  const navigate = useNavigate()
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [paying, setPaying] = useState(false)
  const [payingAmount, setPayingAmount] = useState(null)
 
  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount)
      setPaying(true)

      const result = await axios.post(`${serverUrl}/api/credit/order` , {amount} , {withCredentials:true})

      if(result.data.url){
        window.location.href = result.data.url //change url to stripe url
      }
      //after payment - rendered to either success or failed page 
      setPaying(false)
      
    } catch (error) {
      console.error("Payment error:", error)
      setPaying(false)
    }
  }
 
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 px-6 md:px-12 font-sans selection:bg-cyan-100 pb-20">
 
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mt-6 rounded-2xl bg-[#16325B] border border-white/10 px-4 md:px-8 py-4 md:py-5 shadow-xl flex items-center justify-between mb-10"
      >
        <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 shadow-inner">
            <img src="logo.png" alt="NeevAI logo" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">NeevAI</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-semibold hidden md:block">
              AI-powered exam oriented notes & revision
            </p>
          </div>
        </div>
 
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-cyan-300 hover:text-white transition flex items-center gap-1"
        >
          ⬅️ Back
        </button>
      </motion.header>
 
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-black text-[#16325B]">Buy Credits</h2>
        <p className="text-slate-500 mt-2 text-sm font-medium">
          Choose a plan that fits your study needs
        </p>
      </motion.div>
 
      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan, i) => (
          <PricingCard
            key={i}
            {...plan}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onBuy={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />
        ))}
      </div>
 
    </div>
  )
}
 
function PricingCard({ title, price, amount, credits, description, features, popular, selectedPrice, setSelectedPrice, onBuy, paying, payingAmount }) {
 
  const isSelected = selectedPrice === amount
  const isPayingThisCard = paying && payingAmount === amount
 
  return (
    <motion.div
      onClick={() => setSelectedPrice(amount)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`relative cursor-pointer rounded-2xl p-6 bg-white border-2 shadow-lg transition-all
        ${isSelected
          ? "border-cyan-500 shadow-cyan-100"
          : popular
          ? "border-[#16325B]"
          : "border-slate-100 hover:border-cyan-200"
        }`}
    >
      {/* Popular badge */}
      {popular && !isSelected && (
        <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full bg-[#16325B] text-cyan-300 uppercase tracking-wide">
          Popular
        </span>
      )}
 
      {/* Selected badge */}
      {isSelected && (
        <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full bg-cyan-500 text-white uppercase tracking-wide">
          Selected ✓
        </span>
      )}
 
      {/* Plan info */}
      <h2 className="text-lg font-black text-[#16325B]">{title}</h2>
      <p className="text-xs text-slate-400 mt-1 font-medium">{description}</p>
 
      {/* Price */}
      <div className="mt-4 mb-5">
        <p className="text-4xl font-black text-[#16325B]">{price}</p>
        <p className="text-xs font-bold text-cyan-600 mt-0.5">💠 {credits}</p>
      </div>
 
      {/* Buy button */}
      <button
        disabled={isPayingThisCard}
        onClick={(e) => {
          e.stopPropagation()//clicks only in button , not card
          onBuy(amount)
        }}
        className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all
          ${isPayingThisCard
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : isSelected
            ? "bg-[#16325B] text-white hover:bg-[#1e3f70]"
            : "bg-slate-100 text-slate-600 hover:bg-cyan-50 hover:text-cyan-700"
          }`}
      >
        {isPayingThisCard ? "Processing..." : isSelected ? "Buy Now →" : "Select Plan"}
      </button>
 
      {/* Divider */}
      <div className="border-t border-slate-100 my-4" />
 
      {/* Features */}
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
            <span className="text-cyan-500 font-bold">✓</span>
            {f}
          </li>
        ))}
      </ul>
 
    </motion.div>
  )
}
 
export default Pricing
 