import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Car, Heart, ShieldAlert, ArrowRight, CheckCircle2, XCircle, FileText, ChevronRight } from 'lucide-react'

export default function Policies() {
  const [selectedPolicy, setSelectedPolicy] = useState('home')

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-extrabold text-brand-blue tracking-tight mb-2">
          Protection Portfolio
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          View and manage your active shields. We translate the legalese into plain English so you know exactly where you stand.
        </p>
        <button className="mt-4 bg-brand-blue hover:bg-brand-indigo text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
          <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">+</span> Add New Policy
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        
        {/* Left Side: Policy Cards */}
        <div className="flex-1 space-y-6">
          
          {/* Home Policy */}
          <div 
            onClick={() => setSelectedPolicy('home')}
            className={`bg-white rounded-[2rem] p-6 shadow-sm border transition-all cursor-pointer ${selectedPolicy === 'home' ? 'border-brand-blue ring-1 ring-brand-blue shadow-lg' : 'border-gray-100 hover:border-gray-200'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Home className="w-7 h-7 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-blue">My Home Policy</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">Policy #HME-99420-LX</p>
                </div>
              </div>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
            </div>

            <div className="mb-6">
              <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-3">Coverage Gaps Detected</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-red-50/50 border border-red-100 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-red-600">
                    <ShieldAlert className="w-4 h-4" /> Missing: Flood Coverage
                  </div>
                  <button className="text-[10px] font-bold text-gray-500 uppercase underline decoration-gray-300 underline-offset-4 hover:text-gray-900">Translate to Risk</button>
                </div>
                <div className="flex items-center justify-between bg-red-50/50 border border-red-100 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-red-600">
                    <ShieldAlert className="w-4 h-4" /> Missing: Earthquake Coverage
                  </div>
                  <button className="text-[10px] font-bold text-gray-500 uppercase underline decoration-gray-300 underline-offset-4 hover:text-gray-900">Translate to Risk</button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-gray-50">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Coverage Amount</div>
                <div className="text-3xl font-extrabold text-brand-blue">$1,250,000</div>
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-blue">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Car Policy */}
          <div 
            onClick={() => setSelectedPolicy('car')}
            className={`bg-white rounded-[2rem] p-6 shadow-sm border transition-all cursor-pointer ${selectedPolicy === 'car' ? 'border-brand-blue ring-1 ring-brand-blue shadow-lg' : 'border-gray-100 hover:border-gray-200'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Car className="w-7 h-7 text-orange-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">My Car Policy</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">Tesla Model 3 • 2023</p>
                </div>
              </div>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
            </div>

            <div className="mb-6">
              <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-3">Coverage Gaps Detected</div>
              <div className="flex items-center justify-between bg-red-50/50 border border-red-100 rounded-xl p-3">
                <div className="flex items-center gap-2 text-sm font-bold text-red-600">
                  <ShieldAlert className="w-4 h-4" /> Missing: Roadside Assistance
                </div>
                <button className="text-[10px] font-bold text-gray-500 uppercase underline decoration-gray-300 underline-offset-4 hover:text-gray-900">Translate to Risk</button>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-gray-50">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Coverage Amount</div>
                <div className="text-3xl font-extrabold text-brand-blue">$500,000</div>
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-blue">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Life Policy */}
          <div 
            onClick={() => setSelectedPolicy('life')}
            className={`bg-white rounded-[2rem] p-6 shadow-sm border transition-all cursor-pointer ${selectedPolicy === 'life' ? 'border-brand-blue ring-1 ring-brand-blue shadow-lg' : 'border-gray-100 hover:border-gray-200'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Heart className="w-7 h-7 text-red-900 fill-red-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">My Life Policy</h3>
                  <p className="text-xs text-gray-500 font-medium mt-1">Term Life • 20 Year</p>
                </div>
              </div>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
            </div>

            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-green-50/50 border border-green-200 rounded-full px-4 py-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> 
                <span className="text-xs font-bold text-green-700 italic">Fully Covered — No Gaps Found</span>
              </div>
            </div>

            <div className="flex justify-between items-end pt-4 border-t border-gray-50">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Coverage Amount</div>
                <div className="text-3xl font-extrabold text-brand-blue">$2,000,000</div>
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-blue">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Translation Panel */}
        <div className="lg:w-[450px]">
           <AnimatePresence mode="wait">
             <motion.div 
               key={selectedPolicy}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="bg-brand-blue rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden"
             >
                {/* Background flourish */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-blue-200 mb-6">
                  <span className="text-orange-400">✧</span> Plain-Language Translation
                </div>

                <h2 className="text-4xl font-extrabold mb-10">
                  {selectedPolicy === 'home' ? 'My Home Policy' : selectedPolicy === 'car' ? 'My Car Policy' : 'My Life Policy'}
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
                        <span className="text-sm text-blue-50 leading-relaxed font-medium">The physical structure of your house if damaged by fire, wind, or hail.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-blue-50 leading-relaxed font-medium">Personal items (laptops, jewelry, furniture) up to $150,000.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-blue-50 leading-relaxed font-medium">Temporary living expenses if you have to move out during repairs.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="flex items-center gap-2 text-orange-400 font-bold mb-4">
                      <XCircle className="w-5 h-5" /> Major Exclusions
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-blue-100 leading-relaxed italic">Floods: Any water damage coming from outside the home rising up.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-blue-100 leading-relaxed italic">Wear and Tear: Gradual damage from poor maintenance.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-12 mb-2">
                  <button className="w-full bg-white hover:bg-gray-50 text-brand-blue font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
                    View Full Policy PDF <FileText className="w-5 h-5" />
                  </button>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
