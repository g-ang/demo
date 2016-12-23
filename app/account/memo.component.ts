import {Component} from '@angular/core';
import {AccountService, warn, auth, Router, Account} from './account.service';

@Component({
    moduleId: module.id,
    templateUrl: '/app/account/memo.component.html',
})


export class MemoComponent {

    content: string;


    constructor(private accountService: AccountService, private router: Router) {

    }

    create() { }
}