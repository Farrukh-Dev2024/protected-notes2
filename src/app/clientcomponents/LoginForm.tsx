// app/login/page.tsx
'use client'
import React, { useState,useEffect } from 'react';
import Link from 'next/link'
import { signIn, SignInOptions,useSession } from "next-auth/react";
import {  redirect, useRouter,useSearchParams } from 'next/navigation';
import LogOutForm from "@/app/clientcomponents/LogOutForm";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email('Invalid email address').min(3, 'Minimum email length is 3').max(100,'Maximum email length is 100'),
    password: z.string().min(6, 'Minimum password length is 6').max(20,'Maximum password length is 20'),
  })
  
  export default function LoginPage() {
    const { data: session, status } = useSession() //renaming data to session

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState<string | null>(null); // To hold error messages
    const router = useRouter();

    const searchParams = useSearchParams();
    const errorcode = searchParams.get('code') || null

    // if (session){
    //   setTimeout(() => {
    //     redirect("/");
    //   }, 1000); // 1000 milliseconds = 1 second

    // }
    useEffect(() => {
      if (session){redirect("/");}
    }, [session]);  // Effect runs only when `count` changes

    useEffect(() => {
        setError(errorcode);
    }, [errorcode]);  // Effect runs only when `count` changes

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error, router]); // Effect runs only when `error` changes

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
  
      const result = loginSchema.safeParse({ email, password })
  
      if (!result.success) {
        const errors = result.error.format()
        if (errors.email?._errors.length) {
          toast.error(errors.email._errors[0])
        } else if (errors.password?._errors.length) {
          toast.error(errors.password._errors[0])
        }
        return
      }
      const result1 = await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: "/",
      })
      if(result1?.error){
        setError(result1.error);
        toast.error(result1.error);
      }else{
        toast.success('Now trying to login using email!')
        console.log('Email:', email)
        //console.log('Password:', password)
  
      }  
    }
  
    const  handleGoogleLogin = async () => {
      // Replace with actual Google login logic
      toast.info('Redirecting to Google login...')
      const result =  await signIn("google");
      if (result?.code){
          setError(result.code);
          toast.error(result.error);
          //console.log("%o",result);
      }else{
          router.push("/");
      }

    }
  
    return (<>
      {session ? (
        <div className="form-container-style">
          <h2>Already Loggedin.</h2>
        </div>
      ) : (
        <div className="form-container-style">
          <form
            onSubmit={handleSubmit}
            className="form-style"
          >
            <h2 className="form-h2-style">Login</h2>

            <div>
              <Label htmlFor="email" className="form-label-style">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input-style"
              />
            </div>

            <div>
              <Label htmlFor="password" className="form-label-style">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input-style"
              />
            </div>

            <div className="text-right text-sm">
              <Link 
                href="#" className="form-link-style"
                onClick={(e) => {
                  e.preventDefault()
                  alert('Forgot password kindly click on google login button to login or request password reset [default password is 123456789]')
                } }
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="form-button-style1">
              Login
            </Button>

            <div className="flex items-center justify-center gap-2">
              <span className="form-label-style">or</span>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="form-button-style1"
            >
              <FcGoogle className="h-5 w-5" />
              Login with Google
            </Button>
          </form>
        </div>       
      )}
    
    </>


    )
  }