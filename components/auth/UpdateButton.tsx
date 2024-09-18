'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'


function UpdateButton() {
  const {update} = useSession();
  function onClick(){
    update()
  }  
  return (
    <form onSubmit={onClick}>
        <Button type='submit' variant="default">
            UpdateButton
        </Button>
    </form>
  )
}

export default UpdateButton