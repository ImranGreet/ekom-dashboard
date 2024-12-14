import { HttpClient } from '@angular/common/http';
import { Component, Input, numberAttribute, OnInit, Optional } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PurchasediteamsService } from '../../../services/purchasediteams.service';
import { ButtonModule } from 'primeng/button';

// Define the interface outside the component
export interface PurchasedItems {
  productId: number;
  quantity: number;
}

@Component({
  selector: 'app-purchaseditems',
  standalone: true,
  imports: [TableModule,ButtonModule],
  templateUrl: './purchaseditems.component.html',
  styleUrls: ['./purchaseditems.component.scss'], // Corrected key name
})
export class PurchaseditemsComponent {
  @Input() purchasedItems: PurchasedItems[] = [];
  @Input() userId: number | undefined = undefined;
  userInformation: object | void | undefined = undefined;
  purchasedItemsContainer: Array<object> = []; // Initialize as an empty array
  id: number | undefined = undefined;
  @Input() @Optional() purchasedItemsQuantity:number|undefined=undefined;

  constructor(private purchasedItemsService: PurchasediteamsService) {}

  getUserPurchasedDetails(): void {
   this.purchasedItemsService.findProductById(1);
  }
}
