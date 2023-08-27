import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export const authConfig: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: 'Login to your account',
    //   credentials: {
    //     email: { 
    //       label: 'Email address', 
    //       type: 'text', 
    //       placeholder: 'your@email.com"'
    //     },
    //     password: { 
    //       label: 'Password',
    //       type: 'password', 
    //       placeholder: 'Your password'
    //     },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials || !credentials.email || !credentials.password) {
    //       return null;
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: { email: credentials.email }
    //     });

    //     if (!user) {
    //       return null;
    //     }

    //     const isPasswordValid = await compare(
    //       credentials.password,
    //       user.password
    //     );

    //     if (!isPasswordValid) {
    //       return null;
    //     }

    //     const { password, ...userWithoutPassword } = user;

    //     return userWithoutPassword as User;
    //   }
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string
    }),
  ],
  pages: {
    signIn: '/signin'
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: 'jwt',
  // },
  // callbacks: {
  //   session: ({ session, token }) => {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //       },
  //     };
  //   },
  //   jwt: ({ token, user }) => {
  //     if (user) {
  //       const u = user as unknown as any;
  //       return {
  //         ...token,
  //         id: u.id,
  //       };
  //     }
  //     return token;
  //   },
  // },  
};
