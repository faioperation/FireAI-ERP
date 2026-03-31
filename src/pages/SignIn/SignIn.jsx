import React, { useState } from 'react';
import { Mail, Lock, CheckCircle, RefreshCcw, Stethoscope, ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";
import logo from "../../../src/assets/images/logo.png";
export default function SignIn() {
  const [screen, setScreen] = useState("login");
  

  // Reusable Container with the EXACT background palette from your reference
  const Container = ({ children, title, subtitle }) => (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFB]  relative overflow-hidden">
      
      {/* Background Palette - EXACTLY like the reference image colors */}
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#3ECF8E]/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-[#00A3FF]/15 blur-[100px]" />
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#FFD600]/10 blur-[80px]" />

      {/* Main Login Card - Glassmorphism style */}
      <div className="w-full max-w-[440px] bg-white/80 backdrop-blur-3xl p-10 rounded-[40px] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-10 flex flex-col items-center">
        
        {/* Logo Section */}
        <div className=" rounded-3xl  flex items-center justify-center mb-6">
          {/* <Stethoscope size={40} className="text-[#3ECF8E]" strokeWidth={2.5} /> */}
          <img  src={logo} alt="" />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mt-3">
            {subtitle || "Operational Dashboard"}
          </p>
        </div>

        {children}
      </div>
    </div>
  );

  // 1. LOGIN
  if (screen === "login") {
    return (
      <Container title="Sign In">
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-slate-400 ml-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#3ECF8E] transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="admin@example.com" 
                className="w-full p-5 pl-14 rounded-[22px] border border-slate-100 bg-[#FFF9F1] outline-none focus:ring-4 focus:ring-[#3ECF8E]/10 focus:border-[#3ECF8E] transition-all font-bold text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-slate-400 ml-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#3ECF8E] transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-5 pl-14 rounded-[22px] border border-slate-100 bg-[#FFF9F1] outline-none focus:ring-4 focus:ring-[#3ECF8E]/10 focus:border-[#3ECF8E] transition-all font-bold text-slate-700"
              />
            </div>
          </div>

          <div className="text-right">
            <button onClick={() => setScreen("forgot")} className="text-[#078177] text-sm font-black hover:underline">
              Forgot Password?
            </button>
          </div>

        <Link to="/">  <button 
            onClick={() => setScreen("changed")} 
            className="w-full bg-[#F97316] hover:bg-[#36B67C] text-white font-black py-5 rounded-[22px] text-lg shadow-lg shadow-[#3ECF8E]/20 active:scale-[0.98] transition-all"
          >
            Sign In
          </button>
          </Link>
        </div>
      </Container>
    );
  }

  // 2. FORGOT PASSWORD
  if (screen === "forgot") {
    return (
      <Container title="Forgot?" subtitle="Reset Your Password">
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-slate-400 ml-2">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-5 rounded-[22px] border border-slate-100 bg-[#FFF9F1] outline-none focus:border-[#3ECF8E] transition-all font-bold"
            />
          </div>
          <button 
            onClick={() => setScreen("otp")} 
            className="w-full bg-[#F97316] text-white font-black py-5 rounded-[22px] text-lg shadow-lg"
          >
            Send OTP
          </button>
          <button onClick={() => setScreen("login")} className="w-full text-slate-400 font-black text-sm flex items-center justify-center gap-2">
            <ArrowLeft size={16}/> Back to Login
          </button>
        </div>
      </Container>
    );
  }

  // 3. OTP SCREEN
  if (screen === "otp") {
    return (
      <Container title="Verify" subtitle="Enter 4-digit code">
        <div className="w-full space-y-8">
          <div className="flex justify-between gap-3">
            {[...Array(4)].map((_, i) => (
              <input 
                key={i} 
                type="text" 
                maxLength="1" 
                className="w-16 h-20 text-center rounded-[20px] border border-slate-100 bg-[#FFF9F1] text-3xl font-black text-[#3ECF8E] focus:border-[#3ECF8E] outline-none"
              />
            ))}
          </div>
          <button 
            onClick={() => setScreen("new")} 
            className="w-full bg-[#F97316] text-white font-black py-5 rounded-[22px] text-lg shadow-lg"
          >
            Verify OTP
          </button>
        </div>
      </Container>
    );
  }

  // 4. NEW PASSWORD
  if (screen === "new") {
    return (
      <Container title="Secure" subtitle="Setup New Password">
        <div className="w-full space-y-4">
          <input 
            type="password" 
            placeholder="New Password" 
            className="w-full p-5 rounded-[22px] border border-slate-100 bg-[#FFF9F1] outline-none focus:border-[#3ECF8E] font-bold"
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="w-full p-5 rounded-[22px] border border-slate-100 bg-[#FFF9F1] outline-none focus:border-[#3ECF8E] font-bold"
          />
          <button 
            onClick={() => setScreen("changed")} 
            className="w-full bg-[#F97316] text-white font-black py-5 rounded-[22px] text-lg shadow-lg mt-4"
          >
            Update Password
          </button>
        </div>
      </Container>
    );
  }

  // 5. SUCCESS
  if (screen === "changed") {
    return (
      <Container subtitle="Success">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-green-50 text-[#3ECF8E] rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-bounce">
            <CheckCircle size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Password Updated!</h3>
          <button 
            onClick={() => setScreen("login")} 
            className="w-full bg-[#F97316] text-white font-black py-5 rounded-[22px] text-lg"
          >
            Back to Login
          </button>
        </div>
      </Container>
    );
  }
}