import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './context/WalletContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import Home from './pages/Home'
import CreateBounty from './pages/CreateBounty'
import BountyDetails from './pages/BountyDetails'

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
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
        </Routes>
      </Router>
    </WalletProvider>
  )
}

export default App 