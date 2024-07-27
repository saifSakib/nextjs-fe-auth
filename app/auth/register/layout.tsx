import React from 'react'
interface LoginPageProps {
    children:React.ReactNode
}
function AuthLayout({children}:LoginPageProps) {
  return (
    <div className='flex justify-center items-center h-full bg-sky-500'>{children}</div>
  )
}

export default AuthLayout;