import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../scripts/userinfo';

@Injectable({
  providedIn: 'root',
})
abstract class UserService {
  constructor(protected http: HttpClient) {}

  abstract createUser(user: User): void;
  abstract getUser(id: number): User | undefined;
  abstract updateUser(id: number, updatedUser: Partial<User>): void;
  abstract deleteUser(id: number): void;
}

export class UseroperationService extends UserService {
  constructor(http: HttpClient) {
    super(http);
  }

  private users: User[] = [];

  createUser(user: User): void {
    this.users.push(user);
    console.log('User created successfully:', user);
  }

  getUser(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: number, updatedUser: Partial<User>): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
      console.log('User updated successfully:', this.users[index]);
    } else {
      console.log('User not found');
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
    console.log('User deleted successfully');
  }
}
