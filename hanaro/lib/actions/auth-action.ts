import bcrypt from 'bcryptjs';
import prisma from '../db';

export type UserData = {
  id?: number;
  name: string;
  email: string;
  password?: string;
  isadmin?: boolean;
};

export const findUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: { email },
    select: {
      user_id: true,
      name: true,
      email: true,
      password: true,
      is_admin: true,
    },
  });

export const createUser = async (user: UserData) => {
  const hashedPassword = await bcrypt.hash(user.password!, 10);
  return prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      is_admin: user.isadmin ?? false,
    },
  });
};

export async function GitUserCheck(username: string, email: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return existingUser;

  return await GitSignUp(username, email);
}

export async function GitSignUp(username: string, email: string) {
  return await prisma.user.create({
    data: {
      name: username,
      email,
      password: null,
      is_admin: false,
    },
  });
}
