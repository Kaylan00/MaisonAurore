import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Dining from './pages/Dining'
import Spa from './pages/Spa'
import Experiences from './pages/Experiences'
import Gallery from './pages/Gallery'
import Booking from './pages/Booking'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [location.pathname])

  return (
    <>
      <Preloader loaded={loaded} />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:slug" element={<RoomDetail />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/spa" element={<Spa />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
