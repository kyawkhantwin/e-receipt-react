import { z } from 'zod'

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  role: z.string().min(1),
  serial: z.string().optional(),
  merchantAddress: z.string(),
  merchantAddress2: z.string().optional(),
  merchantName: z.string(),
  merchantId: z.string().min(1),
  createdBy: z.string().min(1),
  appId: z.string().min(1),
})

export const createCashierSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  role: z.string().min(1),
  serial: z.string(),
  merchantAddress: z.string(),
  merchantAddress2: z.string().optional(),
  merchantName: z.string(),
  merchantId: z.string().min(1),
  createdBy: z.string().min(1),
  appId: z.string().min(1),
})
export const createAdminUserSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  role: z.string().min(1),
})
