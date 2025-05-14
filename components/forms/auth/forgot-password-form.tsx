'use client';

import { forgotPasswordAction } from '@/server/api/auth/forgot-password';
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
import { Input } from '@/components/ui/input';

import { AuthMessage } from './types';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export function ForgotPasswordForm({
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
        onSubmit={form.handleSubmit(forgotPasswordAction)}
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

          <Button
            type='submit'
            tabIndex={3}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
