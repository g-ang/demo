export class Account {
    uid: number;
    user: string;
    password: string;
    nick: string;
    sign: string;
    unreadmessagecount: number;

    constructor() {
        this.uid = 0;
        this.user = '';
        this.password = '';
        this.nick = '';
    }
}