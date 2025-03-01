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
  @Input() @Optional() cat: string | any = undefined;
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
  page: number = 1;

  ngOnInit(): void {
    this.loadProducts(this.page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('cat' in changes) {
      this.loadProducts(this.page);
    }
  }

  loadProducts(page: number): void {
    const url = this.cat
      ? `http://127.0.0.1:8000/api/products/${this.cat}?page=${page}`
      : `http://127.0.0.1:8000/api/products?page=${page}`;

    this.http.get<ApiResponse>(url).subscribe({
      next: (response) => {
        this.products = response.products.data;
        this.total = response.products.total;
        console.log(this.products, 'Products loaded');
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
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

  updateProductStatus(id: number, status: number): void {
    const statusBoolean = status === 1 ? true : false;
    this.productsOperation.updateProductStatus(id, statusBoolean).subscribe({
      next: (res) => {
        console.log('Product status updated successfully', res);
        this.loadProducts(this.page);
      },
      error: (error) => {
        console.error('Error updating product status:', error);
      },
    });
  }

  deleteProduct(id: number): void {
    this.productsOperation.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.loadProducts(this.page);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      },
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.page = event.page ? event.page + 1 : 1;
    this.loadProducts(this.page);
  }
}
