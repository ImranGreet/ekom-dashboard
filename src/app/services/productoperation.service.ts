import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { ProductsResponse, Product } from './../../scripts/Productcustom';

@Injectable({
  providedIn: 'root',
})
export class ProductoperationService {
  constructor(private http: HttpClient) {}

  // Private properties to encapsulate state
  private _products = new BehaviorSubject<Product[]>([]);
  private _currentPageNumber = new BehaviorSubject<number>(1);
  private _lastPageNumber = new BehaviorSubject<number>(10);
  private _firstPageUrl = new BehaviorSubject<string>('');
  private _lastPageUrl = new BehaviorSubject<string>('');
  private _nextPageUrl = new BehaviorSubject<string | null>(null);
  private _prevPageUrl = new BehaviorSubject<string | null>(null);
  private _perPage = new BehaviorSubject<number>(10);
  private _total = new BehaviorSubject<number>(0);
  private _from = new BehaviorSubject<number>(0);
  private _to = new BehaviorSubject<number>(0);

  // Public observables for components to subscribe to
  products$ = this._products.asObservable();
  currentPageNumber$ = this._currentPageNumber.asObservable();
  lastPageNumber$ = this._lastPageNumber.asObservable();
  firstPageUrl$ = this._firstPageUrl.asObservable();
  lastPageUrl$ = this._lastPageUrl.asObservable();
  nextPageUrl$ = this._nextPageUrl.asObservable();
  prevPageUrl$ = this._prevPageUrl.asObservable();
  perPage$ = this._perPage.asObservable();
  total$ = this._total.asObservable();
  from$ = this._from.asObservable();
  to$ = this._to.asObservable();

  // Load all products
  loadAllProducts(): void {
    this.http
      .get<ProductsResponse>('http://127.0.0.1:8000/api/products')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error loading products:', error.message);
          return throwError(() => new Error('Failed to load products.'));
        })
      )
      .subscribe((response) => {
        this._products.next(response.products.data);
        this._currentPageNumber.next(response.products.current_page);
        this._lastPageNumber.next(response.products.last_page);
        this._firstPageUrl.next(response.products.first_page_url);
        this._lastPageUrl.next(response.products.last_page_url);
        this._nextPageUrl.next(response.products.next_page_url);
        this._prevPageUrl.next(response.products.prev_page_url);
        this._perPage.next(response.products.per_page);
        this._total.next(response.products.total);
        this._from.next(response.products.from);
        this._to.next(response.products.to);
      
      });
  }

  // Load next page
  loadNextPage(): void {
    const nextPageUrl = this._nextPageUrl.getValue();
    if (nextPageUrl) {
      this.http
        .get<ProductsResponse>(nextPageUrl)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error loading next page:', error.message);
            return throwError(() => new Error('Failed to load next page.'));
          })
        )
        .subscribe((response) => {
          this.updateState(response);
        });
    }
  }

  // Load previous page
  loadPreviousPage(): void {
    const prevPageUrl = this._prevPageUrl.getValue();
    if (prevPageUrl) {
      this.http
        .get<ProductsResponse>(prevPageUrl)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error loading previous page:', error.message);
            return throwError(() => new Error('Failed to load previous page.'));
          })
        )
        .subscribe((response) => {
          this.updateState(response);
        });
    }
  }

  // Helper method to update state
  private updateState(response: ProductsResponse): void {
    this._products.next(response.products.data);
    this._currentPageNumber.next(response.products.current_page);
    this._lastPageNumber.next(response.products.last_page);
    this._firstPageUrl.next(response.products.first_page_url);
    this._lastPageUrl.next(response.products.last_page_url);
    this._nextPageUrl.next(response.products.next_page_url);
    this._prevPageUrl.next(response.products.prev_page_url);
    this._perPage.next(response.products.per_page);
    this._total.next(response.products.total);
    this._from.next(response.products.from);
    this._to.next(response.products.to);
  }
}
