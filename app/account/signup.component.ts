import {Component} from '@angular/core';
import {AccountService, warn, auth, Router, Account} from './account.service';
@Component({
    templateUrl: '/app/account/signup.component.html',
})

export class Signup {
    constructor(accountSer: AccountService, router: Router) {

    }
}