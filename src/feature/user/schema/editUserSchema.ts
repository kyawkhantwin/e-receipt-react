import { z, ZodSchema } from 'zod'
import { AdminEditUserData } from '../type/UserData'

export const editUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  enabled: z.boolean(),
  appId: z.string().min(1, 'App ID is required'),
  merchantId: z.string().min(1, 'Merchant ID is required'),
  createdBy: z.string().min(1, 'Created By is required'),
  role: z.string().min(1, 'Role is required'),
  merchantAddress: z.string().min(1, 'Merchant address is required'),
  merchantName: z.string().min(1, 'Merchant name is required'),
})
export const editAdminUserSchema: ZodSchema<AdminEditUserData> = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  enabled: z.boolean(),
  role: z.string().min(1, 'Role is required'),
})
