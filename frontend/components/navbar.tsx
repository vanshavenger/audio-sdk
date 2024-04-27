import React from 'react'
import { ModeToggle } from '@/components/mode-toggle'

export const Navbar = () => {
  return (
    <div className='fixed h-14 inset-x-0 w-full backdrop-blur-lg transition-all top-0 right-0 left-0 p-4 flex items-center justify-between z-[300]'>
      <h1>AI Script to audio converter</h1>
      <aside>
        <ModeToggle />
      </aside>
    </div>
  )
}
