import { z } from 'zod';

export const signupInput = z.object({
  username: z.string(),
  password: z.string(),
  profile_pic: z.string(),
  email: z.string(),
  role: z.string()
});

export type SignupParams = z.infer<typeof signupInput>;

export const loginInput = z.object({
  username: z.string(),
  password: z.string()
});

export type LoginParams = z.infer<typeof loginInput>;

export const userType = z.object({
  username: z.string(),
  password: z.string(),
  _id: z.string()
});

export type UserParams = z.infer<typeof userType>;
