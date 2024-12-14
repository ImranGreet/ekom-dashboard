import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchasediteamsService {
  constructor(private http: HttpClient) {}

  productInformation: object | undefined = undefined;

  findProductById(productId: number): void {
    this.http
      .get(`https://fakestoreapi.com/products/${productId}`)
      .subscribe((productInfo) => (this.productInformation = productInfo,console.log(productInfo)));
      console.log("okay");
  }
}
