import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerinformationComponent } from '../customerinformation/customerinformation.component';
import { DrawerModule } from 'primeng/drawer';
import { FormhandlerComponent } from '../Shared/formhandler/formhandler.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,TableModule,CustomerinformationComponent,DrawerModule,FormhandlerComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(private http: HttpClient) {}
  users: any[] = [''];
  visible: boolean = false;


  fields = [
    { label: 'Full Name', model: 'name' },
    { label: 'Email Address', model: 'email' },
    { label: 'Age', model: 'age' },
    { label: 'Profile Picture', model: 'profilePic' }
  ];

  modelData = {};

  ngOnInit(): void {
    this.http.get<string[]>('https://fakestoreapi.com/users').subscribe((user) => {
      this.users = user;
      console.log(this.users);
    });

    this.modelData = {
      name: 'John Doe',
      email: 'john@example.com', // Auto-detects as 'email'
      age: '30', // Auto-detects as 'number'
      profilePic: 'avatar.png' // Auto-detects as 'file'
    };

  }

  formData = {
    name: '',
    email: '',
  };



  saveForm(data: any) {
    console.log('Saving Data:', data);
  }

  updateForm(data: any) {
    console.log('Updating Data:', data);
  }
}


