export class CreateSaleDto {
  product_id: number[];
  user_id: number;
  amount: number;
  customer_id?: number;
}
