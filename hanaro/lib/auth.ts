import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credential from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import { findUserByEmail, GitUserCheck } from './actions/auth-action';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Github,
    Credential({
      name: 'User',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '패스워드', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호가 필요합니다.');
        }

        const user = await findUserByEmail(String(credentials.email));
        if (!user) {
          throw new Error('존재하지 않는 이메일입니다.');
        }

        if (!user.password) {
          throw new Error('존재하지 않는 비밀번호입니다.');
        }
        const isPasswordValid = await bcrypt.compare(
          String(credentials.password),
          user.password
        );
        if (!isPasswordValid) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return {
          id: String(user.user_id),
          name: user.name,
          email: user.email,
          is_admin: user.is_admin,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github') {
        const dbUser = await GitUserCheck(user.name || '', user.email || '');
        // SNS로그인 시 user 객체에 DB의 user_id를 덮어씌움
        user.id = String(dbUser.user_id);
        user.name = dbUser.name;
        user.email = dbUser.email;
        user.is_admin = dbUser.is_admin;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.is_admin = user.is_admin;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = String(token.id);
      session.user.email = token.email as string;
      session.user.name = String(token.name);
      session.user.is_admin = Boolean(token.is_admin);
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
