import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p class="title">All users:</p>
    <div class="user-list">
      <div *ngFor="let user of users" class="user-row">
        <span>{{ user.username }} ({{ user.role }})</span>
        <button (click)="deleteUser(user.username)" class="custom-btn">Delete</button>
      </div>
    </div>
<!--    <button (click)="logout()" class="logout-btn">Log out</button>-->
  `,
  styles: [`
    .title {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }

    .user-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
      margin: 0 auto 20px auto;
    }

    .user-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      background-color: #f1f1f1;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .custom-btn {
      background-color: darkslategray;
      color: white;
      border: none;
      padding: 6px 12px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 6px;
      transition: background-color 0.2s ease-in-out;
    }

    .custom-btn:hover {
      background-color: #2f4f4f;
    }
  `]
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  username = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    this.users = allUsers.filter((u: any) => u.username.toLowerCase() !== 'admin');
    this.username = localStorage.getItem('username') || 'admin';
  }

  deleteUser(usernameToDelete: string) {
    const confirmed = confirm(`Ви впевнені, що хочете видалити користувача ${usernameToDelete}?`);
    if (!confirmed) return;

    this.users = this.users.filter(u => u.username !== usernameToDelete);

    const updatedStorage = JSON.parse(localStorage.getItem('users') || '[]')
      .filter((u: any) => u.username !== usernameToDelete);

    localStorage.setItem('users', JSON.stringify(updatedStorage));
  }

  logout() {
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
