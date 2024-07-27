import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import React from 'react'
interface HeaderComponentProps{
    label:string
}
const font = Poppins({
    subsets:['latin'],
    weight:['600']
})
function Header({label}:HeaderComponentProps) {
  return (
    <div className='flex flex-col gap-y-4 w-full justify-center items-center'>
        <h1 className={cn("text-3xl font-semibold",font.className)}>
            AUTH
        </h1>
        <p className='text-muted-foreground text-small'>
            {label}
        </p>
    </div>
  );
}

export default Header