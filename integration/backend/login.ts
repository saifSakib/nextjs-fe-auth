'use server';
import { LoginSchema } from '@/schema';
import * as z from 'zod';
var jwt =  require("jsonwebtoken");

const login=async(values:z.infer<typeof LoginSchema>)=>{
       const validateFields = LoginSchema.safeParse(values);
        
       if (validateFields.success) {
            const {email,password,code} = validateFields.data;
            
            
            const res = await fetch('http://localhost:5000/api/user/signin',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    code:code
                }),
            });

            const data =  await res.json();
            // console.log("data========================",data);
            
            return data;
        }

        return null
    }

export default login;
