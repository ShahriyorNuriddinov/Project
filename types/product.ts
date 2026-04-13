export interface ProductType {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  oldPrice?: number;
  quantity: number;
  
}
