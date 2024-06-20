import { z } from "zod";

export const CouponSchema = z.object({
  name: z.string(),
  discount: z.number(),
  originalPrice: z.number(),
  code: z.string(),
  link: z.string().url(),
  image: z.string(),
});

export const CouponsSchema = z.array(CouponSchema);

export type Coupon = z.infer<typeof CouponSchema>;
