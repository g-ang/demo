import {Component} from '@angular/core';
import {AccountService, warn, auth, Router, Account} from './account.service';
import {NgModel, FormControl, FormGroup, Validators, ValidatorFn, NgForm } from '@angular/forms';



@Component({
    templateUrl: '/app/account/register.component.html',
})

export class RegisterComponent {
    account = new Account();
    emailGroup: FormGroup;
    constructor(private accountService: AccountService, private router: Router) {

        this.emailGroup = new FormGroup({
            'email': new FormControl('', Validators.required)
        }, this.ValidateEmail)
    }

    ValidateEmail(g: FormGroup){
        var value = g.get("email").value.trim();
        var email_regexp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
        if (value=="" || (value.length <= 5 || !email_regexp.test(value))) {
            return { 'mismatch': true };
        }
        return null;
     }

    register(f: NgForm) {
        this.accountService.create(this.account).then(re => {
            if (re.isSucc) {
                warn.succ("创建帐户成功,请72小时内激活帐号");
            } else {
                warn.fail(re.error_msg);
            }
        });
    }
}