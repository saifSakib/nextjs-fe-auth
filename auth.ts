import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import authConfig from "@/auth.config";
import { RegisterSchema } from "./schema";
import register from "./integration/backend/register";
import { send2FaEmail, sendVerificationEmail } from "@/email/mail";
import { getProfile } from "./integration/backend/get-profile";


export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      
      if (account?.provider!=='credentials') {
        const validateFields = RegisterSchema.safeParse({email:user.email,password:'',isOAuth:true});

        if (validateFields.success) {
          
          await register(validateFields.data);
        }  
      }

      if (account?.provider==='credentials') {
        
        if (user.email && user.emailVerificationToken) {
          await sendVerificationEmail(user.emailVerificationToken,user.email);
        }

        if (user.twoFactorEnabled) {
          if (user.twoFaValue && user.email) {
            await send2FaEmail(user.twoFaValue,user.email);
          }
        }
        
        if(user.error) {
          throw new Error(JSON.stringify({error:user.error}))
        }

        if(user.success) {
          throw new Error(JSON.stringify({success:user.success}))
        }  
      }

      return true
    },
    
    async jwt({ token, user}) {
      
      // if (token.access_token) {
        
      // }
      try {
        const data = await getProfile(token.access_token as string);
        if (data) {
          token.id = data.id;
          token.username = data.username
          token.email = data.email;
          token.twoFactorEnabled = data.twoFactorEnabled;
          token.isOAuth = data.isOAuth
        }
      } catch (error) {
         return {...token,...user}
      }
      
      return {...token,...user}
    },
  
    async session({  token,session }) {
      session.user.id=token.id as string;
      session.user.username=token.username as string;
      session.user.twoFactorEnabled = token.twoFactorEnabled as boolean
      session.user.isOAuth = token.isOAuth as boolean
      // session.user.password = token.password as string
      session.user.access_token = token.access_token as string
      // session.user.profile=token.profile; 
      return session;
    },
  },
    
});