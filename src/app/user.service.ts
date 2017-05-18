import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    user = {
        isLoggedIn: true,
        name: 'REAL User'
    };
    getUser() { return this.user;}
  
}