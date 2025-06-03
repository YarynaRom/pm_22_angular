import { Component } from '@angular/core';
import { LeftColumnComponent } from './left-column/left-column.component';
import { RightColumnComponent } from './right-column/right-column.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    LeftColumnComponent,
    RightColumnComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    RouterLink
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isAuthenticated = false;
  username = '';
  role = '';
  showLogin = false;
  showRegister = false;
  authState = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const hasAdmin = storedUsers.some((u: any) => u.username === 'admin');

    if (!hasAdmin) {
      storedUsers.push({ username: 'admin', password: '1234', role: 'admin' });
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    // НЕ авторизуємо одразу
    this.isAuthenticated = localStorage.getItem('auth') === 'true';
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';

  }


  onLoginSuccess() {
    this.isAuthenticated = true;
    this.role = localStorage.getItem('role') || '';
    this.username = localStorage.getItem('username') || '';
    this.closeModals();
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  openLogin() {
    this.showLogin = true;
    this.showRegister = false;
  }

  openRegister() {
    this.showRegister = true;
    this.showLogin = false;
  }

  closeModals() {
    this.showLogin = false;
    this.showRegister = false;
  }

  switchToLogin() {
    this.showRegister = false;
    this.showLogin = true;
  }

  switchToRegister() {
    this.showLogin = false;
    this.showRegister = true;
  }

}
