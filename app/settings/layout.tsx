import NavBar from '@/components/layout/NavBar';
import React from 'react'
interface SwettingsLayoutProps {
    children:React.ReactNode
}
function SwettingsLayout({children}:SwettingsLayoutProps) {
  return (
    <div className='flex justify-center items-center h-full w-full flex-col gap-y-10 bg-sky-500'>
        <NavBar/>
        {children}
    </div>
  )
}

export default SwettingsLayout;