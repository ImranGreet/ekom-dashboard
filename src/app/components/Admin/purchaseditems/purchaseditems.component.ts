import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

// Define the interface outside the component
export interface PurchasedItems {
  userId: number;
  quantity: number;
}

@Component({
  selector: 'app-purchaseditems',
  standalone: true,
  templateUrl: './purchaseditems.component.html',
  styleUrls: ['./purchaseditems.component.scss'] // Corrected key name
})
export class PurchaseditemsComponent implements OnInit {
  @Input() purchasedItems: PurchasedItems[] = [];
  @Input() userId: number | undefined = undefined;
  userInformation:undefined|object=undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.userId !== undefined) {
      this.http.get(`https://fakestoreapi.com/users/${this.userId}`).subscribe(
        (response) => {
          console.log('User data:', response);
          this.userInformation=response;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.warn('User ID is undefined. Skipping API call.');
    }
  }
}
