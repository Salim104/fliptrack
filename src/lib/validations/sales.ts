import { z } from 'zod'

export const saleSchema = z.object({
  stockItemId:   z.string().min(1),
  buyerName:     z.string().min(1, 'Buyer name is required'),
  buyerPhone:    z.string().min(1, 'Phone number is required'),
  salePrice:     z.number().positive('Enter a valid price greater than 0'),
  paymentMethod: z.enum(['CASH', 'EFT', 'SNAPSCAN', 'YOCO', 'OTHER']),
})

export type SaleFormData = z.infer<typeof saleSchema>
