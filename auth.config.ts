import { AuthError, CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema";
import login from "./integration/backend/login";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId:process.env.Google_Client_Id,
      clientSecret:process.env.Google_Client_Secret,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        
        
        if (validateFields.success) {
          const { email, password , code  } = validateFields.data;
          try {
            const data = await login({ email, password , code});
            
            if (data.success || data.error) return data
              
            if (!data.user || !data.user.id) return null
            
            const {user,access_token} = data
            // console.log("logged in================",{...user,access_token});
            
            return {...user,access_token}

          } catch (error) {
            return null;
          }
          
        } else  {
          return null;
        }
      },
    }),
  ]
} satisfies NextAuthConfig;
