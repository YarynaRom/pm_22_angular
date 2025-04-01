import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  imports: [NgFor], // Додаємо NgFor
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  @Input() skills: { name: string; level: number }[] = [];
  @Output() skillLevelChanged = new EventEmitter<{ name: string; level: number }>(); // Подія для зміни рівня

  changeLevel(skill: { name: string; level: number }, newLevel: number) {
    this.skillLevelChanged.emit({ name: skill.name, level: newLevel });
  }
}
