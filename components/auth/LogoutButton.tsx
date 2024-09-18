'use client';
import React from 'react'
import { Button } from '../ui/button';
import { logOut } from '@/integration/backend/logout';

function LogoutButton() {
  return (
    <Button onClick={logOut}>
        Log Out
    </Button>
  )
}

export default LogoutButton