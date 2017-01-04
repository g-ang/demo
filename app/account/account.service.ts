import {Injectable} from '@angular/core';
export * from './../lib/common.service';
import {CommonService, List, auth, Result, warn} from './../lib/common.service';

import {Account} from './account';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

export {Account};

@Injectable()
export class AccountService extends CommonService {

    constructor(protected http: Http) {
        super(http);
    }

    create(account: Account, verify_code:string): Promise<Result>{
        let params = this.createParams();

        return this.post('account.create', { user: account.user, password: account.password, nick: account.nick, verify_code: verify_code }, { search: params });
	}

    login(account: Account):Promise<Result>{
        let params = this.createParams();
        return this.post('account.login', account, { search: params });
	}

    logout():Promise<Result>{
		let params=this.createParams()
        return this.get('account.logout', { search: params })
	}

    getInfo(): Promise<Result>{
		let params=this.createParams()
		return this.get('account.info',{search:params})
    }

    saveField(field:string,value:string) {
        let params = this.createParams();
        return this.post('account.saveinfo',{field: field, value: value},{ search: params })
    }

    call(api:string,params:any) {
        return this.get(api, { search: params })
    }

    repassword(newpassword: string, oldpassword: string) {
        
    }

    sendRegisterCode(email: string): Promise<Result> {
        let params = this.createParams();
        return this.post('account.sendregistercode', { email: email, }, { search: params })
    }

    messages(){
        let params = this.createParams()
        let list = new List();
        this.http.get(this.url('account.messagelist'), { search: params }).subscribe(re => {
            let data=re.json()
            if (data.isSucc) {
                if (data.items != null) {
                    list.set(data.items)
                }
                auth.account().unreadmessagecount = data.unreadmessagecount
            } else {
                console.error(data.error_msg)
            }
        })
        return list
    }

    sendMessage(message: Message) {
        let params = this.createParams();
        return this.http.post(this.url("message.send"), JSON.stringify(message), { search: params });
    }

    delMessage(id: number) {
        let params = this.createParams();
        return this.http.post(this.url("message.del"), JSON.stringify({id:id}), { search: params });
    }
}

export class Message {
    constructor(
        public content: string,
        public to: number) {
    }
}


