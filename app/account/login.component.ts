import {Component,Output,Input,OnChanges} from '@angular/core';
import {AccountService, warn, auth, Router, Account, Result, Auth} from './account.service';
import {NgModel, FormControl, FormGroup, Validators, ValidatorFn, NgForm } from '@angular/forms';
import {Location} from '@angular/common';


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

@Component({
    selector:'loginbox',
    templateUrl:'/app/account/loginbox.component.html',
}) 

export class LoginBoxComponent implements OnChanges {
    account = new Account();
    error_msg: string;
    auth = auth;
    @Input() isLogin = true;
    passwordConfirm ="";
    verify_code: string;
    mod = 'login';
    emailGroup: FormGroup;
    repasswordGroup: FormGroup;
    constructor(private accountService: AccountService, private router: Router, private location: Location) {

        this.emailGroup = new FormGroup({
            'email': new FormControl('', Validators.required)
        }, this.ValidateEmail);

        this.repasswordGroup = new FormGroup({
            'password': new FormControl('', Validators.minLength(3)),
            'passwordConfirm': new FormControl('', Validators.minLength(3)),
        }, this.passwordMatchValidator);

        this.repasswordGroup.setErrors({ 'neqpwd': 'bbbbbbbbb' })

        accountService.auth().then((test: Auth) => {
            this.isLogin = test.isLogin();
        });
    }


    passwordMatchValidator(g: FormGroup) {
        var passwordConfirm = g.get("passwordConfirm").value.trim();
        var password=g.get("password").value;

        if (passwordConfirm != password && password != '') {
            return { 'mismatch': true };
        }

        return null;
    }

    ValidateEmail(g: FormGroup) {
        var value = g.get("email").value.trim();
        var email_regexp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
        if (value == "" || (value.length <= 5 || !email_regexp.test(value))) {
            return { 'mismatch': true };
        }
        return null;
    }

    ngOnChanges() {

    }

    registerMod() {
        this.mod = 'register';
    }

    loginMod() {
        this.mod = 'login';
    }

    sendVerifyCode() {

        this.accountService.sendRegisterCode(this.account.user).then((res: Result) => {
            if (res.isSucc) {
                warn.succ("发送邮件成功，请登录邮箱获取验证码");
            } else {
                warn.fail(res.error_msg);
            }
        });
    }


    login() {
        this.error_msg = "";
        this.accountService.login(this.account).then(
            re => {
                if (!re.isSucc) {
                    this.error_msg=re.error_msg;
                } else {
                    var account: Account = <Account>re.item;
                    auth.setAccount(account);
                    this.router.navigate([this.location.path()], {skipLocationChange:false});
                }
            }
        )
    }

    register(f: NgForm) {
        this.accountService.create(this.account, this.verify_code).then(re => {
            if (re.isSucc) {
                warn.succ("注册成功.");
                var account: Account = <Account>re.item;
                auth.setAccount(account);
                this.router.navigate([this.location.path()], { skipLocationChange: false });
            } else {
                warn.fail(re.error_msg);
            }
        });
    }
}