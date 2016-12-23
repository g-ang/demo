import {Component} from '@angular/core';
import {AccountService, warn, auth,Router, Account} from './account.service';

@Component({
    templateUrl: '/app/account/login.component.html',
})

export class LoginComponent {
    account = new Account();
    session: Account;

    constructor(private accountService: AccountService, private router: Router) {

    }

    login() {
        this.accountService.login(this.account).then(
            re => {
                if (!re.isSucc) {
                    warn.fail(re.error_msg);
                } else {
                    warn.succ("登录成功");
                    var account: Account = <Account>re.item;
                    auth.setAccount(account);
                    this.router.navigateByUrl('/account');
                }
            }
        )
    }
    create() { }
}