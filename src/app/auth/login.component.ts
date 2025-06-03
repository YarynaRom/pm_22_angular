import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div class="custom-wall">
      <h2 class="custom-title"> Log in</h2>
      <label>Name:</label>
      <input [(ngModel)]="username" placeholder="Name">
      <label>Password:</label>
      <input [(ngModel)]="password" placeholder="Password" type="password">
      <button (click)="login()" class="custom-btn">Okey</button>
    </div>
  `,
  styleUrls: ['./log-reg.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  @Output() loginSuccess = new EventEmitter<void>();
  @Output() switchToRegister = new EventEmitter<void>();

  constructor(private router: Router) {}

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u: any) =>
      u.username === this.username && u.password === this.password
    );

    if (found) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('username', found.username);
      localStorage.setItem('role', found.role);
      this.loginSuccess.emit();
      this.router.navigate(['/admin']);
    }
  }

}
