import React from 'react'
interface SetPasswordProps {
    children:React.ReactNode
}
function SetPasswordPage({children}:SetPasswordProps) {
  return (
    <div className='flex justify-center items-center h-full bg-sky-500'>{children}</div>
  )
}

export default SetPasswordPage;