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
function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email: "",
      password: ""
    }
  })
  return (
    <CardWrapper
      backButtonHref="/auth/register"
      backButtonLabel="Dont Have An Account?"
      headerLabel="Welcome Back!"
      showSocial
    >
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(()=>{})}>
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
            {/* <FormError message="Wrong "/> */}
            {/* <FormSuccess message="sabbash"/> */}
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm