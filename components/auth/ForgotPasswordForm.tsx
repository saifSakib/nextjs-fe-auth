'use client';
import CardWrapper from "@/components/auth/CardWrapper"
import { ForgotPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form/FormError";
import FormSuccess from "@/components/form/FormSuccess";
import {generateResetPassowordToken} from "@/integration/backend/generate-reset-password-token";
import Link from "next/link";
import { sendResetPasswordEmail } from "@/email/mail";
import { useState } from "react";

function ForgotPassword() {
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues:{
      email: "",
    }
  })

  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');

  async function onSubmit(values:z.infer<typeof ForgotPasswordSchema>){
    const data = await generateResetPassowordToken(values)
    
    if (data?.success) {
      setSuccess(data.success)
      setError("")
    }
    if (data?.error) {
      setSuccess("")
      setError(data.error)
    }
    
  }
  return (
    <CardWrapper
      backButtonHref="/auth/register"
      backButtonLabel="Dont Have An Account?"
      headerLabel="Forgot Your Password?"
      showSocial={false}
    >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="john.doe@gmail.com"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button className="w-full" type="submit">Submit</Button>

            <Button variant="link" className="p-0">
              <Link href="/auth/login">
                Back To Login
              </Link>
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default ForgotPassword