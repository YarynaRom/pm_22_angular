// import { Component, OnInit } from '@angular/core';
// import { NgIf, NgFor } from '@angular/common';
// import { ResumeService } from '../../resume.service';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
//
//
// @Component({
//   selector: 'app-about-me',
//   //imports: [],
//   standalone: true,
//   imports: [NgIf, NgFor, HttpClientModule, FormsModule],
//   templateUrl: './about-me.component.html',
//   styleUrl: './about-me.component.scss'
// })
// export class AboutMeComponent implements OnInit {
//   isTextVisible: boolean = true;
//   paragraphs: string[] = [];
//   errorMessage: string | null = null;
//   newAboutMeText: string = '';
//
//   constructor(private resumeService: ResumeService) {}
//
//   ngOnInit() {
//     this.resumeService.getAboutMe().subscribe({
//       next: (data) => {
//         this.paragraphs = [data.body];
//       },
//       error: (error) => {
//         this.errorMessage = error.message;
//       }
//     });
//   }
//
//   toggleText() {
//     this.isTextVisible = !this.isTextVisible;
//   }
//   sendNewText() {
//     if (!this.newAboutMeText.trim()) return;
//
//     this.resumeService.sendAboutMe(this.newAboutMeText).subscribe({
//       next: (response) => {
//         console.log('Відправлено успішно:', response);
//         this.paragraphs.push(this.newAboutMeText); // Додаємо новий текст у список
//         this.newAboutMeText = ''; // Очищаємо поле
//       },
//       error: (error) => {
//         this.errorMessage = error.message;
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ResumeService } from '../../resume.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [NgIf, NgFor, HttpClientModule, FormsModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
  isTextVisible: boolean = true;
  paragraphs: string[] = [];
  errorMessage: string | null = null;
  newAboutMeText: string = '';

  constructor(private resumeService: ResumeService) {}

  ngOnInit() {
    this.resumeService.getAboutMe().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.paragraphs = data.map(item => item.body); // підтримка масиву
        } else if (data.body) {
          this.paragraphs = [data.body]; // підтримка об'єкта
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  toggleText() {
    this.isTextVisible = !this.isTextVisible;
  }

  sendNewText() {
    const trimmed = this.newAboutMeText.trim();
    if (!trimmed) return;

    this.resumeService.sendAboutMe(trimmed).subscribe({
      next: (response) => {
        this.paragraphs.push(trimmed);
        this.newAboutMeText = '';
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
