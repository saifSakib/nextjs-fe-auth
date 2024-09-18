'use client';
import CardWrapper from "@/components/auth/CardWrapper"
import { RegisterSchema } from "@/schema";
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
import register from "@/integration/backend/register";

function RegisterForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(''); 
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      email: "",
      password: ""
    }
  })

  async function onSubmit(values:z.infer<typeof RegisterSchema>){
    const data = await register(values)
    
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
      backButtonHref="/auth/login"
      backButtonLabel="Already Have An Account?"
      headerLabel="Welcome Back! Please Register"
      showSocial
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

export default RegisterForm