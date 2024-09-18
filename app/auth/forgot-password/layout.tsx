import React from 'react'
interface ForgotPasswordProps {
    children:React.ReactNode
}
function ForgotPassword({children}:ForgotPasswordProps) {
  return (
    <div className='flex justify-center items-center h-full bg-sky-500'>{children}</div>
  )
}

export default ForgotPassword;