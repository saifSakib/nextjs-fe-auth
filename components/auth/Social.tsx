'use client';
import React from 'react'
import { Button } from '../ui/button';
interface SocialProps{

}
function Social({}:SocialProps) {
  return (
    <div className='w-full flex gap-x-2'>
        <Button size='lg' variant='outline' className='w-full' onClick={()=>{}}>
            HI
        </Button>
        <Button size='lg' variant='outline' className='w-full' onClick={()=>{}}>
            Hello
        </Button>
    </div>
  )
}

export default Social