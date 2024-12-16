import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { CategoriesComponent } from '../categories/categories.component';

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
      .get('https://fakestoreapi.com/products/categories')
      .subscribe((categories) => {
        this.cats = categories;
      });
  }

  getTheCat(cat: string) {
    console.log(cat, 'cat');
    this.router.navigate([`/products/products-categories/${cat}`]);
    this.category = cat;
  }

}
