import {Component} from '@angular/core';
import {AccountService, warn, auth, Router} from './account.service';
export * from  './account.service';
import {Account} from './account';

@Component({
    templateUrl: '/app/account/center.component.html',

})

export class CenterComponent {
    account = new Account();
    constructor(private accountService: AccountService, private router: Router) {
       
    }
}