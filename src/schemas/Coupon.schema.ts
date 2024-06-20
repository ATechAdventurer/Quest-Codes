import { z } from "zod";

export const CouponSchema = z.object({
  name: z.string(),
  discount: z.number(),
  originalPrice: z.number(),
  code: z.string(),
  productId: z.string(),
  image: z.string(),
});

export const CouponsSchema = z.array(CouponSchema);

export type Coupon = z.infer<typeof CouponSchema>;

//oculus.store://link/products?item_id=5269080709783454
