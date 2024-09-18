import NextAuth, { DefaultSession } from "next-auth"

type ExtendedUser = DefaultSession["user"] & {
    id: string;
    username:string;
    profile: any;
    twoFactorEnabled:boolean;
    access_token:string;
    password:string;
    isOAuth:boolean
}


declare module "next-auth" {
  
  interface User{
    id: string,
    username:string,
    email: string,
    profile: string,
    error: string,
    success: string,
    emailVerificationToken: string,
    twoFactorEnabled:boolean,
    twoFaValue:string,
    access_token:string,
    isOAuth:boolean;
    password:string;
  }

  interface Session {
    user: ExtendedUser 
  } 
  
}

// declare module "next-auth/core/jwt" {
 
//   interface JWT  {
//     id:String ,
//     profile: String,
//   } 
  
// }