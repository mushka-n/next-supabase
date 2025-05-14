'use client';

import { resetPasswordAction } from '@/server/api/auth/reset-password';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { InputPassword } from '@/components/ui/input-password';

import { AuthMessage } from './types';

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export function ResetPasswordForm({
  searchParams,
}: {
  searchParams: AuthMessage | undefined;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    shouldUseNativeValidation: false,
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
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
        onSubmit={form.handleSubmit(resetPasswordAction)}
        className='w-full'
        noValidate
      >
        <div className='grid gap-6'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel htmlFor='password'>New Password</FormLabel>
                <FormControl>
                  <InputPassword
                    id='password'
                    placeholder='******'
                    autoComplete='new-password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='grid gap-2'>
                <FormLabel htmlFor='confirmPassword'>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <InputPassword
                    id='confirmPassword'
                    placeholder='******'
                    autoComplete='new-password'
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
            {form.formState.isSubmitting
              ? 'Resetting Password...'
              : 'Reset Password'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
