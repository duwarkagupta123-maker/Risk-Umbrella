import { useState } from 'react'
import { motion } from 'framer-motion'
import { Umbrella, Mail, Lock, Eye, CheckCircle2, Globe2 } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const login = useStore((state) => state.login)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // Mock authentication
    if (email && password) {
      login()
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center p-4 relative mesh-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-brand-blue rounded-2xl p-4 mb-4 transform rotate-6">
            <Umbrella className="w-10 h-10 text-white transform -rotate-6" />
          </div>
          <h1 className="text-3xl font-bold text-brand-blue mb-2">Risk Umbrella</h1>
          <p className="text-gray-600 font-medium">The Translucent Shield of Protection</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs font-bold text-brand-blue hover:text-brand-indigo">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="keep" className="rounded text-brand-blue focus:ring-brand-blue w-4 h-4 border-gray-300" />
            <label htmlFor="keep" className="ml-2 text-sm text-gray-600">Keep me protected</label>
          </div>

          <div className="space-y-4 pt-2">
            <button type="submit" className="w-full bg-brand-blue hover:bg-brand-indigo text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-brand-blue/30">
              Sign In
            </button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button type="button" className="w-full bg-gray-100 hover:bg-gray-200 text-brand-blue font-semibold py-3 rounded-xl transition-colors">
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-8 flex justify-center space-x-4">
           {/* Mock social buttons as circles */}
           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"><span className="font-bold text-gray-800 text-xs">G</span></div>
           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"><span className="font-bold text-brand-blue text-xs">in</span></div>
           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100"><span className="font-bold text-gray-800 text-xs">iOS</span></div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 flex space-x-8 text-sm font-medium text-gray-700/80">
        <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Enterprise Grade</div>
        <div className="flex items-center"><Globe2 className="w-4 h-4 mr-2" /> Global Coverage</div>
      </div>
    </div>
  )
}
