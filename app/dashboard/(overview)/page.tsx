import { Metadata } from 'next';
import { signOut } from '@/auth';
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {

  return (
    <main>
      lopiszotly
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <Button className="mt-2" variant="destructive">
          <div>Sign Out</div>
        </Button>
      </form>
    </main>
  );
}