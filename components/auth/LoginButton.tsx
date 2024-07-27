"use client";
import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface LoginButtonProps{
    mode?:"modal"|"redirect",
    asChildren?:boolean,
    children:React.ReactNode,
}
function LoginButton({children,asChildren,mode}:LoginButtonProps) {
  const router = useRouter();
  function onclick(){
    router.push('/auth/login')
  }
  if (mode=='modal') return (
    <span>
      todo modal
    </span>
  )
   return <span onClick={onclick}>
    {children}
   </span>
}

export default LoginButton