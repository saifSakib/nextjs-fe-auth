'use server'

import { SetPasswordSchema } from "@/schema";
import * as z from 'zod';

export const resetPassoword = async(token:string,values:z.infer<typeof SetPasswordSchema>)=>{
    const validateFields = SetPasswordSchema.safeParse(values);
    if (validateFields.success) {
        const {password,confirm_password} = validateFields.data;
        if (password !== confirm_password) {
            return {error: "Passwords Don't Match"}
        } 
        const res = await fetch('http://localhost:5000/api/user/reset-password',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password:confirm_password,
              token
            }),
          });
      
          const data = await res.json();
    
          return data
    }else{
        return {error: "Invalid field hahahah"}
    }
}