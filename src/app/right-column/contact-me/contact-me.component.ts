import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../resume.service';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent implements OnInit {
  contactForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\+\s\(\)]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  sendMessage(data: { name: string; email: string; phone: string }): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', data).pipe(
      catchError((error) => {
        console.error('Помилка надсилання:', error);
        throw error;
      })
    );
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.sendMessage(this.contactForm.value).subscribe({
      next: () => {
        this.successMessage = null;
        this.errorMessage = null;
        this.formSubmitted = true;
      },
      error: (error) => {
        this.errorMessage = 'Помилка надсилання: ' + error.message;
        this.successMessage = null;
      }
    });
  }
}
