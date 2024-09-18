import {Resend} from 'resend';

export const sendVerificationEmail=async(token:string,email:string)=>{
    const resend = new Resend(process.env.resend_api_key);
    
    console.log("=======================================================================================sending verification email");
    
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    try {
        await resend.emails.send({
            from:"Auth-Advanced <onboarding@resend.dev>",
            to:"saif.sakib42011@gmail.com",
            // to:email,
            subject:"Confirm your email",
            html:`<p>Click <a href=${confirmLink}>here</a> for email confirmation</p>`
        });
    
        console.log('email sent')
    } catch (error) {
        console.log('email sent error---------============',error);
        
    }
}


export const sendResetPasswordEmail=async(token:string,email:string)=>{
    console.log("=======================================================================================sending verification email");
    const resend = new Resend(process.env.resend_api_key);

    const confirmLink = `http://localhost:3000/auth/set-password?token=${token}`
    try {
        await resend.emails.send({
            from:"Auth-Advanced <onboarding@resend.dev>",
            // to:"saif.sakib42011@gmail.com",
            to:"saif.sakib42011@gmail.com",
            subject:"Reset Your Password",
            html:`<p>Click <a href=${confirmLink}>here</a> for reset password</p>`
        });
    
        console.log('email sent')
    } catch (error) {
        console.log('email sent error---------============',error);
        
    }
}


export const send2FaEmail=async(value:string,email:string)=>{
    const resend = new Resend(process.env.resend_api_key);
    
    try {
        await resend.emails.send({
            from:"Auth-Advanced <onboarding@resend.dev>",
            to:"saif.sakib42011@gmail.com",
            subject:"Two Factor Authentication",
            html:`<p>Your code is ${value}</p>`
        });
    
        console.log('email sent')
    } catch (error) {
        console.log('email sent error---------============',error);
        
    }
}