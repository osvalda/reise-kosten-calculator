import LoginForm from '@/app/ui/login-form_v2';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <Suspense>
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}