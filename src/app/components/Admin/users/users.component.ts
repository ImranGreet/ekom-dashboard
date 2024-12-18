import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CustomerinformationComponent } from '../customerinformation/customerinformation.component';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,TableModule,CustomerinformationComponent,DrawerModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(private http: HttpClient) {}
  users: any[] = [''];
  visible: boolean = false;

  ngOnInit(): void {
    this.http.get<string[]>('https://fakestoreapi.com/users').subscribe((user) => {
      this.users = user;
      console.log(this.users);
    });

  }
}
