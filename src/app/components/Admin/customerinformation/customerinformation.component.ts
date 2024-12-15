import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// Define the interface outside the component
interface GeoLocation {
  lat: string;
  long: string;
}

interface Address {
  geolocation: GeoLocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

interface Name {
  firstname: string;
  lastname: string;
}

export interface UserInformation {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
  __v: number;
}

@Component({
  selector: 'app-customerinformation',
  standalone: true,
  imports:[CommonModule,Dialog, ButtonModule, InputTextModule],
  templateUrl: './customerinformation.component.html',
  styleUrls: ['./customerinformation.component.scss'],
})
export class CustomerinformationComponent implements OnInit {
  constructor(private http: HttpClient) {}

  @Input() userId: number | undefined;

  @Input() @Optional() getDetails:boolean = false;

  userInformation: UserInformation | any = undefined;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  visible: boolean = false;
  readMore:boolean=false;

  ngOnInit(): void {
    if (this.userId !== undefined) {
      this.fetchUserInformation(this.userId);
    } else {
      console.warn('User ID is undefined. Skipping API call.');
    }
  }

  private fetchUserInformation(userId: number): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.http.get<UserInformation>(`https://fakestoreapi.com/users/${userId}`).subscribe(
      (response) => {
        this.userInformation = response;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch user data. Please try again later.';
        this.isLoading = false;
        console.error(`Error fetching user data for userId ${userId}:`, error);
      }
    );
  }

  showDialog() {
    this.visible = true;
    if(this.readMore){
      this.readMore=false
    }
}
toggleReadMore():void{
  this.readMore=!this.readMore
}

}
