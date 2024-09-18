'use client';
import CardWrapper from "@/components/auth/CardWrapper"
import { SetPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form/FormError";
import FormSuccess from "@/components/form/FormSuccess";
import {resetPassoword} from "@/integration/backend/reset-password";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

function SetPasswordForm() {
  const form = useForm<z.infer<typeof SetPasswordSchema>>({
    resolver: zodResolver(SetPasswordSchema),
    defaultValues:{
      password: "",
      confirm_password: ""
    }
  })

  const searchParamas = useSearchParams()
  const token = searchParamas.get('token') as string

  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');
  async function onSubmit(values:z.infer<typeof SetPasswordSchema>){
    console.log("how============",values);
    const data = await resetPassoword(token,values);
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
      headerLabel="Welcome Back! Set Your Password"
      showSocial
    >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
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

              <FormField
                control={form.control}
                name="confirm_password"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
              <Link href="/auth/login">
                Back To Login?
              </Link>
            </Button>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default SetPasswordForm