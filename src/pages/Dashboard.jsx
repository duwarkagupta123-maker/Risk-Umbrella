import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, FileText, CheckCircle2, ShieldAlert, Umbrella } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function Dashboard() {
  const userName = useStore(state => state.userName)
  const healthScore = useStore(state => state.healthScore)
  const gaps = useStore(state => state.gaps)
  
  const [jargonInput, setJargonInput] = useState('')
  const [translation, setTranslation] = useState(null)

  const handleTranslate = () => {
    if (!jargonInput) return;
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-extrabold text-brand-textDark tracking-tight mb-2">Hello, {userName}</h1>
        <p className="text-gray-600 text-lg">Your overall protection is at <span className="font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded">{healthScore}%</span>. We've identified critical gaps in your coverage.</p>
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
          <p className="text-sm text-gray-600 mb-4">Paste complex policy jargon below to reveal coverage limits in simple terms.</p>
          
          <textarea 
            value={jargonInput}
            onChange={(e) => setJargonInput(e.target.value)}
            className="w-full bg-white p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-blue/20 outline-none resize-none h-32 mb-4 text-sm"
            placeholder="Paste your policy text here... (e.g., 'Section 4.2: Indemnity shall be limited to...')"
          />
          <button onClick={handleTranslate} className="w-full bg-brand-blue hover:bg-brand-indigo text-white font-semibold py-3 rounded-xl transition-colors text-sm mb-6 shadow-md shadow-brand-blue/20">
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
              <div className="absolute inset-x-0 bottom-1/2 w-full h-1/2 bg-brand-blue/90 rounded-t-full drop-shadow-xl overflow-hidden clip-umbrella">
                {/* Divide into sections */}
                <div className="absolute w-px h-full bg-white/20 left-1/3 bottom-0 origin-bottom transform -rotate-45"></div>
                <div className="absolute w-px h-full bg-white/20 left-2/3 bottom-0 origin-bottom transform rotate-45"></div>
              </div>
              {/* Umbrella Handle */}
              <div className="absolute top-1/2 w-2 h-20 bg-gray-700 right-[calc(50%-4px)] rounded-b-md"></div>
              <div className="absolute top-[calc(50%+80px)] w-6 h-6 border-4 border-t-0 border-gray-700 rounded-b-full right-[calc(50%-12px)]"></div>
              
              {/* Labels */}
              <span className="absolute top-1/4 left-1/4 text-white font-bold text-sm tracking-widest drop-shadow-md">Life</span>
              <span className="absolute top-1/4 right-1/4 text-white font-bold text-sm tracking-widest drop-shadow-md">Health</span>
              <span className="absolute bottom-1/4 left-6 text-white font-bold text-sm tracking-widest drop-shadow-md">Income</span>
              <span className="absolute bottom-1/4 right-6 text-white font-bold text-sm tracking-widest drop-shadow-md">Property</span>

              {/* Warnings */}
              {!gaps.find(g=>g.type==='flood').patched && (
                <div className="absolute top-1/4 right-0 transform translate-x-1/2 px-3 py-1 bg-red-500/80 backdrop-blur text-white text-[10px] font-bold uppercase rounded-full shadow-lg border border-red-400 whitespace-nowrap flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> No Flood Cover
                </div>
              )}
              {!gaps.find(g=>g.type==='disability').patched && (
                <div className="absolute bottom-1/3 left-0 transform -translate-x-1/4 px-3 py-1 bg-red-600 shadow-red-500/50 shadow-lg text-white text-[10px] font-bold uppercase rounded-full whitespace-nowrap flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> No Disability
                </div>
              )}
            </div>

            {/* Overall Protection Status */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-8 py-4 rounded-2xl shadow-xl shadow-brand-blue/5 text-center border border-red-100">
               <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Protection Status</div>
               <div className="text-red-700 font-bold mb-1">Umbrella Breach Detected</div>
               <div className="text-xs text-gray-500">Add natural disaster riders to seal the leaks.</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seal the gaps banner */}
            <div className="bg-brand-indigo rounded-3xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-brand-indigo/20 md:col-span-2">
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Umbrella className="w-64 h-64" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-3">Market Intelligence</span>
                  <h3 className="text-2xl font-bold mb-2">Seal the Gaps?</h3>
                  <p className="text-indigo-100 text-sm">Our algorithm found 3 market alternatives that offer <span className="text-orange-400 font-bold">full flood coverage</span> for a similar premium.</p>
                </div>
                <button className="bg-white text-brand-indigo font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition w-full md:w-auto text-sm shrink-0 shadow-lg">
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
                  <p className="text-sm text-gray-500 mt-2">Top 10% of users in Mumbai</p>
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
                   <h3 className="text-4xl font-extrabold text-brand-blue">₹8,500<span className="text-xl text-gray-400 font-normal">/mo</span></h3>
                   <p className="text-sm font-medium text-gray-600 mt-2">Next billing on Oct 12, 2023</p>
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
