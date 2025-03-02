import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { Ripple } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { Tag } from 'primeng/tag';
import { RadioButton } from 'primeng/radiobutton';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table } from 'primeng/table';
import { ProductService } from '../../../services/product.service';


interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [TableModule, Dialog, Ripple, SelectModule, ToastModule, ToolbarModule, ConfirmDialog, InputTextModule, TextareaModule, CommonModule, FileUpload, Tag, RadioButton, Rating, InputTextModule, FormsModule, InputNumber, IconFieldModule, InputIconModule, ButtonModule],
  providers: [ProductService, MessageService, ConfirmationService],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})


export class OrderComponent implements OnInit {

    productDialog: boolean = false;
    products: Product[] = [];
    product: Product = {};
    selectedProducts: Product[] | null = null;
    submitted: boolean = false;
    statuses: { label: string, value: string }[] = [];
    cols: Column[] = [];
    exportColumns: ExportColumn[] = [];

    @ViewChild('dt') dt!: Table;

    constructor(
      private productService: ProductService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      this.loadDemoData();
    }

    exportCSV(): void {
      this.dt.exportCSV();
    }

    loadDemoData(): void {
      this.productService.getProducts().then((data) => {
        this.products = data;
        this.cd.markForCheck();
      });

      this.statuses = [
        { label: 'INSTOCK', value: 'instock' },
        { label: 'LOWSTOCK', value: 'lowstock' },
        { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.cols = [
        { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
        { field: 'name', header: 'Name' },
        { field: 'image', header: 'Image' },
        { field: 'price', header: 'Price' },
        { field: 'category', header: 'Category' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    openNew(): void {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    }

    editProduct(product: Product): void {
      this.product = { ...product };
      this.productDialog = true;
    }

    deleteSelectedProducts(): void {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
          this.selectedProducts = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000
          });
        }
      });
    }

    hideDialog(): void {
      this.productDialog = false;
      this.submitted = false;
    }

    deleteProduct(product: Product): void {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.products = this.products.filter((val) => val.id !== product.id);
          this.product = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000
          });
        }
      });
    }

    findIndexById(id: string): number {
      return this.products.findIndex(product => product.id === id);
    }

    createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }

    getSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
      switch (status) {
        case 'INSTOCK':
          return 'success';
        case 'LOWSTOCK':
          return 'warn';
        case 'OUTOFSTOCK':
          return 'danger';
        default:
          return 'info';
      }
    }

    saveProduct(): void {
      this.submitted = true;

      if (this.product.name?.trim()) {
        if (this.product.id) {
          const index = this.findIndexById(this.product.id);
          if (index !== -1) {
            this.products[index] = this.product;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Updated',
              life: 3000
            });
          }
        } else {
          this.product.id = this.createId();
          this.product.image = 'product-placeholder.svg';
          this.products.push(this.product);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Created',
            life: 3000
          });
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
      }
    }

    onSearchInput(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      this.dt.filterGlobal(inputElement.value, 'contains');
    }

}


