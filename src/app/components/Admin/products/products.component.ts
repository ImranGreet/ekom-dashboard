import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { CategoriesComponent } from '../categories/categories.component';


interface Category {
  id: number;
  category: string;
  status: number;
  created_at: string;
  updated_at: string;
}

interface CategoriesResponse {
  message: string;
  categories: {
    current_page: number;
    data: Category[];
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

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule, TabsModule,CategoriesComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  cats: any = [];
  category: string = '';

  constructor(private http: HttpClient, private router: Router, ) {}
  ngOnInit(): void {
    this.http
      .get<CategoriesResponse>('http://127.0.0.1:8000/api/categories')
      .subscribe((response) => {
        this.cats = response.categories.data;
        console.log(this.cats, 'cats');
      });
  }

  getTheCat(cat: string) {
    console.log(cat, 'cat');
    this.router.navigate([`/products/products-categories/${cat}`]);
    this.category = cat;
  }



}
