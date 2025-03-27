// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Call your backend API for authentication.
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          const errorMsg =
            (data &&
              typeof data === 'object' &&
              (data.detail?.msg || data.message || data.error)) ||
            'Authentication failed';

          switch (res.status) {
            case 403:
              throw new Error(`FORBIDDEN: ${errorMsg}`);

            case 401:
              throw new Error(`UNAUTHORIZED: ${errorMsg}`);

            case 404:
              throw new Error(`NOTFOUND: ${errorMsg}`);

            default:
              throw new Error(`ERROR: ${errorMsg}`);
          }
        }
        // Check if login was successful and data exists.
        if (res.ok && data.status === 'success' && data.data) {
          // Return the data; NextAuth will store this in the session.
          return data.data;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Map the backend's access_token to our token property.
        token.accessToken = user.access_token;
        token.id = Number(user?.id);
        token.email = user?.email || user.email;
        token.first_name = user?.first_name || user.first_name;
        token.last_name = user?.last_name || user.last_name;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token properties to the session's user.
      session.user.accessToken = token.accessToken;
      session.user.id = token.id as number;
      session.user.email = token.email as string;
      session.user.first_name = token.first_name as string;
      session.user.last_name = token.last_name as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
