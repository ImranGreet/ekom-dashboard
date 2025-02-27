import { ProductoperationService } from './../../../services/productoperation.service';
import { PurchasediteamsService } from './../../../services/purchasediteams.service';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Optional,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProductinfoupdateComponent } from '../Forms/productinfoupdate/productinfoupdate.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

interface ProductInfo {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ApiResponse {
  message: string;
  products: {
    current_page: number;
    data: any[]; // Replace 'any' with a more specific type if possible
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    RatingModule,
    Dialog,
    InputTextModule,
    CardModule,
    ProductinfoupdateComponent,
    PaginatorModule,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnChanges {
  constructor(
    private http: HttpClient,
    private purchasedItemDetails: PurchasediteamsService,
    private productsOperation: ProductoperationService
  ) {}
  products: any[] = [];
  @Input() @Optional() cat: string | any = undefined; // Make cat optional
  visible: boolean = false;

  productInfo: ProductInfo = {
    title: 'Sample Product',
    price: 100,
    description: 'This is a sample product.',
    category: 'Electronics',
    image: 'https://via.placeholder.com/150',
  };

  first: number = 0;
  rows: number = 10;
  total: number | undefined = undefined;

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
        .get<ApiResponse>(`http://127.0.0.1:8000/api/products/${this.cat}`)
        .subscribe({
          next: (response) => {
            this.products = response.products.data;
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
        .get<ApiResponse>('http://127.0.0.1:8000/api/products')
        .subscribe({
          next: (response) => {
            this.products = response.products.data;
            console.log(this.products, 'all products');
            this.total = response.products.total;
          },
          error: (error) => {
            console.error('Error fetching products:', error);
            // Handle error gracefully
          },
        });
    }
  }

  showDialog(itemId: number) {
    this.visible = true;

    if (itemId !== undefined) {
      this.purchasedItemDetails.findProductById(itemId).subscribe((itemIfo) => {
        this.productInfo = itemIfo;
        console.log(this.productInfo, 'pro');
      });
    }
  }

  deleteProduct(id: number): void {
    this.productsOperation.deleteProduct(id);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
