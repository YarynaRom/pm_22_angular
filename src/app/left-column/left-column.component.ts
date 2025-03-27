import { Component } from '@angular/core';
// import * as trace_events from 'node:trace_events';
import {AboutMeComponent} from './about-me/about-me.component';
import {EducationComponent} from './education/education.component';
import {NamePhotoComponent} from './name-photo/name-photo.component';
import {SkillsComponent} from './skills/skills.component';

@Component({
  selector: 'app-left-column',
  standalone: true,
  imports: [AboutMeComponent,EducationComponent,NamePhotoComponent,SkillsComponent],
  templateUrl: './left-column.component.html',
  styleUrl: './left-column.component.scss'
})
export class LeftColumnComponent {

}
