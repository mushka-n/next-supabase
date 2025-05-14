'use client';

import { ROUTES } from '@/constants/routes';
import { signInAction } from '@/server/api/auth/sign-in';
import { signInWithOAuthAction } from '@/server/api/auth/sign-in-google';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';

import { AuthMessage } from './types';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
});

export function SignInForm({
  searchParams,
}: {
  searchParams: AuthMessage | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    shouldUseNativeValidation: false,
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!searchParams) return;
    setTimeout(() => {
      if ('error' in searchParams) toast.error(searchParams.error);
      else if ('success' in searchParams) toast.success(searchParams.success);
      else if ('message' in searchParams) toast.error(searchParams.message);
    }, 0);
  }, [searchParams]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(signInAction)}
        className='w-full'
        noValidate
      >
        <div className='grid gap-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <FormControl>
                  <Input
                    id='email'
                    type='email'
                    tabIndex={1}
                    placeholder='johndoe@example.com'
                    autoComplete='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <div className='flex justify-between items-center'>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Link
                    href={ROUTES.FORGOT_PASSWORD}
                    className='ml-auto text-sm/3.5 underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <InputPassword
                    id='password'
                    tabIndex={2}
                    placeholder='******'
                    autoComplete='current-password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            tabIndex={3}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
            <span className='bg-background text-muted-foreground relative z-10 px-4'>
              Or continue with
            </span>
          </div>

          <Button
            className='w-full'
            type='button'
            tabIndex={4}
            variant='outline'
            onClick={() => signInWithOAuthAction('google')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='800px'
              height='800px'
              viewBox='-3 0 262 262'
              preserveAspectRatio='xMidYMid'
            >
              <path
                d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
                fill='#4285F4'
              />
              <path
                d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
                fill='#34A853'
              />
              <path
                d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
                fill='#FBBC05'
              />
              <path
                d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
                fill='#EB4335'
              />
            </svg>
            Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
