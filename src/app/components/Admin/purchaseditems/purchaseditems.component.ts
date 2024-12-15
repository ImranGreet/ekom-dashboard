import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  numberAttribute,
  OnInit,
  Optional,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { PurchasediteamsService } from '../../../services/purchasediteams.service';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, DecimalPipe } from '@angular/common';
import { routes } from '../../../app.routes';
import { Skeleton } from 'primeng/skeleton';
// Define the interface outside the component
export interface PurchasedItems {
  productId: number;
  quantity: number;
}

@Component({
  selector: 'app-purchaseditems',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    Dialog,
    InputTextModule,
    CommonModule,
    DecimalPipe,
    Skeleton
  ],
  templateUrl: './purchaseditems.component.html',
  styleUrls: ['./purchaseditems.component.scss'], // Corrected key name
})
export class PurchaseditemsComponent {
  @Input() purchasedItems: PurchasedItems[] = [];
  @Input() userId: number | undefined = undefined;
  userInformation: object | void | undefined = undefined;
  purchasedItemsContainer: Array<object> = []; // Initialize as an empty array
  id: number | undefined = undefined;
  @Input() @Optional() purchasedItemsQuantity: number | undefined = undefined;
  visible: boolean = false;
  position: string = 'center';

  constructor(private purchasedItemsService: PurchasediteamsService) {}

  getUserPurchasedDetails(): void {
    this.purchasedItems.forEach((product) => {
      this.purchasedItemsService.findProductById(product.productId).subscribe(
        (productInfo) => {
          this.purchasedItemsContainer.push({
            productDetails: productInfo,
            productQuantity: product.quantity,
          });
        },
        (error) => {
          console.error(
            `Error fetching product with ID ${product.productId}:`,
            error
          );
        }
      );
    });
    setTimeout(() => {
      this.showDialog('topright');
      console.log("Okay");
    }, 1000);
  }

  showDialog(position: string) {
    this.visible = true;
    this.position = position;
    this.purchasedItemsContainer.length = 0;
  }
}
