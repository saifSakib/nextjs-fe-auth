'use client';
import CardWrapper from "@/components/auth/CardWrapper"
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form/FormError";
import FormSuccess from "@/components/form/FormSuccess";
import loginSubmit from "@/integration/frontend/login-submit";
import Link from "next/link";
import { useState } from "react";

function LoginForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(''); 
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email: "",
      password: ""
    }
  })

  async function onSubmit(values:z.infer<typeof LoginSchema>){
    const data = await loginSubmit(values)
    
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
      headerLabel="Login To Your Account"
      showSocial
    >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
            <>
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

              <FormField
                control={form.control}
                name="password"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              </>
              {
                ((success==="2FA Expired. Resent 2FA Email" || success==="2FA Email Sent") || (error=='2FA Code Not Found')) &&
                  <FormField
                  control={form.control}
                  name="code"
                  render={({field})=>(
                    <FormItem>
                      <FormLabel>2FA Code</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="123456"/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              }
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button className="w-full" type="submit">Submit</Button>

            <Button variant="link" className="p-0">
              <Link href="/auth/forgot-password">
                Forgot Password?
              </Link>
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm