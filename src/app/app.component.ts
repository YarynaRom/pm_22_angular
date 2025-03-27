import { Component } from '@angular/core';
import {LeftColumnComponent} from './left-column/left-column.component';
import {RightColumnComponent} from './right-column/right-column.component';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  imports:[
    LeftColumnComponent,
    RightColumnComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-angular-app';
}
