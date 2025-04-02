import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ResumeService } from '../../resume.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-about-me',
  //imports: [],
  standalone: true,
  imports: [NgIf, NgFor, HttpClientModule, FormsModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
// export class AboutMeComponent {
//   isTextVisible: boolean = true; // Контроль видимості тексту
//   paragraphs: string[] = [
//     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
//     "It has survived not only five centuries, but the leap into electronic typesetting unchanged."
//   ];

//   toggleText() {
//     this.isTextVisible = !this.isTextVisible;
//   }
// }
// @Component({
//   selector: 'app-about-me',
//   standalone: true,
//   imports: [NgIf, NgFor, ],
//   templateUrl: './about-me.component.html',
//   styleUrl: './about-me.component.scss'
// })
export class AboutMeComponent implements OnInit {
  isTextVisible: boolean = true;
  paragraphs: string[] = [];
  errorMessage: string | null = null;
  newAboutMeText: string = '';

  constructor(private resumeService: ResumeService) {}

  ngOnInit() {
    this.resumeService.getAboutMe().subscribe({
      next: (data) => {
        this.paragraphs = [data.body];
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
    if (!this.newAboutMeText.trim()) return;

    this.resumeService.sendAboutMe(this.newAboutMeText).subscribe({
      next: (response) => {
        console.log('Відправлено успішно:', response);
        this.paragraphs.push(this.newAboutMeText); // Додаємо новий текст у список
        this.newAboutMeText = ''; // Очищаємо поле
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
