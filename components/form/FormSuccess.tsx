import React from 'react'
import {CheckCircledIcon} from "@radix-ui/react-icons"
interface formSuccessProps{
  message?:string
}
function FormSuccess({message}:formSuccessProps) {
  if (message) return (
    <div className='p-3 bg-emerald-300 text-sm text-emerald flex items-center gap-x-2'>
      <CheckCircledIcon className='h-4 w-4'/>
      <p>{message}</p>
    </div>
  );
  return null;
}

export default FormSuccess;
