'use server';

import { signIn, signOut } from '../auth';
import { createUser, findUserByEmail } from './auth-action';

export const register = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password)
    throw new Error('모든 필드를 입력해주세요.');

  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('이미 존재하는 이메일입니다.');

  await createUser({ name, email, password });
};

export const login = async () => {
  await signIn('github', { redirectTo: '/' });
};

export const snsLogin = async (
  service: string = 'github',
  redirectTo: string = '/'
) => {
  await signIn(service, { redirectTo });
};

export const logout = async () => {
  await signOut({ redirectTo: '/api/auth/register' });
};
