import { HttpClient } from '@angular/common/http';
import { Product } from '../productinfo';
import { Observable } from 'rxjs';

export abstract class ProductService {
  constructor(protected http: HttpClient) {}

  abstract createProduct(product: Product): void;
  abstract getProduct(id: number): Product | undefined;
  // abstract updateProduct(id: number, updatedProduct: Partial<Product>): void;
  abstract updateProductStatus(id: number,productData:any): Observable<any>;
  abstract deleteProduct(id: number): void;
}
