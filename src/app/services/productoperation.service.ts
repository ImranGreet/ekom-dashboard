import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../scripts/productinfo';
import { ProductService } from '../../scripts/Abstracts/ProductServices';

@Injectable({
  providedIn: 'root',
})
export class ProductoperationService extends ProductService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  createProduct(product: Product): void {
    this.http
      .post('https://fakestoreapi.com/products', product)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getProduct(id: number): Product | undefined {
    return undefined;
  }

  updateProduct(id: number, updatedProduct: Partial<Product>): void {}

  deleteProduct(id: number): void {
    this.http
      .delete(`https://fakestoreapi.com/products/${id}`)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
