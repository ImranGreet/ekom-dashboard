import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CustomerinformationComponent } from '../customerinformation/customerinformation.component';
import { PurchaseditemsComponent } from '../purchaseditems/purchaseditems.component';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,TableModule,ButtonModule,CustomerinformationComponent,PurchaseditemsComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  constructor( private http:HttpClient){

  }

  cartOrOrder:undefined|string[]|any =undefined;
  cols: any=[];
  showOrderItems:boolean =false;

ngOnInit(): void {
this.http.get('https://fakestoreapi.com/carts').subscribe((carts)=>{
   this.cartOrOrder=carts;
});
this.cols = [
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' }
];
}

showPurchasedItems():void{
  this.showOrderItems = !this.showOrderItems;
}
}
