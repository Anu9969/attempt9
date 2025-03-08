import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBounty from './pages/CreateBounty'
import BountyDetails from './pages/BountyDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBounty />} />
        <Route path="/bounty/:id" element={<BountyDetails />} />
      </Routes>
    </Router>
  )
}

export default App 