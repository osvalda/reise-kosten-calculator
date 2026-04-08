"use server"

import { signOut } from '@/auth';
import { Button } from "@/components/ui/button"
import Form from "next/form"

export async function Logout() {
    return (
        <Form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
        >
            <Button variant="ghost" type="submit">
                Sign Out
            </Button>
        </Form>
    )
}