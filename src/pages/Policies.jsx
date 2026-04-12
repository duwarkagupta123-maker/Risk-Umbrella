import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Car, Heart, ShieldAlert, ArrowRight, CheckCircle2, XCircle, FileText, ChevronRight, Loader2, X, Info } from 'lucide-react'
import { useStore } from '../store/useStore'

const ICON_MAP = {
  home: { icon: Home, bg: 'bg-indigo-50', color: 'text-brand-blue' },
  car: { icon: Car, bg: 'bg-orange-50', color: 'text-orange-900' },
  life: { icon: Heart, bg: 'bg-red-50', color: 'text-red-900' }
}

export default function Policies() {
  const { policies, loading, error, fetchPolicies, createPolicy } = useStore()
  const [selectedPolicyId, setSelectedPolicyId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'home',
    coverageAmount: '',
    premium: '',
    exclusions: ''
  })

  useEffect(() => {
    fetchPolicies()
  }, [fetchPolicies])

  useEffect(() => {
    if (policies.length > 0 && !selectedPolicyId) {
      setSelectedPolicyId(policies[0]._id)
    }
  }, [policies, selectedPolicyId])

  const handleAddPolicy = async (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      coverageAmount: Number(formData.coverageAmount),
      premium: Number(formData.premium),
      exclusions: formData.exclusions.split(',').map(s => s.trim()).filter(Boolean)
    }
    const success = await createPolicy(payload)
    if (success) {
      setIsModalOpen(false)
      setFormData({ name: '', type: 'home', coverageAmount: '', premium: '', exclusions: '' })
    }
  }

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight mb-2">
            Protection Portfolio
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            View and manage your active shields. We translate the legalese into plain English so you know exactly where you stand.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-blue hover:bg-brand-indigo text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-brand-blue/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">+</span> Add New Policy
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm flex items-center gap-3">
          <ShieldAlert className="w-5 h-5" />
          {error}
        </div>
      )}

      {policies.length === 0 && !loading && (
        <div className="bg-white rounded-[2rem] p-16 text-center border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No policies found</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-8">You haven't added any protection shields yet. Secure your future by adding your first policy.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-blue text-white px-8 py-3 rounded-xl font-bold transition-all hover:bg-brand-indigo"
          >
            Create Your First Policy
          </button>
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
                className={`bg-white rounded-[2rem] p-6 shadow-sm border transition-all cursor-pointer group ${selectedPolicyId === policy._id ? 'border-brand-blue ring-1 ring-brand-blue shadow-lg' : 'border-gray-100 hover:border-gray-200 shadow-transparent'}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${Config.bg} rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
                      <Icon className={`w-7 h-7 ${Config.color} ${policy.type === 'life' ? 'fill-current' : ''}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-blue">{policy.name}</h3>
                      <p className="text-xs text-gray-400 font-medium mt-1">Policy #{policy._id.substring(policy._id.length - 8).toUpperCase()}</p>
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
                            <div className="flex items-center gap-2 text-xs font-bold text-red-600">
                              <ShieldAlert className="w-4 h-4" /> Missing: {exclusion}
                            </div>
                            <button className="text-[10px] font-bold text-gray-400 uppercase underline decoration-gray-300 underline-offset-4 hover:text-gray-900">Translate</button>
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
                  <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue transition-all">
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
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-blue-200 mb-6">
                    <span className="text-orange-400">✧</span> Plain-Language Translation
                  </div>
                  <h2 className="text-4xl font-extrabold mb-10 leading-tight">
                    {selectedPolicy.name}
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 text-orange-400 font-bold mb-4">
                        <CheckCircle2 className="w-5 h-5" /> What's covered
                      </h4>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-blue-50 leading-relaxed">Full protection for {selectedPolicy.type} related incidents as per policy guidelines.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-blue-50 leading-relaxed">Premium of ₹{selectedPolicy.premium.toLocaleString()} covers all identified standard risks.</span>
                        </li>
                      </ul>
                    </div>

                    {selectedPolicy.exclusions && selectedPolicy.exclusions.length > 0 && (
                      <div className="pt-6 border-t border-white/10">
                        <h4 className="flex items-center gap-2 text-orange-400 font-bold mb-4">
                          <XCircle className="w-5 h-5" /> Major Exclusions
                        </h4>
                        <ul className="space-y-4">
                          {selectedPolicy.exclusions.map((exclusion, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                              <span className="text-sm text-blue-100 leading-relaxed italic">{exclusion}: Not covered in current version.</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-12 mb-2">
                    <button className="w-full bg-white hover:bg-gray-50 text-brand-blue font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      View Full Policy PDF <FileText className="w-5 h-5" />
                    </button>
                  </div>
               </motion.div>
             ) : (
               <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 h-[400px] flex flex-col items-center justify-center text-center">
                 <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                   <Info className="w-8 h-8 text-gray-300" />
                 </div>
                 <p className="text-gray-400 italic">Select a policy to see its<br />plain-language translation</p>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* Add Policy Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-blue/30 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-3xl font-extrabold text-brand-blue">Add New Shield</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddPolicy} className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Policy Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. My Primary Life Cover"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Type</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-blue outline-none transition-all font-semibold text-brand-blue"
                    >
                      <option value="home">Property / Home</option>
                      <option value="car">Vehicle / Car</option>
                      <option value="life">Term/Life</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Status</label>
                    <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-green-700 font-bold text-center">Active</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Coverage (₹)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.coverageAmount}
                      onChange={e => setFormData({...formData, coverageAmount: e.target.value})}
                      placeholder="5000000"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-blue outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Premium (₹/mo)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.premium}
                      onChange={e => setFormData({...formData, premium: e.target.value})}
                      placeholder="1200"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-blue outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Exclusions (optional)</label>
                  <input 
                    type="text" 
                    value={formData.exclusions}
                    onChange={e => setFormData({...formData, exclusions: e.target.value})}
                    placeholder="Flood, Earthquake, Theft (comma separated)"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-blue outline-none transition-all mb-1"
                  />
                  <p className="text-[10px] text-gray-400 italic px-1">Exclusions will be translated into visual gaps on your dashboard.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-brand-blue hover:bg-brand-indigo text-white font-bold py-4 rounded-2xl shadow-xl shadow-brand-blue/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? 'CALCULATING RISK...' : 'ADD TO PORTFOLIO'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
