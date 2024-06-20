import { CouponsSchema } from "@/schemas/Coupon.schema";
import coupons from "@/data/coupons.json";

CouponsSchema.parse(coupons);
