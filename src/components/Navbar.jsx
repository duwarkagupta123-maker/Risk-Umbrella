import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Bell, User, Umbrella, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function Navbar() {
  const user = useStore((state) => state.user)
  const userName = user?.name || 'Guest'
  const logout = useStore((state) => state.logout)
  const navigate = useNavigate()
  
  const [showProfile, setShowProfile] = useState(false)
  const profileRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-white/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <Umbrella className="w-6 h-6 text-brand-blue" />
            <span className="font-bold text-xl text-brand-blue tracking-tight">Risk Umbrella</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/policies">Policies</NavItem>
            <NavItem to="/coverage">Coverage</NavItem>
            <NavItem to="/claims">Claims</NavItem>
            <NavItem to="/simulator">Simulator</NavItem>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-brand-blue transition relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
            </button>
            <div className="flex items-center border-l border-gray-300 pl-4 relative" ref={profileRef}>
              
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 focus:outline-none group"
              >
                <div className="text-right hidden sm:block leading-tight">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Member</div>
                  <div className="text-sm font-bold text-brand-blue group-hover:text-brand-indigo transition-colors">{userName}</div>
                </div>
                {/* Simulated profile picture styling based on screenshot */}
                <div className="bg-gradient-to-tr from-brand-blue to-indigo-400 rounded-full p-0.5 shadow-sm">
                  <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden border-2 border-white">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl shadow-brand-blue/10 border border-gray-100 py-1 origin-top-right animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1 sm:hidden">
                     <div className="text-sm font-bold text-gray-900">{userName}</div>
                  </div>
                  <button 
                    onClick={() => { navigate('/profile'); setShowProfile(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue flex items-center gap-2 transition-colors"
                  >
                    <User className="w-4 h-4" /> My Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-blue flex items-center gap-2 transition-colors">
                    <Settings className="w-4 h-4" /> Account Settings
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}

            </div>
          </div>
          
        </div>
      </div>
    </nav>
  )
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-1 pt-1 border-b-2 text-sm font-bold transition-all ${
          isActive
            ? "border-brand-blue text-brand-blue"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900"
        }`
      }
    >
      {children}
    </NavLink>
  )
}
