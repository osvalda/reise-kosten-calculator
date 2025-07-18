import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      image_url: string;
      role: 'admin' | 'user';
    }
    // & DefaultSession["user"]
  }
}