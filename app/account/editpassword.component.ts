import {Component} from '@angular/core';
import {AccountService, warn, Router, Result} from './account.service';
import {NgForm} from '@angular/forms';
@Component({
    templateUrl: "/app/account/editpassword.component.html"
})
export class EditPasswordComponent {
    oldpassword: string;
    newpassword: string;
    constructor(private accountSer: AccountService, private router: Router) {}

    submit(f: NgForm) {
        this.accountSer.repassword(this.newpassword, this.oldpassword).then((res: Result) => {
            if (res.isSucc) {
                warn.succ("修改成功");
                f.resetForm();
            } else {
                warn.fail(res.error_msg);
            }
        })
    }
}