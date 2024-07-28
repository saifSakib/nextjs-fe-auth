import React from 'react'
import {ExclamationTriangleIcon} from "@radix-ui/react-icons"
interface formErrorProps{
  message?:string
}
function FormError({message}:formErrorProps) {
  if (message) return (
    <div className='p-3 bg-red-300 text-sm text-red  flex items-center gap-x-2'>
      <ExclamationTriangleIcon className='h-4 w-4'/>
      <p>{message}</p>
    </div>
  );
  return null;
}

export default FormError;
