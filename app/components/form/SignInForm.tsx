'use client'
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import GoogleSignInButton from '@/app/components/ui/GoogleSignInButton';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (signInData?.error) {
      console.error('Sign in error:', signInData.error);

    } else {
      console.log('Sign in successful:', signInData);
      router.refresh()
      router.push('/');
    }
  };
  return (
    
    <main className="bg-[url('/images/saoBang.png')] flex items-center justify-center h-screen bg-no-repeat bg-cover bg-center">
      <div className="bg-gray-300 rounded-2xl flex max-w-3xl p-5 items-center bg-opacity-20">
        <div className="md:w-1/2 px-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2"></div>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-yellow-500">Welcome back</h2>
          <p className="mb-4 text-yellow-500">
            Start your website in seconds. Do not have an account?{' '}
            <Link href="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
            .
          </p>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Sign in
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
       <div className="mb-4"> <GoogleSignInButton  >Sign in with Google</GoogleSignInButton></div>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
    </Form>
        </div>
        <div className="md:block hidden w-1/2">
          <Image
            className="rounded-2xl max-h-1600px w-full h-full object-cover "
            src="/images/stock.jpg"
            alt="login form image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </main>
  );
}

export default SignInForm;