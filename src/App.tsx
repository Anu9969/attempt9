import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { WalletProvider } from './context/WalletContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Login from './pages/Login'
import CreateBounty from './pages/CreateBounty'
import BountyDetails from './pages/BountyDetails'

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <CreateBounty />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bounty/:id" 
            element={
              <ProtectedRoute>
                <BountyDetails />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </WalletProvider>
  )
}

export default App 