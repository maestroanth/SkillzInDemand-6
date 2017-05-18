import { Component } from '@angular/core';
//import { UserService } from './user.service'; //I'm confused about registering services globally


@Component({
  selector: 'app-root',
  //providers: [UserService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';

}
