import { auth } from '@/auth'
import LogoutButton from '@/components/auth/LogoutButton';
import SettingsForm from '@/components/auth/SettingsForm';
import UpdateButton from '@/components/auth/UpdateButton';
import { signOut } from 'next-auth/react';
import React from 'react'

async function Settingspage() {
  const session = await auth();
  // console.log("session==========",session);
  
  return (<>
    {/* <div>
      <div>{JSON.stringify(session)}</div>
      <UpdateButton/>
    </div> */}
    <SettingsForm/>
    
    </>
  )
}

export default Settingspage