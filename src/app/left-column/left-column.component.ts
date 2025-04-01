import { Component } from '@angular/core';
import { AboutMeComponent } from './about-me/about-me.component';
import { EducationComponent } from './education/education.component';
import { NamePhotoComponent } from './name-photo/name-photo.component';
import { SkillsComponent } from './skills/skills.component';

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [AboutMeComponent, EducationComponent, NamePhotoComponent, SkillsComponent],
  templateUrl: './left-column.component.html',
  styleUrl: './left-column.component.scss'
})
export class LeftColumnComponent {
  skills = [
    { name: 'Adobe Photoshop', level: 0 },
    { name: 'Adobe Illustrator', level: 0 },
    { name: 'Microsoft Word', level: 0 },
    { name: 'Microsoft PowerPoint', level: 0 },
    { name: 'HTML/CSS', level: 0 }
  ];

  updateSkill(updatedSkill: { name: string; level: number }) {
    this.skills = this.skills.map(skill =>
      skill.name === updatedSkill.name ? { ...skill, level: updatedSkill.level } : skill
    );
  }
}
