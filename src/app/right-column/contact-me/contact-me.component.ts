// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ResumeService } from '../../resume.service';
// import { NgIf } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
//
// @Component({
//   selector: 'app-contact-me',
//   standalone: true,
//   imports: [NgIf, FormsModule, ReactiveFormsModule, CommonModule],
//   templateUrl: './contact-me.component.html',
//   styleUrl: './contact-me.component.scss'
// })
// export class ContactMeComponent implements OnInit {
//   contactForm!: FormGroup;
//   successMessage: string | null = null;
//   errorMessage: string | null = null;
//   contactDataList: { phone: string; email: string; name: string }[] = [];
//   showNewData = true;
//
//   constructor(private fb: FormBuilder, private resumeService: ResumeService) {}
//
//   ngOnInit() {
//     this.contactForm = this.fb.group({
//       phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\+\s\(\)]+$/)]],
//       email: ['', [Validators.required, Validators.email]],
//       name: ['', [Validators.required, Validators.minLength(3)]]
//     });
//
//     const savedData = localStorage.getItem('contactDataList');
//     if (savedData) {
//       this.contactDataList = JSON.parse(savedData);
//     }
//   }
//
//   onSubmit() {
//     if (this.contactForm.invalid) return;
//
//     const newContact = this.contactForm.value;
//     this.contactDataList.push(newContact);
//     localStorage.setItem('contactDataList', JSON.stringify(this.contactDataList));
//
//     this.successMessage = 'Контакт збережено!';
//     this.errorMessage = null;
//     this.contactForm.reset();
//     this.showNewData = true; // Автоматично показати після надсилання
//   }
//
//   toggleNewData() {
//     this.showNewData = !this.showNewData;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../resume.service';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent implements OnInit {
  contactForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  contactDataList: { phone: string; email: string; name: string }[] = [];
  showNewData = true;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\+\s\(\)]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });

    // Завантажити з сервера при ініціалізації
    this.resumeService.getContactData().subscribe({
      next: (data) => {
        this.contactDataList = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    const newContact = this.contactForm.value;

    // Надіслати на сервер
    this.resumeService.sendContactData(newContact).subscribe({
      next: () => {
        this.contactDataList.push(newContact);
        this.successMessage = 'Контакт збережено!';
        this.errorMessage = null;
        this.contactForm.reset();
        this.showNewData = true;
      },
      error: (err) => {
        this.successMessage = null;
        this.errorMessage = err.message;
      }
    });
  }

  toggleNewData() {
    this.showNewData = !this.showNewData;
  }
}
