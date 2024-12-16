import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoperationService {

  constructor( private http:HttpClient ) { }

  findProductById(productId: number): Observable<any> {
      return this.http.get(`https://fakestoreapi.com/products/${productId}`);
    }
    
}
