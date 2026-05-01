import { z } from 'zod'

export const stockSchema = z.object({
  model:     z.string().min(1, 'Phone model is required'),
  storage:   z.string().min(1, 'Storage is required'),
  color:     z.string().min(1, 'Color is required'),
  condition: z.enum(['BRAND_NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']),
  imei:      z.string().length(15, 'IMEI must be 15 digits'),
  costPrice: z.number().positive('Enter a valid price greater than 0'),
  images:    z.array(z.string()).optional(),
})

export type StockFormData = z.infer<typeof stockSchema>
