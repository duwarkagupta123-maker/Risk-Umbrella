import { useState } from 'react'
import { motion } from 'framer-motion'
import { Umbrella, Mail, Lock, Eye, EyeOff, User, CheckCircle2, Globe2, AlertCircle } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Login() {
  const login = useStore((state) => state.login)
  const navigate = useNavigate()

  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      let data;
      if (mode === 'login') {
        data = await api.login({ email, password })
      } else {
        data = await api.signup({ name, email, password })
      }
      // data = { token, user }
      login({ token: data.token, user: data.user })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
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

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'login' ? 'bg-white shadow text-brand-blue' : 'text-gray-500'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); }}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'signup' ? 'bg-white shadow text-brand-blue' : 'text-gray-500'}`}
          >
            Create Account
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl px-4 py-3 mb-4"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name field — signup only */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Rajesh Kumar"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
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
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
              {mode === 'login' && <a href="#" className="text-xs font-bold text-brand-blue hover:text-brand-indigo">Forgot?</a>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-blue hover:bg-brand-indigo text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-brand-blue/30 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {mode === 'login' ? 'Signing In…' : 'Creating Account…'}
                </>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 flex justify-center space-x-4">
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
