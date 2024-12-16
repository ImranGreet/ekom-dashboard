import { PurchasediteamsService } from './../../../services/purchasediteams.service';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Optional,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProductinfoupdateComponent } from '../Forms/productinfoupdate/productinfoupdate.component';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule, RatingModule,Dialog,InputTextModule,CardModule,ProductinfoupdateComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnChanges {
  constructor(private http: HttpClient,private purchasedItemDetails:PurchasediteamsService) {}
  products: any[] = []; // Initialize with an empty array
  @Input() @Optional() cat: string|any = undefined; // Make cat optional
  visible: boolean = false;
  productInfo:object|undefined=undefined;

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('cat' in changes) {
      this.loadProducts();
    }
  }

  loadProducts(): void {
    if (this.cat) {
      this.http
        .get<any[]>(`https://fakestoreapi.com/products/category/${this.cat}`)
        .subscribe({
          next: (products_cat) => {
            this.products = products_cat;
            console.log(this.products, 'cat');
          },
          error: (error) => {
            console.error('Error fetching products:', error);
            // Handle error gracefully, e.g., display an error message
          },
        });
    } else {
      // Fetch all products if cat is not provided
      this.http
        .get<any[]>('https://fakestoreapi.com/products')
        .subscribe({
          next: (products_cat) => {
            this.products = products_cat;
            console.log(this.products, 'cat');
          },
          error: (error) => {
            console.error('Error fetching products:', error);
            // Handle error gracefully
          },
        });
    }
  }

  showDialog(itemId:number) {
    this.visible = true;

    if(itemId !== undefined){
     this.purchasedItemDetails.findProductById(itemId).subscribe((itemIfo)=>{
      this.productInfo =itemIfo;
     });

    }
}
}
