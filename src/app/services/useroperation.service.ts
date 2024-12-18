import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UseroperationService {
  constructor(private http: HttpClient) {}
  getAllUsers() {
    return this.http.get<string[]>('https://fakestoreapi.com/users');
  }
  getSingleUser(userId: number) {
    return this.http.get<string[]>(`https://fakestoreapi.com/users/${userId}`);
  }
  getUsersInLimit(limitNumber: number) {
    return this.http.get<string[]>(
      `https://fakestoreapi.com/users?limit=${limitNumber}`
    );
  }
  addNewUser(): void {
    this.http.post<string[]>(`https://fakestoreapi.com/users`, {
      body: JSON.stringify({
        email: 'John@gmail.com',
        username: 'johnd',
        password: 'm38rmF$',
        name: {
          firstname: 'John',
          lastname: 'Doe',
        },
        address: {
          city: 'kilcoole',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496',
          },
        },
        phone: '1-570-236-7033',
      }),
    });
  }

  updateUser() {
    this.http.put<string[]>(`https://fakestoreapi.com/users`, {
      body: JSON.stringify({
        email: 'John@gmail.com',
        username: 'johnd',
        password: 'm38rmF$',
        name: {
          firstname: 'John',
          lastname: 'Doe',
        },
        address: {
          city: 'kilcoole',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496',
          },
        },
        phone: '1-570-236-7033',
      }),
    });
  }

  deleteUser(userId:number){
    this.http.delete<string>(`https://fakestoreapi.com/users/${userId}`);
  }
}
