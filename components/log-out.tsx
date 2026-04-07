"use server"

import { signOut } from '@/auth';
import { Button } from "@/components/ui/button"

export async function Logout() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
        >
            <Button variant="ghost">
                Sign Out
            </Button>
        </form>
    )
}