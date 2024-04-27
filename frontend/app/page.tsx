import { Audio } from '@/components/audio'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export default function Home() {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Navbar />
      <Audio />
      <Footer />
    </div>
  )
}
