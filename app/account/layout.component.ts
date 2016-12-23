import {Component} from '@angular/core';
import {AccountService, warn, auth, Router} from './account.service';
import {Location} from '@angular/common';
export * from  './account.service';
import {Account} from './account';

@Component({
    templateUrl: '/app/account/layout.component.html'
})

export class LayoutComponent {
    account = new Account();
    auth = auth;

    constructor(private accountService: AccountService, private router: Router, private location: Location) {
        console.log(location.path());
        this.accountService.auth().then(auth => {
            this.account = auth.account();
          
            if (!auth.isLogin()) {
                if (location.path() != "/account/register") {
                    router.navigateByUrl('/account/login')
                }
            }
        });
    }

    logout() {
        auth.logout().then(re => {
            if (re.isSucc) {
                auth.setAccount(new Account());
                this.router.navigateByUrl('/account/login')
            }
        })
    }
}