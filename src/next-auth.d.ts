/* next-auth.d.ts */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      accessToken?: string;
      first_name?: string;
      last_name?: string;
    } & DefaultSession['user'];
  }
  interface User extends DefaultUser {
    id: number;
    access_token?: string;
    first_name?: string;
    last_name?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: number;
    accessToken?: string;
    first_name?: string;
    last_name?: string;
  }
}
