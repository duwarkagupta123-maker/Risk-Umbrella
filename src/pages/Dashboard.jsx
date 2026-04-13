import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, FileText, CheckCircle2, ShieldAlert, Umbrella, Loader2 } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import AddPolicyModal from '../components/AddPolicyModal'
import FileUploader from '../components/FileUploader'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, policies, healthScore, gaps, fetchPolicies, loading } = useStore()
  const userName = user?.name || 'there'
  
  const [selectedFile, setSelectedFile] = useState(null)
  const [translation, setTranslation] = useState(null)
  const [isAddPolicyModalOpen, setIsAddPolicyModalOpen] = useState(false)

  useEffect(() => {
    fetchPolicies()
  }, [fetchPolicies])

  const handleTranslate = () => {
    if (!selectedFile) return;
    setTranslation({
      risks: [
        { id: 1, type: 'FLOOD EXCLUSION', desc: 'You are responsible for 100% of costs in a flood event. Estimated risk: ₹45L+.', action: 'Critical' },
        { id: 2, type: 'DISABILITY EXCLUSION', desc: 'You have zero income protection if unable to work. Monthly gap: ₹1.2L.', action: 'Critical' }
      ],
      safe: [
        'Fire damage covered up to ₹50L',
        'Theft covered up to ₹10L'
      ]
    })
  }

  const totalMonthlyPremium = policies.reduce((acc, p) => acc + (p.premium || 0), 0)
  const totalCoverage = policies.reduce((acc, p) => acc + (p.coverageAmount || 0), 0)
  const hasGaps = policies.some(p => p.exclusions && p.exclusions.length > 0) || policies.length < 3

  return (
    <div className="space-y-6">
      <AddPolicyModal isOpen={isAddPolicyModalOpen} onClose={() => setIsAddPolicyModalOpen(false)} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-brand-textDark tracking-tight mb-2">Hello, {userName}</h1>
          <p className="text-gray-600 text-lg">
            Your overall protection is at <span className="font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded">{healthScore}%</span>. 
            {policies.length === 0 ? " You haven't added any policies yet." : ` We've identified ${hasGaps ? 'critical gaps' : 'some areas to optimize'} in your coverage.`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {loading && (
            <div className="flex items-center gap-2 text-brand-blue font-medium text-sm bg-blue-50 px-4 py-2 rounded-full border border-blue-100 italic">
              <Loader2 className="w-4 h-4 animate-spin" /> Updating shields...
            </div>
          )}
          <button onClick={() => setIsAddPolicyModalOpen(true)} className="bg-brand-blue hover:bg-brand-indigo text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-brand-blue/20 hover:scale-105 active:scale-95 whitespace-nowrap text-sm flex items-center gap-2 shrink-0">
            <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">+</span> Add Policy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Policy Decoder */}
        <div className="glass rounded-3xl p-6 lg:col-span-1 border-t-4 border-t-brand-blue flex flex-col">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-brand-blue p-2 rounded-xl">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-brand-blue">Policy Decoder</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Upload a policy document to reveal coverage limits in simple terms.</p>
          
          <div className="mb-4">
            <FileUploader onFileSelected={(file) => {
              setSelectedFile(file)
              setTranslation(null)
            }} />
          </div>
          <button onClick={handleTranslate} className="w-full bg-brand-blue hover:bg-brand-indigo text-white font-semibold py-3 rounded-xl transition-all text-sm mb-6 shadow-md shadow-brand-blue/20 hover:scale-105 active:scale-95">
            TRANSLATE POLICY
          </button>

          {translation && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
              <div className="flex items-center mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Critical Risk Exposure</span>
                <div className="flex-grow border-t border-gray-200 ml-3"></div>
                <div className="w-2 h-2 rounded-full bg-red-500 ml-3"></div>
              </div>
              
              <div className="space-y-3 mb-6">
                {translation.risks.map(risk => (
                  <div key={risk.id} className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-red-700">{risk.type}</h4>
                      <p className="text-xs text-red-900/80 mt-1 leading-relaxed" dangerouslySetInnerHTML={{__html: risk.desc.replace(/100% of costs/g, '<strong>100% of costs</strong>').replace(/zero income protection/g, '<strong>zero income protection</strong>')}}></p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Full Analysis Result</div>
              <div className="space-y-2">
                {translation.safe.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-3 flex items-center space-x-3 border border-gray-100 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right side layout */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          
          {/* Coverage Visualization */}
          <div className="glass rounded-3xl p-6 relative overflow-hidden flex-grow flex items-center justify-center border border-white/60">
            <h2 className="absolute top-6 left-6 text-xl font-bold text-brand-blue z-10">Coverage Visualization<br/><span className="text-sm font-normal text-gray-500">The Visual Umbrella Blueprint</span></h2>
            
            <div className="relative w-72 h-72 rounded-full border-2 border-dashed border-gray-300 mt-12 flex items-center justify-center">
              {/* Umbrella Canvas SVG representation */}
              <div className={`absolute inset-x-0 bottom-1/2 w-full h-1/2 rounded-t-full drop-shadow-xl overflow-hidden clip-umbrella transition-colors duration-700 ${policies.length > 0 ? 'bg-brand-blue/90' : 'bg-gray-200'}`}>
                {/* Divide into sections */}
                <div className="absolute w-px h-full bg-white/20 left-1/3 bottom-0 origin-bottom transform -rotate-45"></div>
                <div className="absolute w-px h-full bg-white/20 left-2/3 bottom-0 origin-bottom transform rotate-45"></div>
              </div>
              {/* Umbrella Handle */}
              <div className="absolute top-1/2 w-2 h-20 bg-gray-700 right-[calc(50%-4px)] rounded-b-md"></div>
              <div className="absolute top-[calc(50%+80px)] w-6 h-6 border-4 border-t-0 border-gray-700 rounded-b-full right-[calc(50%-12px)]"></div>
              
              {/* Labels */}
              <span className={`absolute top-1/4 left-1/4 font-bold text-sm tracking-widest drop-shadow-md ${policies.some(p => p.type === 'life') ? 'text-white' : 'text-gray-400'}`}>Life</span>
              <span className={`absolute top-1/4 right-1/4 font-bold text-sm tracking-widest drop-shadow-md ${policies.some(p => p.type === 'health') ? 'text-white' : 'text-gray-400'}`}>Health</span>
              <span className={`absolute bottom-1/4 left-6 font-bold text-sm tracking-widest drop-shadow-md ${policies.some(p => p.type === 'income') ? 'text-white' : 'text-gray-300'}`}>Income</span>
              <span className={`absolute bottom-1/4 right-6 font-bold text-sm tracking-widest drop-shadow-md ${policies.some(p => p.type === 'property' || p.type === 'home') ? 'text-white' : 'text-gray-300'}`}>Property</span>
            </div>

            {/* Overall Protection Status */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-2xl shadow-xl shadow-brand-blue/5 text-center border ${hasGaps ? 'border-red-100' : 'border-green-100'}`}>
               <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${hasGaps ? 'text-red-500' : 'text-green-500'}`}>Protection Status</div>
               <div className={`font-bold mb-1 ${hasGaps ? 'text-red-700' : 'text-green-700'}`}>{hasGaps ? 'Umbrella Breach Detected' : 'Umbrella Fully Intact'}</div>
               <div className="text-xs text-gray-500">{hasGaps ? 'Add natural disaster riders to seal the leaks.' : 'Your portfolio is optimally balanced.'}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seal the gaps banner */}
            <div className="bg-brand-indigo rounded-3xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-brand-indigo/20 md:col-span-2">
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <UmbrellaSVG className="w-64 h-64" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-3">Market Intelligence</span>
                  <h3 className="text-2xl font-bold mb-2">Seal the Gaps?</h3>
                  <p className="text-indigo-100 text-sm">Our algorithm found market alternatives that offer <span className="text-orange-400 font-bold">full coverage</span> for a similar premium.</p>
                </div>
                <button 
                  onClick={() => navigate('/coverage')}
                  className="bg-white text-brand-indigo font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all w-full md:w-auto text-sm shrink-0 shadow-lg hover:scale-105 active:scale-95"
                >
                  COMPARE NOW
                </button>
              </div>
            </div>

            {/* Health Score widget */}
            <div className="glass rounded-3xl p-6 flex flex-col justify-center h-[160px]">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Health Score</span>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-5xl font-extrabold text-brand-blue">{healthScore < 80 ? 'Good' : 'Excellent'}</h3>
                  <p className="text-sm text-gray-500 mt-2">Active shields: {policies.length}</p>
                </div>
                <div className="w-20 h-20 rounded-full border-[6px] border-orange-500 border-t-orange-100 flex items-center justify-center text-xl font-bold text-brand-blue transform rotate-45">
                   <span className="-rotate-45">{healthScore}%</span>
                </div>
              </div>
            </div>

            {/* Monthly Premium widget */}
            <div className="glass rounded-3xl p-6 flex flex-col justify-center h-[160px]">
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Monthly Premium</span>
               <div className="flex justify-between items-end">
                 <div>
                   <h3 className="text-4xl font-extrabold text-brand-blue">₹{totalMonthlyPremium.toLocaleString()}<span className="text-xl text-gray-400 font-normal">/mo</span></h3>
                   <p className="text-sm font-medium text-gray-600 mt-2">Total coverage: ₹{(totalCoverage / 100000).toFixed(1)}L</p>
                 </div>
                 <div className="bg-orange-100 p-3 rounded-xl">
                   <div className="w-6 h-4 bg-orange-500 rounded flex items-center justify-center relative">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function UmbrellaSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M2 12s5-3 10-3 10 3 10 3" />
      <path d="M12 9c2.1 0 4 .9 5.4 2.4" />
      <path d="M6.6 11.4C8 9.9 9.9 9 12 9" />
    </svg>
  )
}
