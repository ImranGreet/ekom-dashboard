import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss',
})
export class CartsComponent implements OnInit {
  constructor(protected http: HttpClient) {}
  cart: any[] = [];
  ngOnInit(): void {
    this.http
      .get<any[]>('https://fakestoreapi.com/carts')
      .subscribe((carts) => {
        this.cart = carts;
      });
  }

  closeTheCurrentTab():void{
    console.log("Closed");
  }
}
