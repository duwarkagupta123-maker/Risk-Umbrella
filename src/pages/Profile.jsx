import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Lock, CreditCard, ChevronRight, LogOut, CheckCircle2, Sparkles, AlertTriangle, Loader2, Globe } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, policies, logout, seedMockData, loading } = useStore()
  const navigate = useNavigate()
  const [seedSuccess, setSeedSuccess] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSeed = async () => {
    const success = await seedMockData()
    if (success) {
      setSeedSuccess(true)
      setTimeout(() => setSeedSuccess(false), 3000)
    }
  }

  const totalCoverage = policies.reduce((acc, p) => acc + (p.coverageAmount || 0), 0)
  const monthlyPremium = policies.reduce((acc, p) => acc + (p.premium || 0), 0)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 border border-white/60 shadow-xl shadow-brand-blue/5">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-blue to-indigo-400 p-1 shadow-lg shadow-brand-blue/20">
            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white">
              <User className="w-16 h-16 text-gray-300" />
            </div>
          </div>
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-brand-blue">{user?.name || 'Guest User'}</h1>
            <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block w-fit mx-auto md:mx-0">Verified Member</span>
          </div>
          <p className="text-gray-500 font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
             <Globe className="w-4 h-4" /> Global Coverage Enabled
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-white/60 px-4 py-2 rounded-2xl border border-white/40 shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Total Covered Assets</span>
              <span className="font-bold text-brand-blue">₹{(totalCoverage / 10000000).toFixed(2)} Cr</span>
            </div>
            <div className="bg-white/60 px-4 py-2 rounded-2xl border border-white/40 shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Monthly Outflow</span>
              <span className="font-bold text-brand-blue">₹{monthlyPremium.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-brand-blue mb-4 px-2">Account Settings</h2>
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
               <SettingItem icon={Shield} title="Identity Protection" desc="Two-factor authentication is active" active />
               <SettingItem icon={Bell} title="Risk Notifications" desc="Real-time alerts for policy breaches" />
               <SettingItem icon={CreditCard} title="Billing & Invoices" desc="Premium auto-pay is enabled" />
               <SettingItem icon={Lock} title="Privacy & Security" desc="Manage data sharing and visibility" last />
            </div>
          </section>

          {/* Hackathon Demo Seeding Tool */}
          <section>
            <div className="bg-gradient-to-br from-brand-indigo to-brand-blue rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-brand-indigo/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <Sparkles className="absolute top-8 right-8 w-12 h-12 text-white/20 animate-pulse" />
              
              <div className="relative z-10">
                 <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                   Demo Toolkit <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded uppercase">Hackathon Mode</span>
                 </h2>
                 <p className="text-indigo-100 text-sm mb-8 max-w-md">Instantly populate your account with a diversified portfolio of Home, Auto, and Life policies for a professional demonstration.</p>
                 
                 <button 
                  onClick={handleSeed}
                  disabled={loading}
                  className="bg-white text-brand-indigo font-bold px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                 >
                   {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : seedSuccess ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                   {loading ? 'PREPARING SHIELDS...' : seedSuccess ? 'PORTFOLIO SEEDED!' : 'GENERATE DEMO PORTFOLIO'}
                 </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
           <div className="glass rounded-3xl p-6 border-t-4 border-t-green-500">
              <h3 className="text-lg font-bold text-brand-blue mb-4">Security Health</h3>
              <div className="space-y-4">
                 <HealthBar label="Encryption" value={100} />
                 <HealthBar label="Verification" value={85} />
                 <HealthBar label="Shield Strength" value={92} />
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                 <div className="flex items-center gap-2 text-green-600 font-bold text-sm mb-2">
                    <CheckCircle2 className="w-4 h-4" /> Account is fully optimized
                 </div>
                 <p className="text-xs text-gray-500">Last security scan completed 2 hours ago.</p>
              </div>
           </div>

           <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
              <h3 className="text-lg font-bold text-red-700 mb-2">Danger Zone</h3>
              <p className="text-xs text-red-600/70 mb-6">Proceed with caution. These actions cannot be undone.</p>
              <button 
                onClick={handleLogout}
                className="w-full bg-white text-red-600 font-bold py-3 rounded-xl border border-red-200 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out from Device
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}

function SettingItem({ icon: Icon, title, desc, active, last }) {
  return (
    <div className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group ${!last && 'border-b border-gray-50'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${active ? 'bg-brand-blue/10 text-brand-blue' : 'bg-gray-100 text-gray-400 group-hover:bg-brand-blue/5 group-hover:text-brand-blue'} transition-all`}>
           <Icon className="w-6 h-6" />
        </div>
        <div>
           <h4 className="font-bold text-brand-blue">{title}</h4>
           <p className="text-xs text-gray-400 group-hover:text-gray-500">{desc}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-blue transition-all group-hover:translate-x-1" />
    </div>
  )
}

function HealthBar({ label, value }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <span>{label}</span>
        <span className="text-brand-blue">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-brand-blue to-indigo-400 rounded-full"
        />
      </div>
    </div>
  )
}
