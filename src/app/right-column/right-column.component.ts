import { Component } from '@angular/core';
import {ContactMeComponent} from './contact-me/contact-me.component';
import {JobExperienceComponent} from './job-experience/job-experience.component';
import {ReferencesComponent} from './references/references.component';

@Component({
  selector: 'app-right-column',
  imports: [ContactMeComponent, JobExperienceComponent,ReferencesComponent],
  standalone: true,
  templateUrl: './right-column.component.html',
  styleUrl: './right-column.component.scss'
})
export class RightColumnComponent {

}
