import { useState } from 'react'
import { Car, Home, ShieldCheck, Plus, Calendar, Clock, MapPin, Download, ChevronRight, User } from 'lucide-react'

export default function Claims() {
  const [view, setView] = useState('list') // 'list' | 'new'

  return view === 'list' ? <ClaimsList setView={setView} /> : <NewClaimWizard setView={setView} />
}

function ClaimsList({ setView }) {
  return (
    <div className="space-y-8 relative">
      <div className="bg-brand-blue/5 rounded-3xl -mx-4 sm:-mx-8 px-4 sm:px-8 py-10 -mt-8 mb-8 border-b border-brand-blue/10 relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10 flex justify-between items-center max-w-5xl">
          <div>
            <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight mb-4">Claims Center</h1>
            <div className="inline-flex items-center px-4 py-1.5 bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-widest rounded-full">
              <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span> 1 Active Claim
            </div>
          </div>
          <div className="hidden md:block w-32 h-32 bg-gray-900 rounded-xl overflow-hidden relative shadow-2xl transform rotate-3">
            {/* Abstract 3D glass ring placeholder image */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-orange-500/30"></div>
            <div className="absolute inset-4 rounded-full border-4 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center">
              <div className="w-12 h-6 border-y-4 border-orange-400 rotate-45 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end mb-4">
             <h2 className="text-2xl font-bold text-brand-blue">Active Claims</h2>
             <span className="text-xs text-gray-500 font-medium">Updated 2 mins ago</span>
          </div>
          
          {/* Active Claim Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Car className="w-8 h-8 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Car Accident</h3>
                  <div className="flex gap-4 text-xs text-gray-500 font-medium">
                    <span># CLM-902341-B</span>
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> Oct 12, 2024</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Under Review</span>
                <button className="bg-brand-blue hover:bg-brand-indigo text-white font-bold px-6 py-2 rounded-xl text-sm transition-colors w-full sm:w-auto shadow-md">
                  VIEW DETAILS
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                <span>Investigation</span>
                <span>65% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[65%] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Policy Status Box */}
            <div className="bg-brand-indigo rounded-2xl p-6 text-white relative overflow-hidden shadow-lg border border-brand-blue shadow-brand-blue/20">
               <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                 <Umbrella className="w-32 h-32" />
               </div>
               <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-3 block">Policy Status</span>
               <h3 className="text-2xl font-bold mb-4">You are fully protected.</h3>
               <div className="flex items-center gap-2 text-sm text-indigo-100">
                 <ShieldCheck className="w-5 h-5 text-orange-400" />
                 Premium active until 2025
               </div>
            </div>

            {/* Need Help Box */}
            <div className="bg-gray-50 rounded-2xl p-6 relative overflow-hidden border border-gray-100">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Need Help?</span>
               <h3 className="text-xl font-bold text-brand-blue mb-4">Dedicated Claims Concierge</h3>
               <button className="text-sm font-bold text-brand-blue flex items-center hover:text-brand-indigo transition-colors group">
                 Start Live Chat <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* New Incident Widget */}
          <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-brand-blue/5 border border-gray-50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10"></div>
             <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
               <Plus className="w-5 h-5 font-bold" />
             </div>
             <h3 className="text-2xl font-bold text-brand-blue mb-3">New Incident?</h3>
             <p className="text-sm text-gray-500 leading-relaxed mb-8">Our guided process helps you file a claim in under 5 minutes. Snap photos, add details, and we'll handle the rest.</p>
             <button 
               onClick={() => setView('new')}
               className="w-full bg-brand-blue hover:bg-brand-indigo text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-blue/20"
             >
               FILE A NEW CLAIM
             </button>
          </div>

          <div>
             <h3 className="text-lg font-bold text-brand-blue mb-4 flex items-baseline gap-2">
               Claims History <span className="text-[10px] text-gray-400 font-normal uppercase tracking-widest">(Last 12 Months)</span>
             </h3>
             <div className="space-y-3">
               {[
                 { id: 1, title: 'Water Damage', date: 'Sept 14, 2024', status: 'Resolved', amount: '$2,450.00', icon: Home },
                 { id: 2, title: 'Medical Expense', date: 'June 02, 2024', status: 'Resolved', amount: '$180.00', icon: ShieldCheck }
               ].map(claim => (
                 <div key={claim.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-gray-100 shadow-sm">
                   <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                     <claim.icon className="w-4 h-4 text-gray-500" />
                   </div>
                   <div className="flex-1">
                     <h4 className="text-sm font-bold text-gray-900">{claim.title}</h4>
                     <p className="text-[10px] text-gray-500 uppercase tracking-wider">{claim.date}</p>
                   </div>
                   <div className="text-right">
                     <span className="text-xs font-bold text-green-600 block">{claim.status}</span>
                     <span className="text-xs text-gray-500 font-medium">{claim.amount}</span>
                   </div>
                 </div>
               ))}
             </div>
             <button className="w-full mt-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 uppercase tracking-widest hover:bg-gray-50 transition-colors">
               View Full History
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewClaimWizard({ setView }) {
  return (
    <div className="max-w-4xl mx-auto space-y-10 min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight mb-4">File a New Claim - Premium Edition</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Your protection is our priority. Follow our simplified wizard to document your incident and get back to what matters most.</p>
      </div>

      <div className="relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
        <div className="flex justify-between w-full max-w-2xl mx-auto">
          {[
            { step: 1, label: 'Incident', active: false, done: true },
            { step: 2, label: 'Details', active: true, done: false },
            { step: 3, label: 'Evidence', active: false, done: false },
            { step: 4, label: 'Review', active: false, done: false },
          ].map(s => (
            <div key={s.step} className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${s.done ? 'bg-brand-blue text-white' : s.active ? 'bg-brand-indigo text-white shadow-lg ring-4 ring-indigo-50 border border-white' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>
                {s.done ? <CheckCircle2 className="w-5 h-5" /> : s.step}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${s.active ? 'text-brand-indigo' : 'text-gray-400'}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-brand-blue/5 border border-gray-50 flex flex-col md:flex-row gap-12 relative overflow-hidden">
        
        {/* Left Side: context */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h4 className="text-sm font-bold text-brand-blue mb-4">Incident Selection</h4>
            <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-brand-blue/20">
              <div className="w-10 h-10 bg-blue-50/50 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Car Insurance</div>
                <div className="text-xs text-gray-500">Claim #UA-9821</div>
              </div>
            </div>
          </div>

          <div className="w-full h-40 bg-gray-200 rounded-2xl overflow-hidden relative shadow-inner grayscale contrast-125">
            {/* Mock image container for dashboard / car */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
               <Car className="w-16 h-16 text-white/10" />
            </div>
          </div>
        </div>

        {/* Right Side: form */}
        <div className="w-full md:w-2/3 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-brand-blue mb-1">Incident Details</h3>
            <p className="text-sm text-gray-500">Please provide the exact time and location of the incident.</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Date of Incident</label>
              <div className="relative">
                <input type="text" placeholder="mm/dd/yyyy" className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm" />
                <Calendar className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Approximate Time</label>
              <div className="relative">
                <input type="text" placeholder="--:-- --" className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm" />
                <Clock className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div>
             <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Incident Location</label>
             <div className="relative">
                <MapPin className="w-5 h-5 text-brand-blue absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Street address, city, or zip code" className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm" />
              </div>
          </div>

          <div className="bg-orange-50/50 rounded-2xl p-6 flex gap-4 border border-orange-100">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
               <span className="w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]"></span>
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-900 mb-1">Precise Location Auto-detection</h5>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">We can use your phone's GPS to precisely map the incident scene for faster processing.</p>
              <button className="text-xs font-bold text-brand-blue">Enable GPS Location</button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button onClick={() => setView('list')} className="text-brand-blue font-bold text-sm">Previous Step</button>
            <button className="bg-brand-blue hover:bg-brand-indigo text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-brand-blue/20">
              Continue to Evidence <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Chat Button */}
        <div className="absolute right-8 bottom-28 md:bottom-8 bg-white rounded-full p-2 pr-6 flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(30,58,138,0.3)] border border-gray-100 cursor-pointer hover:scale-105 transition-transform z-20">
           <div className="w-10 h-10 bg-brand-indigo rounded-full flex items-center justify-center relative">
             <User className="w-5 h-5 text-white" />
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
           </div>
           <div>
             <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Claim Specialist</div>
             <div className="text-sm font-bold text-brand-blue">Chat with Concierge</div>
           </div>
        </div>
      </div>
    </div>
  )
}

function Umbrella() {
  return <ShieldCheck />
}
