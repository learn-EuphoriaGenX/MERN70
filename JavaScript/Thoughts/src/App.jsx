import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SideCommunities from './components/SideCommunities'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className='absolute top-16 left-[270px]'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
            <SideCommunities />
        </div>
    )
}

export default App