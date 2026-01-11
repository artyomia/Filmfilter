'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage('Signed in. Navigate to dashboard.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-200">Email</label>
        <input className="input mt-2" type="email" {...register('email')} />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-slate-200">Password</label>
        <input className="input mt-2" type="password" {...register('password')} />
        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
      </div>
      <button className="button w-full" type="submit" disabled={isSubmitting}>
        Sign in
      </button>
      {message && <p className="text-sm text-slate-300">{message}</p>}
    </form>
  );
}
