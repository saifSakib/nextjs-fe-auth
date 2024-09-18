'use client';
import React from 'react'
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { defaultLoginRedirect } from '@/routes';
// import {GitHubLogoIcon} from "@radix-ui/react-icons"
interface SocialProps{

}

async function onClick(provider:"google"|"github"){
  signIn(provider,{
    callbackUrl: defaultLoginRedirect,
  });  // This will trigger the OAuth flow
}
function Social({}:SocialProps) {
  return (
    <div className='w-full flex gap-x-2'>
        <Button size='lg' variant='outline' className='w-full' onClick={()=>onClick("google")}>
            Sign In With Google
        </Button>
    </div>
  )
}

export default Social