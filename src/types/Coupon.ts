export default interface Coupon {
  id: number;
  game: string;
  discount: number;
  code: string;
  saleLink: string;
  originalPrice: number;
  image: string;
}
