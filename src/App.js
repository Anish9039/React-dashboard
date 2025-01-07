import { useState } from 'react'
import './App.css'
import Header from '../src/Component/Header'
import Sidebar from '../src/Component/Sidebar'
import Home from './Component/Home'
import Subscription from './Component/Subscription'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (

    <Router>
    <div className="grid-container">
      {/* Header and Sidebar will be shared across all pages */}
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      {/* Routes for different components */}
      <Routes>
      <Route path="/Home" element={<Home />} /> {/* Subscriptions route */}

        <Route path="/subscriptions" element={<Subscription />} /> {/* Subscriptions route */}
      </Routes>
    </div>
  </Router>
  )
}

export default App
