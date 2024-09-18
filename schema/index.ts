import * as z from "zod";

export const LoginSchema = z.object({
 email:z.string().email(),
 password:z.string(),
 code:z.optional(z.string())   
})

export const RegisterSchema = z.object({
    email:z.string().email(),
    password:z.string(),
    isOAuth:z.optional(z.boolean())   
})

export const ForgotPasswordSchema = z.object({
    email:z.string().email(),
})

export const SetPasswordSchema = z.object({
    password:z.string(),
    confirm_password:z.string(),
})

export const SettingsSchema = z.object({
    username:z.optional(z.string()),
    //not required email
    email:z.optional(z.string().email()),
    password:z.optional(z.string()),   
    newPassword:z.optional(z.string()),
    twoFactorEnabled:z.optional(z.boolean()),   
});