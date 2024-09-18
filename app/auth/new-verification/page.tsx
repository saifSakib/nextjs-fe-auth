import VerificationForm from '@/components/auth/VerificationForm';
import React, { Suspense } from 'react'
import { BeatLoader } from 'react-spinners';

function LoginPage() {
  return (
    <Suspense fallback={<BeatLoader/>}>
        <VerificationForm/>
    </Suspense>
  )
}

export default LoginPage;