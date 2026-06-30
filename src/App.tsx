import { useCallback, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Professional from '@/components/sections/Professional'
import Products from '@/components/sections/Products'
import Instagram from '@/components/sections/Instagram'
import Testimonials from '@/components/sections/Testimonials'
import CTABand from '@/components/sections/CTABand'
import Location from '@/components/sections/Location'

export default function App() {
  const handleNavHeight = useCallback((h: number) => {
    document.documentElement.style.setProperty('--nav-h', `${h}px`)
    document.documentElement.style.setProperty('--header-h', `${h}px`)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const el = document.getElementById(hash)
    if (!el) return
    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth' })
    }, 120)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Navbar onHeightChange={handleNavHeight} />
      <main>
        <Hero />
        <Services />
        <Instagram />
        <Professional />
        <Testimonials />
        <CTABand />
        <About />
        <Products />
        <Location />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
