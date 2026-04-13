import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function AddPolicyModal({ isOpen, onClose }) {
  const { createPolicy, loading } = useStore()
  const [formData, setFormData] = useState({
    name: '',
    type: 'home',
    coverageAmount: '',
    premium: '',
    exclusions: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      coverageAmount: Number(formData.coverageAmount),
      premium: Number(formData.premium),
      exclusions: formData.exclusions.split(',').map(s => s.trim()).filter(Boolean)
    }
    const success = await createPolicy(payload)
    if (success) {
      onClose()
      setFormData({ name: '', type: 'home', coverageAmount: '', premium: '', exclusions: '' })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                onClick={onClose}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
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
  )
}
