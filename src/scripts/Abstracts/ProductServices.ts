import { HttpClient } from '@angular/common/http';
import { Product } from '../productinfo';

export abstract class ProductService {
  constructor(protected http: HttpClient) {}

  abstract createProduct(product: Product): void;
  abstract getProduct(id: number): Product | undefined;
  abstract updateProduct(id: number, updatedProduct: Partial<Product>): void;
  abstract deleteProduct(id: number): void;
}
