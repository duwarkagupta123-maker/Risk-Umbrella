import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sliders, AlertTriangle, Briefcase, TrendingDown, Share2, ShieldAlert, Lightbulb } from 'lucide-react'

export default function Simulator() {
  const [homeValue, setHomeValue] = useState('85,00,000')
  const [carValue, setCarValue] = useState('12,00,000')
  const [annualIncome, setAnnualIncome] = useState('24,00,000')
  const [dependents, setDependents] = useState('3')
  
  const [simulated, setSimulated] = useState(false)

  const handleSimulate = () => {
    setSimulated(true)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-extrabold text-[#111827] tracking-tight mb-3">
          Risk Simulator
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Stress-test your financial umbrella. Input your assets and simulate real-world events to see how your current coverage holds up.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Input Panel */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex-1 lg:max-w-md relative overflow-hidden flex flex-col justify-between">
           
           <div className="space-y-8">
             <h3 className="text-xl font-bold text-brand-blue flex items-center gap-2">
               <Sliders className="w-5 h-5 text-brand-blue" />
               Asset Profile
             </h3>

             <div className="space-y-6">
               <div>
                 <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Home Value (₹)</label>
                 <input 
                   type="text" 
                   value={homeValue}
                   onChange={e => setHomeValue(e.target.value)}
                   className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-transparent hover:border-gray-200 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm font-bold text-gray-800 transition-colors" 
                 />
               </div>

               <div>
                 <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Car Value (₹)</label>
                 <input 
                   type="text" 
                   value={carValue}
                   onChange={e => setCarValue(e.target.value)}
                   className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-transparent hover:border-gray-200 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm font-bold text-gray-800 transition-colors" 
                 />
               </div>

               <div className="flex gap-4">
                 <div className="flex-1">
                   <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Annual Income (₹)</label>
                   <input 
                     type="text" 
                     value={annualIncome}
                     onChange={e => setAnnualIncome(e.target.value)}
                     className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-transparent hover:border-gray-200 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm font-bold text-gray-800 transition-colors" 
                   />
                 </div>
                 <div className="w-1/3">
                   <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Dependents</label>
                   <input 
                     type="text" 
                     value={dependents}
                     onChange={e => setDependents(e.target.value)}
                     className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-transparent hover:border-gray-200 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm font-bold text-gray-800 transition-colors text-center" 
                   />
                 </div>
               </div>
             </div>
           </div>

           <div className="space-y-6 mt-12 relative z-10">
             <div className="w-full h-[1px] bg-gray-100 absolute -top-6 left-0"></div>
             
             <h3 className="text-xl font-bold text-brand-blue flex items-center gap-2">
               <span className="text-brand-blue">⚡</span>
               Select Simulation
             </h3>

             <div className="space-y-4">
               <div>
                 <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">General Event</label>
                 <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-blue text-sm font-medium text-gray-800 appearance-none bg-white">
                   <option>House fire</option>
                 </select>
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Life Event</label>
                 <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-blue text-sm font-medium text-gray-800 appearance-none bg-white">
                   <option>Disability</option>
                 </select>
               </div>
             </div>

             <button 
               onClick={handleSimulate}
               className="w-full bg-brand-indigo hover:bg-brand-blue text-white font-bold py-4 rounded-xl transition-all shadow-lg mt-4 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
             >
               SIMULATE IMPACT
             </button>
           </div>
        </div>

        {/* Results Visual */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-3xl font-extrabold text-brand-blue mb-1">Simulation Results</h3>
                <p className="text-sm text-gray-500 font-medium">Projected impact based on chosen events</p>
              </div>
              <div className="bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" /> HIGH RISK ALERT
              </div>
            </div>
            
            {simulated ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Circle Graph */}
                  <div className="w-48 h-48 rounded-[2rem] bg-gray-50 flex items-center justify-center relative shadow-inner border border-gray-100 shrink-0 mx-auto md:mx-0">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="96" cy="96" r="76" fill="none" stroke="#f3f4f6" strokeWidth="16" />
                      <circle cx="96" cy="96" r="76" fill="none" stroke="#92400e" strokeWidth="16" strokeDasharray="477" strokeDashoffset="286" className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="text-center z-10">
                      <div className="text-3xl font-extrabold text-brand-blue">40%</div>
                      <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-tight mt-1">College Fund<br/>Reduction</div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Repair Bill</div>
                        <div className="text-xl font-extrabold text-brand-blue">₹2,50,000</div>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                        <TrendingDown className="w-6 h-6 text-indigo-500" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Income Loss</div>
                        <div className="text-xl font-extrabold text-brand-blue">₹12,00,000</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-indigo rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-brand-indigo/20 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div>
                     <div className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Out-of-pocket Total</div>
                     <div className="text-5xl font-bold tracking-tight">₹5,00,000</div>
                   </div>
                   <div className="text-sm text-indigo-100 max-w-[200px] leading-relaxed md:border-l md:border-indigo-400/30 md:pl-6 text-center md:text-left">
                     This exceeds your current emergency liquidity by <span className="text-orange-400 font-bold">₹1,50,000</span>.
                   </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <button className="flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold text-gray-600 hover:text-brand-blue transition-colors">
                    <Share2 className="w-4 h-4" /> SHARE RESULTS
                  </button>
                  <button className="flex-1 bg-[#92400e] hover:bg-[#78350f] text-white py-4 rounded-full text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95">
                    UPDATE MY POLICY
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                 Run simulation to view results
              </div>
            )}
          </div>

          {/* Tips Section */}
          {simulated && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                  <ShieldAlert className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue mb-2 text-lg">Coverage Gap Found</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Your current Term Life policy does not cover total permanent disability. Consider adding a Rider.</p>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="bg-orange-50 p-2 rounded-lg shrink-0">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue mb-2 text-lg">Deductible Tip</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Increasing your home deductible by ₹10k could lower your monthly premium by 12%.</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  )
}
