import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-productinfoupdate',
  standalone: true,
  imports: [TabsModule,CommonModule,FormsModule,InputTextModule,Select,ReactiveFormsModule,TextareaModule,CardModule,FileUpload,ButtonModule],
  templateUrl: './productinfoupdate.component.html',
  styleUrl: './productinfoupdate.component.scss'
})



export class ProductinfoupdateComponent implements OnInit,OnChanges {

  constructor(private purchasedItemDetails:PurchasediteamsService){

  }

  cities: City[] | undefined;

  formGroup: FormGroup | undefined;

  @Input() @Optional() productInfo:any;


  ngOnInit() {
    this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    this.formGroup = new FormGroup({
        selectedCity: new FormControl<City | null>(null)
    });

}

ngOnChanges(changes: SimpleChanges): void {
  console.log(this.productInfo,'prod');
}
}
