import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-about-me',
  //imports: [],
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  isTextVisible: boolean = true; // Контроль видимості тексту
  paragraphs: string[] = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
    "It has survived not only five centuries, but the leap into electronic typesetting unchanged."
  ];

  toggleText() {
    this.isTextVisible = !this.isTextVisible;
  }
}
