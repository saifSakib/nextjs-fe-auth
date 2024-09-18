'use server';
import { signIn } from '@/auth';
import { defaultLoginRedirect } from '@/routes';
import { LoginSchema } from '@/schema';
import { AuthError } from 'next-auth';
import * as z from 'zod';

const loginSubmit=async(values:z.infer<typeof LoginSchema>)=>{
    const validateFields = LoginSchema.safeParse(values);
    if (validateFields.success) {
        try {
            await signIn("credentials",{
                email: validateFields.data.email,
                password: validateFields.data.password,
                code:validateFields.data.code,
                redirectTo: 'http://localhost:3000/settings'
            })
            
        } catch (error) {
            // console.log("===========er===============",error);
            
            if (error instanceof AuthError) {
                const {name,type,message,cause} = error    
                
                console.log("========error============",{name,type,message,cause});
                console.log("========error============",(cause?.err?.message));
                // if (condition) {
                    
                // }
                if (cause?.err?.message) {
                    console.log(JSON.parse(cause?.err?.message));
                    return JSON.parse(cause?.err?.message)    
                }
                
            }
            throw error;
        }
    }

    return {error:"Invalid Fields"}
}

export default loginSubmit;