'use server'

import { sendResetPasswordEmail } from "@/email/mail";
import { ForgotPasswordSchema } from "@/schema";
import * as z from 'zod';

export const generateResetPassowordToken = async(values:z.infer<typeof ForgotPasswordSchema>)=>{
    const validateFields = ForgotPasswordSchema.safeParse(values);
    if (validateFields.success) {
        const {email} = validateFields.data 
        const res = await fetch('http://localhost:5000/api/user/reset-passoword-token',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email:email
            }),
          });
      
          const data = await res.json();
          if (data.hasOwnProperty("token")) {
            await sendResetPasswordEmail(data.token,values.email)
          }
          return data;
    }else{
        return {error: "Invalid field"}
    }
}