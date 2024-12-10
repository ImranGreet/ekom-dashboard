import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  constructor(private http: HttpClient) {}
  users: any[] = [''];
  ngOnInit(): void {
    this.http.get<string[]>('https://fakestoreapi.com/users').subscribe((user) => {
      this.users = user;
      console.log(this.users);
    });
    console.log('Okay');
  }
}
