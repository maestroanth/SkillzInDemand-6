import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';

@Component({
    selector: 'app-welcome',
    template: '<h3 class="welcome" ><i>{{welcome}}</i></h3>'
})
export class WelcomeComponent implements OnInit {
    welcome = '-- not initialized yet --';
    constructor(private userService: UserService) { }
    
    ngOnInit(): void {

        if (this.userService.user.isLoggedIn == true) {
            this.welcome = 'Welcome, ' + this.userService.user.name;
        }
        else {
            this.welcome = 'You aren\'t logged in you idiot!';
        }

    }
}