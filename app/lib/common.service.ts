import {URLSearchParams, Http, Response, Headers, RequestOptionsArgs} from '@angular/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { HttpModule }    from '@angular/http';
import {Account} from '../account/Account';
import 'rxjs/add/operator/toPromise';
export {Router}  from '@angular/router';
export {PageComponent, Page} from './page.component';
export {Upload} from './file.directive';

/**
 * зїеп
 */
export class Author {
    nick: string;
    headimg: string;
}


class AccountService {
    constructor(private http: Http) {
        http.get("localhost:81/api/groups")
            .toPromise()
            .then(res =>{console.log(res)})
    }
}
export class Auth {
    private session: Account;
    private _isOpenLoginBoxStatus: boolean;
    private _accountService: AccountService;
    commonService: CommonService; 
    constructor() {
        this.session = new Account();
        this._isOpenLoginBoxStatus = false;
    }

    public account() {
        return this.session;
    }

    isOpenLoginBox() {
        return this._isOpenLoginBoxStatus;
    }

    openLoginBox(status:boolean) {
        return this._isOpenLoginBoxStatus = status;
    }

    setAccount(session: Account) {
        this.session = session;
    }

    serviceAuth(accountService: AccountService) {
        this._accountService = accountService;
    }

    isLogin():boolean{
        return this.session.uid>0 ;
    }

    logout():Promise<Result>{
        return this.commonService.get("account.logout");
    }
}


export class Result {
    error_msg: string;
    isSucc: boolean;
    error_code: number;
    data: any;
    items: Object[];
    item: Object;
    total: number;
}

@Injectable()
export class CommonService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(protected http: Http) {
        
    }

    auth(): Promise<Auth>{
        var params = this.createParams();
        auth.commonService = this;
        return this.get("account.info", { search: params }).then(re => {
            if (re.isSucc) {
                var account: Account = <Account>re.item;
                auth.setAccount(account);
            }
            return auth;
        })
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Promise<Result>{
        options.headers = this.headers
        return this.http.post(this.url(url), JSON.stringify(body), options)
            .toPromise()
            .then(res => {
                var result: Result = res.json()
                return result;
            });
    }

    get(url: string, options?: RequestOptionsArgs): Promise<Result> {
        return this.http.get(this.url(url), options)
            .toPromise()
            .then(res => {
                var result: Result = res.json();
                return result;
            })
    }

	createParams() {
		let params= new URLSearchParams();
		params.set('callback', 'JSONP_CALLBACK');
		return params;
	}

    isLogin() {
        return auth.isLogin();
	}

    uid() {
        return auth.account().uid;
	}

	urlParams(){
		let params= new URLSearchParams();
		params.set('callback', 'JSONP_CALLBACK');
		return params;
    }
    
	url(url){
		return "/api/"+url;
    }
}

export class Nav {

    constructor(public name: string, public url?: string) {

    }
}
class Bread {
    list=[];
    
    new() {
        this.list = [];
        return this;
    }

    add(name: string, url?: string) {
        this.list.push(new Nav(name,url));
        return this;
    }

    getList():Nav[]{
        return this.list;
    }
}

export class List {
    private items: any;
    constructor() { this.items = [];  }

    set(data: any[]) {
        this.items = data;
    }

    add(item:any) {
        this.items.push(item)
    }

    len() {
        return typeof(this.items.length) == 'undefined' ? 0 : this.items.length;
    }

    del(index:number) {
        this.items.splice(index, 1);
    }
}

export class Warn {
    public content: string;
    public isShow: boolean;
    public type: string;
    constructor() {
        this.content = "";
        this.isShow = false;
    }
    open(content: string, type?:string) {
        this.content = content;
        this.isShow = true;
        this.type = type;
        setTimeout(() => this.clean() , 3000);
    }

    alert(content: string) {
        this.open(content, "alert");
    }

    succ(content: string) {
        this.open(content, "succ");
    }

    fail(content: string) {
        this.open(content, "fail");
    }

    load(content: string) {
        this.open(content, "loading");
    }

    clean(){
        this.content = "";
        this.isShow=false;
    }
}

export var bread = new Bread();

export var auth = new Auth();

export var warn = new Warn();
export var isDev = true;

export function resultSuccess(re: any) {
    var res = re.json();
    if (res.isSucc) {
        return true;
    } else {
        console.log(res.error_msg);
    }
}

