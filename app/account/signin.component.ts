import {Component,Output,Input,OnChanges} from '@angular/core';
import {AccountService, warn, auth, Router, Account, Result, Auth} from './account.service';
import {NgModel, FormControl, FormGroup, Validators, ValidatorFn, NgForm, AbstractControl } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
    selector:'signinScreen',
    templateUrl:'/app/account/signin.component.html',
})

export class SigninComponent implements OnChanges {
    account = new Account();
    error_msg: string;
    auth = auth;
    @Input() isLogin = true;
    passwordControl: FormControl;
    passwordConfirmControl: FormControl;
    verify_code: string;
    mod = 'signin';
    emailGroup: FormGroup;
    repasswordGroup: FormGroup;
    constructor(private accountService: AccountService, private router: Router, private location: Location) {

        this.emailGroup = new FormGroup({
            'email': new FormControl('', Validators.required)
        }, this.ValidateEmail);

        accountService.auth().then((test: Auth) => {
            this.isLogin = test.isLogin();
        });
    }

    passwordMatchValidator(g: FormGroup) {
    
        var passwordConfirm = g.get("passwordConfirm").value;

        var password = g.get("password").value;

        if (passwordConfirm != password && password != '') {
            return { 'mismatch': true };
        }

        return null;
    }

    ValidateEmail(g: FormGroup) {
        var value = g.get("email").value.trim();
        var email_regexp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
        if (value == "") {
            return null;
        }

        if (  !email_regexp.test(value)) {
            return { 'mismatch': true };
        }
    }

    ngOnChanges() {

    }

    signupScreen() {
        this.mod = 'signup';

        this.passwordControl = new FormControl('', Validators.minLength(3));
        this.passwordConfirmControl = new FormControl('', Validators.minLength(0));

        
        this.repasswordGroup = new FormGroup({
            'password': this.passwordControl,
            'passwordConfirm': this.passwordConfirmControl,
        }, this.passwordMatchValidator);

    }

    signinScreen() {

        this.mod = 'signin';
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


    signin() {
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

    signup(f: NgForm) {
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