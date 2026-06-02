import { useCallback, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import ServiceStrip from '@/components/layout/ServiceStrip'
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
  const [navH, setNavH] = useState(0)

  const handleNavHeight = useCallback((h: number) => {
    setNavH(h)
    document.documentElement.style.setProperty('--nav-h', `${h}px`)
  }, [])

  const handleStripHeight = useCallback((h: number) => {
    document.documentElement.style.setProperty('--strip-h', `${h}px`)
    document.documentElement.style.setProperty('--header-h', `${navH + h}px`)
  }, [navH])

  return (
    <>
      <Navbar onHeightChange={handleNavHeight} />
      <ServiceStrip onHeightChange={handleStripHeight} />
      <main>
        <Hero />
        <About />
        <Services />
        <Professional />
        <Products />
        <Instagram />
        <Testimonials />
        <CTABand />
        <Location />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
