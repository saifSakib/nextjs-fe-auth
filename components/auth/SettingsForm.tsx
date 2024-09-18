'use client';
import CardWrapper from "@/components/auth/CardWrapper"
import { SettingsSchema } from "@/schema";
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
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { updateProfile } from "@/integration/backend/update-profile";

function SettingsForm() {
  const session = useSession(); 
  console.log("session=================",session);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(''); 
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues:{
      username: session.data?.user.username  as string || '',
      email: session.data?.user.email as string || "",
      password: "",
      newPassword:""
    }
  })

  const [pending,setTransition] = useTransition()
  async function onSubmit(values:z.infer<typeof SettingsSchema>){
    setError("")
    setSuccess('')
    const payload = {
        username: values.username||undefined,
        email: values.email||undefined,
        password: values.password||undefined,
        newPassword: values.newPassword||undefined,
    }
    if (session.data && session.data.user.access_token) {
        console.log("hahahahahahahah",session.data.user.access_token);
        
        const data = await updateProfile(session.data.user.access_token,payload);
        console.log("data==================",data);
        
        if (data?.success) {
            setSuccess(data.success)
            setError("")
        }
        
        if (data?.error) {
            setSuccess("")
            setError(data.error)
        }
        session.update()
    }
    // setTransition(async()=>{
        
    // })
    // const data = await loginSubmit(values)
    
    

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
            {/* {session.data && !session.data.user.isOAuth &&  */}
            <>
                <FormField
                control={form.control}
                name="username"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input disabled={(!!session?.data?.user.isOAuth)} {...field} type="text" placeholder="john.doe"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={(!!session?.data?.user.isOAuth)} {...field} type="email" placeholder="john.doe@gmail.com"/>
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

                <FormField
                control={form.control}
                name="newPassword"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******"/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </>
            {/* } */}
              {/* {
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
              } */}
            </div>
            <FormError message={error}/>
            <FormSuccess message={success}/>
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default SettingsForm