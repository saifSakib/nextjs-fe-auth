'use client'
import React, { useCallback, useEffect, useState } from 'react'
import CardWrapper from './CardWrapper'
import {BeatLoader} from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { verifyToken } from '@/integration/backend/verify-token';
import FormError from '../form/FormError';
import FormSuccess from '../form/FormSuccess';
function VerificationForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState(true);
  const [errorMsg, setErrorssMsg] = useState(true);
  const searchParams = useSearchParams()
  const token:string|null = searchParams.get("token")
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');
  const onSubmit = useCallback(async()=>{
    if (token) {
      const data  = await verifyToken(token)
      if (data?.success) {
        setSuccess(data.success)
        setError("")
      }
      if (data?.error) {
        setSuccess("")
        setError(data.error)
      }
    }
  },[token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])
  
  return (
    <CardWrapper
    backButtonHref='/auth/login'
    backButtonLabel='Back To Login'
    headerLabel='Verify Your Email'
    showSocial={false}
    >
        <div className='flex justify-center items-center w-full'>
          {!success && !error && <BeatLoader/>}
          <FormError message={error}/>
          <FormSuccess message={success}/>
        </div>
    </CardWrapper>
  )
}

export default VerificationForm