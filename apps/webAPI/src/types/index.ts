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
  _id: z.string(),
  profile_pic: z.string(),
  email: z.string(),
  role: z.string()
});

export type UserParams = z.infer<typeof userType>;

export const tokenType = z.object({
  username: z.string(),
  id: z.string()
})

export type tokenParams = z.infer<typeof tokenType>;

export const threadType = z.object({
  thread: z.string().max(140),
  userId: z.string()
})


export const userLikingThreadType = z.object({
  threadId: z.string(),
  userId: z.string()
})


export const userCommentingType = z.object({
  threadId: z.string(),
  comment: z.string(),
  userId: z.string()
})

export const actualThreadType = z.object({
  thread: z.string(),
  userId: z.string()
})

export type actualThreadParams = z.infer<typeof actualThreadType>;

export const followThisUser = z.object({
  userToFollow: z.string()
})

export const creatingChat = z.object({
  user1: z.string(),
  user2: z.string()
})


export const gettingMessages = z.object({
  chatId: z.string()
})

export const creatingMessages = z.object({
  userId: z.string(),
  content: z.string(),
  chatId: z.string(),
})