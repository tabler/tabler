import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth';

const authHandler = NextAuth(authConfig);
export {authHandler as GET , authHandler as POST};
