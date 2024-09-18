'use server';
import { sendVerificationEmail } from '@/email/mail';
import { RegisterSchema } from '@/schema';
import * as z from 'zod';

const register=async(values:z.infer<typeof RegisterSchema>)=>{
    try {
        const validateFields = RegisterSchema.safeParse(values);
        
        if (validateFields.success) {
            const {email,password='',isOAuth=false} = validateFields.data
            const res = await fetch('http://localhost:5000/api/user/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,password,isOAuth
                }),
            });
            
            const data =  await res.json();
            // console.log("register==========",data);
            if (data.success === 'Sent Verification email') {
                await sendVerificationEmail(data.emailVerificationToken,data.email)
            }
            
            return data
        }
    } catch (error) {
        console.log('error====++++======',error);  
    }   

    
}

export default register;
