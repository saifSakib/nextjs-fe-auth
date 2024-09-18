import SetPasswordForm from '@/components/auth/SetPasswordForm';
import React, { Suspense } from 'react'
import { BeatLoader } from 'react-spinners';

function ForgotPasswordPage() {
  return (
    <Suspense fallback={<BeatLoader/>}>
        <SetPasswordForm/>
    </Suspense>
  )
}

export default ForgotPasswordPage;