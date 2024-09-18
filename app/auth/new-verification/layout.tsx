import React from 'react'
interface NewVerficationLayoutProps{
    children:React.ReactNode
}
function NewVerficationLayout({children}:NewVerficationLayoutProps) {
  return (
    <div className='flex justify-center items-center h-full bg-sky-500'>{children}</div>
  )
}

export default NewVerficationLayout