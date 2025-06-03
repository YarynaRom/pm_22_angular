// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
//
// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [FormsModule],
//   template: `
//     <div class="custom-wall">
//       <h2 class="custom-title">Register</h2>
//       <form (ngSubmit)="register()">
//         <label>Name:</label>
//         <input type="text" [(ngModel)]="username" name="username" required>
//         <label>Password:</label>
//         <input type="password" [(ngModel)]="password" name="password" required>
//         <button type="submit" class="custom-btn">Okey</button>
//       </form>
//     </div>
//   `,
//   styleUrls: ['./log-reg.component.scss']
// })
// export class RegisterComponent {
//   username = '';
//   password = '';
//
//   @Output() registerSuccess = new EventEmitter<void>();
//
//   constructor(private router: Router) {}
//
//   register() {
//     if (this.username && this.password) {
//       const users = JSON.parse(localStorage.getItem('users') || '[]');
//       const existing = users.find((u: any) => u.username === this.username);
//
//       if (existing) {
//         alert('Такий користувач вже існує');
//         return;
//       }
//
//       const newUser = {
//         username: this.username,
//         password: this.password,
//         role: 'user'
//       };
//
//       users.push(newUser);
//       localStorage.setItem('users', JSON.stringify(users));
//
//       localStorage.setItem('auth', 'true');
//       localStorage.setItem('username', newUser.username);
//       localStorage.setItem('role', newUser.role);
//       alert('Register is successfull');
//       this.registerSuccess.emit();
//     } else {
//       alert('Fill in all fields');
//     }
//   }
// }
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="custom-wall">
      <h2 class="custom-title">Register</h2>
      <form (ngSubmit)="register()">
        <label>Name:</label>
        <input type="text" [(ngModel)]="username" name="username" required>
        <label>Password:</label>
        <input type="password" [(ngModel)]="password" name="password" required>
        <button type="submit" class="custom-btn">Okey</button>
      </form>
    </div>
  `,
  styleUrls: ['./log-reg.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';

  // @Output() registerSuccess = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();


  constructor(private router: Router) {}

  register() {
    if (this.username && this.password) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existing = users.find((u: any) => u.username === this.username);

      if (existing) {
        alert('Такий користувач вже існує');
        return;
      }

      const newUser = {
        username: this.username,
        password: this.password,
        role: 'user'
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('auth', 'true');
      localStorage.setItem('username', newUser.username);
      localStorage.setItem('role', newUser.role);

      alert('Register is successful');
      this.registerSuccess.emit();

      this.router.navigate(['/']).then(() => {
        location.reload();
      });
    } else {
      alert('Fill in all fields');
    }
  }


}
