import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Policies from './pages/Policies'
import Coverage from './pages/Coverage'
import Simulator from './pages/Simulator'
import Claims from './pages/Claims'
import Login from './pages/Login'
import Profile from './pages/Profile'

function ProtectedRoute({ children }) {
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <div className="min-h-screen mesh-bg relative overflow-x-hidden">
        {/* We place Navbar outside Routes if we want it everywhere, but for login we hide it */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/policies" element={<Policies />} />
                    <Route path="/coverage" element={<Coverage />} />
                    <Route path="/simulator" element={<Simulator />} />
                    <Route path="/claims" element={<Claims />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
