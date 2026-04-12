import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Car, Heart, ShieldAlert, ArrowRight, CheckCircle2, XCircle, FileText, ChevronRight, Loader2 } from 'lucide-react'
import { useStore } from '../store/useStore'

const ICON_MAP = {
  home: { icon: Home, bg: 'bg-indigo-50', color: 'text-brand-blue' },
  car: { icon: Car, bg: 'bg-orange-50', color: 'text-orange-900' },
  life: { icon: Heart, bg: 'bg-red-50', color: 'text-red-900' }
}

export default function Policies() {
  const { policies, loading, error, fetchPolicies } = useStore()
  const [selectedPolicyId, setSelectedPolicyId] = useState(null)

  useEffect(() => {
    fetchPolicies()
  }, [fetchPolicies])

  // Set initial selection once policies are loaded
  useEffect(() => {
    if (policies.length > 0 && !selectedPolicyId) {
      setSelectedPolicyId(policies[0]._id)
    }
  }, [policies, selectedPolicyId])

  const selectedPolicy = policies.find(p => p._id === selectedPolicyId)

  if (loading && policies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-brand-blue animate-spin" />
        <p className="text-gray-500 font-medium italic">Fetching your protection portfolio...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight mb-2">
          Protection Portfolio
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          View and manage your active shields. We translate the legalese into plain English so you know exactly where you stand.
        </p>
        <button className="mt-4 bg-brand-blue hover:bg-brand-indigo text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
          <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">+</span> Add New Policy
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm flex items-center gap-3">
          <ShieldAlert className="w-5 h-5" />
          Error loading policies: {error}
        </div>
      )}

      {policies.length === 0 && !loading && (
        <div className="bg-white rounded-[2rem] p-12 text-center border-2 border-dashed border-gray-200">
          <Umbrella className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No policies found</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2">You haven't added any protection shields yet. Secure your future by adding your first policy.</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        
        {/* Left Side: Policy Cards */}
        <div className="flex-1 space-y-6">
          {policies.map((policy) => {
            const Config = ICON_MAP[policy.type] || ICON_MAP.home;
            const Icon = Config.icon;
            
            return (
              <motion.div 
                layout
                key={policy._id}
                onClick={() => setSelectedPolicyId(policy._id)}
                className={`bg-white rounded-[2rem] p-6 shadow-sm border transition-all cursor-pointer ${selectedPolicyId === policy._id ? 'border-brand-blue ring-1 ring-brand-blue shadow-lg' : 'border-gray-100 hover:border-gray-200 shadow-transparent'}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${Config.bg} rounded-2xl flex items-center justify-center shrink-0`}>
                      <Icon className={`w-7 h-7 ${Config.color} ${policy.type === 'life' ? 'fill-current' : ''}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-blue">{policy.name}</h3>
                      <p className="text-xs text-gray-500 font-medium mt-1">Policy #{policy._id.substring(policy._id.length - 8).toUpperCase()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${policy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                    {policy.status}
                  </span>
                </div>

                <div className="mb-6">
                  {policy.exclusions && policy.exclusions.length > 0 ? (
                    <>
                      <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-3">Coverage Gaps Detected</div>
                      <div className="space-y-2">
                        {policy.exclusions.slice(0, 2).map((exclusion, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-red-50/50 border border-red-100 rounded-xl p-3">
                            <div className="flex items-center gap-2 text-sm font-bold text-red-600">
                              <ShieldAlert className="w-4 h-4" /> Missing: {exclusion}
                            </div>
                            <button className="text-[10px] font-bold text-gray-500 uppercase underline decoration-gray-300 underline-offset-4 hover:text-gray-900">Translate to Risk</button>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="inline-flex items-center gap-2 bg-green-50/50 border border-green-200 rounded-full px-4 py-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> 
                      <span className="text-xs font-bold text-green-700 italic">Fully Covered — No Gaps Found</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-gray-50">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Coverage Amount</div>
                    <div className="text-3xl font-extrabold text-brand-blue">₹{policy.coverageAmount.toLocaleString()}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Right Side: Translation Panel */}
        <div className="lg:w-[450px]">
           <AnimatePresence mode="wait">
             {selectedPolicy ? (
               <motion.div 
                 key={selectedPolicy._id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="bg-brand-blue rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden sticky top-24"
               >
                  {/* Background flourish */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-blue-200 mb-6">
                    <span className="text-orange-400">✧</span> Plain-Language Translation
                  </div>

                  <h2 className="text-4xl font-extrabold mb-10">
                    {selectedPolicy.name}
                  </h2>

                  <div className="space-y-8">
                    {/* What's Covered */}
                    <div>
                      <h4 className="flex items-center gap-2 text-orange-400 font-bold mb-4">
                        <CheckCircle2 className="w-5 h-5" /> What's covered
                      </h4>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-blue-50 leading-relaxed font-medium">Full protection for {selectedPolicy.type} related incidents as per policy guidelines.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-blue-50 leading-relaxed font-medium">Premium of ₹{selectedPolicy.premium.toLocaleString()} covers all identified standard risks.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Exclusions */}
                    {selectedPolicy.exclusions && selectedPolicy.exclusions.length > 0 && (
                      <div className="pt-6 border-t border-white/10">
                        <h4 className="flex items-center gap-2 text-orange-400 font-bold mb-4">
                          <XCircle className="w-5 h-5" /> Major Exclusions
                        </h4>
                        <ul className="space-y-4">
                          {selectedPolicy.exclusions.map((exclusion, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                              <span className="text-sm text-blue-100 leading-relaxed italic">{exclusion}: Not covered in current version of your shield.</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-12 mb-2">
                    <button className="w-full bg-white hover:bg-gray-50 text-brand-blue font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
                      View Full Policy PDF <FileText className="w-5 h-5" />
                    </button>
                  </div>
               </motion.div>
             ) : (
               <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-8 h-full flex items-center justify-center text-center text-gray-400 italic">
                 Select a policy to see its plain-language translation.
               </div>
             )}
           </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

function Umbrella({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M2 12s5-3 10-3 10 3 10 3" />
      <path d="M12 9c2.1 0 4 .9 5.4 2.4" />
      <path d="M6.6 11.4C8 9.9 9.9 9 12 9" />
    </svg>
  )
}
