import { Home, User, AlertTriangle, ShieldCheck, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function Coverage() {
  const patchGap = useStore(state => state.patchGap)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 mt-2">
          <ShieldCheck className="w-3 h-3 mr-1" /> Premium Comparison
        </div>
        <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight mb-3">
          Policy <span className="text-orange-600">Intelligence</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          We've analyzed your current 'My Home Policy' against the top market alternatives. Here is how your protection layers stack up.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
        
        {/* Features Legend */}
        <div className="space-y-8 lg:w-48 py-8 hidden lg:block">
          {[
            { icon: Home, label: 'Property Structure' },
            { icon: User, label: 'Liability Coverage' },
            { icon: AlertTriangle, label: 'Natural Disasters' },
            { icon: ShieldCheck, label: 'Annual Premium' }
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-4 h-16">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                <item.icon className="w-5 h-5 text-brand-blue" />
              </div>
              <span className="font-bold text-gray-800 text-sm">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Current Policy Card */}
        <div className="bg-white/60 backdrop-blur border border-white/80 rounded-[2rem] p-8 flex-1 relative shadow-sm">
          <div className="flex justify-between items-start mb-8">
             <div>
               <h3 className="text-xl font-bold text-brand-blue mb-1">My Home Policy</h3>
               <p className="text-xs text-gray-500">Insured since March 2021</p>
             </div>
             <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Current</span>
          </div>

          <div className="space-y-10">
             <div className="h-16 flex flex-col justify-center">
              <div className="flex justify-between items-end mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>Coverage Limit</span>
                <span className="text-xl font-extrabold text-gray-900">$750,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-brand-blue h-full w-[70%]"></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Standard replacement cost included.</p>
            </div>

            <div className="h-16 flex flex-col justify-center space-y-2">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-orange-600" />
                 <span className="font-bold text-sm text-gray-800">$1,000,000 Liability</span>
               </div>
               <div className="flex items-center gap-2">
                 <XCircle className="w-4 h-4 text-gray-400" />
                 <span className="font-medium text-sm text-gray-500">Identity Theft Protection</span>
               </div>
            </div>

            <div className="h-16 flex items-center">
               <div className="w-full bg-gray-100 rounded-xl p-4 flex items-center justify-center gap-2">
                 <AlertTriangle className="w-4 h-4 text-gray-600" />
                 <span className="text-sm font-bold text-gray-600">Flood protection excluded</span>
               </div>
            </div>

            <div className="h-16 flex flex-col items-center justify-center border-t border-gray-200 mt-6 pt-8">
               <div className="text-4xl font-extrabold text-brand-blue">$1,840</div>
               <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Per Year</div>
            </div>
          </div>
        </div>

        {/* Alternative Card */}
        <div className="bg-white rounded-[2rem] p-8 flex-1 relative shadow-2xl shadow-brand-blue/10 border border-gray-100 transform lg:-translate-y-4">
          <div className="absolute top-0 right-10 transform -translate-y-1/2">
             <div className="bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-orange-500/30">
               Best Value
             </div>
          </div>

          <div className="flex justify-between items-start mb-8">
             <div>
               <h3 className="text-2xl font-extrabold text-brand-blue mb-1">Market Alternative</h3>
               <p className="text-xs text-gray-500">Risk Umbrella Platinum Plus</p>
             </div>
             <div className="text-right">
               <span className="text-orange-600 font-extrabold text-sm block">Save $320</span>
               <span className="text-xs text-gray-500">Switching bonus</span>
             </div>
          </div>

          <div className="space-y-10">
             <div className="h-16 flex flex-col justify-center">
              <div className="flex justify-between items-end mb-2 text-xs font-bold text-brand-blue uppercase tracking-widest">
                <span>Extended Coverage</span>
                <span className="text-2xl font-extrabold text-brand-blue">$950,000</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-brand-indigo h-full w-[95%]"></div>
              </div>
              <p className="text-xs text-brand-blue/80 mt-2 font-medium">Includes 125% Extended Replacement Cost.</p>
            </div>

             <div className="h-16 flex flex-col justify-center space-y-2">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-orange-600" />
                 <span className="font-bold text-sm text-brand-blue">$2,000,000 Liability</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-orange-600" />
                 <span className="font-bold text-sm text-brand-blue">Identity Theft + Cyber Shield</span>
               </div>
             </div>

             <div className="h-16 flex items-center">
               <div className="w-full bg-brand-blue text-white rounded-xl p-4 flex items-center justify-between shadow-inner">
                 <div className="flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4" />
                   <span className="text-sm font-bold">Full Flood & Earthquake</span>
                 </div>
                 <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">INCLUDED</span>
               </div>
             </div>

             <div className="h-16 flex items-center justify-between border-t border-gray-100 mt-6 pt-8">
               <div>
                 <div className="text-4xl font-extrabold text-brand-blue">$1,520</div>
                 <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Per Year</div>
               </div>
               <button 
                 onClick={() => patchGap('g1')} 
                 className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-orange-500/30"
               >
                 Switch Now <ArrowRight className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pb-12">
        <div className="bg-white rounded-3xl p-8 flex flex-col space-y-6 border border-gray-100">
           <h3 className="text-xl font-bold text-brand-blue mb-2">What makes the difference?</h3>
           <div className="flex flex-col sm:flex-row gap-6">
             <div className="flex-1 space-y-3">
               <div className="bg-gray-50 w-10 h-10 rounded-xl flex items-center justify-center text-brand-blue border border-gray-100"><ShieldCheck className="w-5 h-5"/></div>
               <h4 className="font-bold text-sm text-gray-800">Guaranteed Replacement</h4>
               <p className="text-xs text-gray-500 leading-relaxed">Platinum Plus guarantees your home is rebuilt exactly as it was, regardless of rising material costs or labor shortages.</p>
             </div>
             <div className="flex-1 space-y-3">
               <div className="bg-gray-50 w-10 h-10 rounded-xl flex items-center justify-center text-brand-blue border border-gray-100"><ShieldCheck className="w-5 h-5"/></div>
               <h4 className="font-bold text-sm text-gray-800">Comprehensive Cyber</h4>
               <p className="text-xs text-gray-500 leading-relaxed">Coverage for online fraud, data recovery, and social engineering attacks that standard policies simply ignore.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
