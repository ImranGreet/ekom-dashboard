import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, NgModule, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { FileUpload } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { PurchasediteamsService } from '../../../../services/purchasediteams.service';


interface City {
  name: string;
  code: string;
}


interface ProductInfo {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-productinfoupdate',
  standalone: true,
  imports: [TabsModule,CommonModule,FormsModule,InputTextModule,Select,ReactiveFormsModule,TextareaModule,CardModule,FileUpload,ButtonModule,JsonPipe],
  templateUrl: './productinfoupdate.component.html',
  styleUrl: './productinfoupdate.component.scss'
})



export class ProductinfoupdateComponent implements OnInit,OnChanges {

  constructor(private purchasedItemDetails:PurchasediteamsService){

  }

  cities: City[] | undefined;

  formGroup: FormGroup | undefined;

  @Input() @Optional() productInfo: ProductInfo|undefined = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  };

  formGroups: FormGroup = new FormGroup({
    productTitle: new FormControl(''),
    productPrice: new FormControl(null),
    productDescription: new FormControl(''),
    productCategory: new FormControl(''),
    productImage: new FormControl('')
  });

  ngOnInit() {
    this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    this.formGroup = new FormGroup({
        selectedCity: new FormControl<City | null>(null),

    });

}


ngOnChanges(changes: SimpleChanges): void {


  if (changes['productInfo'] && changes['productInfo'].currentValue) {
    this.updateForm(changes['productInfo'].currentValue);
  }
}

private updateForm(productInfo: ProductInfo): void {
  this.formGroups.patchValue({
    productTitle: productInfo.title,
    productPrice: productInfo.price,
    productDescription: productInfo.description,
    productCategory: productInfo.category,
    productImage: productInfo.image
  });
}


}





