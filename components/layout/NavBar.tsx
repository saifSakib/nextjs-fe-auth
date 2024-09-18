'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import LogoutButton from '../auth/LogoutButton'

function NavBar() {
  return (
    <div className='p-4 bg-white rounded-xl shadow-sm flex justify-between items-center w-[400px]'>
        <Button variant="default" asChild>
            <Link href="/settings">
                Settings
            </Link>
        </Button>
        <LogoutButton/>
    </div>
  )
}

export default NavBar