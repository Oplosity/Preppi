"use client"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { faApple, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from 'next/navigation'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import axios from 'axios';
 
const formSchema = z.object({
  email: z.string().min(2, { message: "Required" }).max(100).email(),
  username: z.string().min(2, { message: "Required" }).max(50),
  password: z.string().min(4, { message: "Required" }).max(200),
  passwordConfirm: z.string().min(4, { message: "Required" }).max(200),
}).superRefine(({ passwordConfirm, password }, ctx) => { // some kind of code i copied which compares passwordConfirm to password
  if (passwordConfirm !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['passwordConfirm']
    });
  }
});

export default function Home() {

  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    try{
      await axios.post("http://localhost:3001/users?type=register", values, {withCredentials: true})
      await axios.post("http://localhost:3001/users?type=login", values, {withCredentials: true})
      router.push("/app")
    }catch(error: any){
      alert("Form submit error: "+error.response.data)
    }
  }

  return (
    <div className="flex overflow-hidden h-screen">
      <div className="flex flex-col flex-1 justify-center">
        <Link href={"/"}><Image src="logo-black.svg" height={45} width={157.5} alt="Preppi logo" className="mb-20 ml-[10%]"/></Link>
        <div className="self-center">
          <h2 className={`text-black text-4xl mb-3 text-pretty`}>Sign up</h2>
          <h1 className={`text-black text-md mb-2 text-pretty`}>If you already have an account registered<br/>You can <Button variant="link" size={"links"} className="text-md"><Link href={"/login"}>Log in here!</Link></Button></h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="preppi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="confirm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
      
      <div className="flex-1 p-10">
        <div className="flex flex-col h-full w-full bg-[url('/landing/landing-bg.svg')] bg-cover rounded-xl p-10">
        <div className="grow relative self-center h-full w-full bg-[url('/sign-up-pana.png')] bg-contain bg-no-repeat bg-center"></div>
          <div className="">
            <h1 className={`text-white text-3xl mb-0 text-pretty pl-10`}>Sign Up to Preppi</h1>
            <p className={`text-white text-2xl mb-3 text-pretty pl-10`}>Your personalized quizzes are waiting for you!</p>
          </div>
        </div>
      </div>
    </div>
  );
}//If you already have an account register