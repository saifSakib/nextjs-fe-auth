'use server'

import { sendVerificationEmail } from "@/email/mail";

export async function updateProfile(token:string,payload:object){
    console.log("payload[[[[[[[[======",payload);
    console.log("hahahahahahahah");
    try {
        const res = await fetch('http://localhost:5000/api/user/update',{
            method:"POST",
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        })
        const data = await res.json();
        if (data.success == 'Verification Email Sent For Email. User Updated') {
            await sendVerificationEmail(data.emailVerificationToken,data.email)
        }
        return data;
    } catch (error) {
        // console.log(error);
        return 
    }
} 