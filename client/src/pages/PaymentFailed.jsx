import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiXCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./../services/api";
import { useNavigate } from "react-router-dom";
 
function PaymentFailed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(() => {
    getCurrentUser(dispatch);
    const t = setTimeout(() => navigate("/"), 5000);
    return () => clearTimeout(t);
  }, []);
 
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 gap-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-red-500 text-6xl"
      >
        <FiXCircle />
      </motion.div>
 
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-[#16325B]"
      >
        Payment Failed! No Credits Added
      </motion.h1>
 
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-slate-500 text-sm"
      >
        Redirecting to home...
      </motion.p>
    </div>
  );
}
 
export default PaymentFailed;