'use client';
import React from 'react'
import { Button } from '../ui/button';
import {GitHubLogoIcon} from "@radix-ui/react-icons"
interface SocialProps{

}
function Social({}:SocialProps) {
  return (
    <div className='w-full flex gap-x-2'>
        <Button size='lg' variant='outline' className='w-full' onClick={()=>{}}>
            <GitHubLogoIcon/>
        </Button>
        <Button size='lg' variant='outline' className='w-full' onClick={()=>{}}>
            <GitHubLogoIcon/>
        </Button>
    </div>
  )
}

export default Social