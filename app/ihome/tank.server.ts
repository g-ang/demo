import {Injectable} from '@angular/core';
import {CommonService, List, auth, Result, warn, Author} from './../lib/common.service';
export *  from './../lib/common.service';
import {Http, URLSearchParams} from '@angular/http';

export class Receive {
    cmmand: string;
    args: string[];
}
 
class MySocket {
    protected link: WebSocket;
    cmmand: string;
    args: string[];
    messages: string[];
    constructor(url: string) {
        this.link = new WebSocket(url);
        this.messages = [];
        this.link.onclose = () => {
            this.messages.push("断开连接");
        }
    }

    send(cmmand, args) {
        this.link.send(JSON.stringify({ "cmmand": cmmand, "args": args }));
    }

    say(text: string) {
        this.messages.push(text);
    }
}

export class Tank{
    customer: Customer;
    lspeed: string; //1-100速度
    rspeed: string; //1-100速度
    speed: number; //1-100速度
    name: string;
    gear: string;
    in1: string;
    in2: string;
    in3: string;
    in4: string;
    en1: string;
    en2: string;
    icon: string;

    left() {
        this.gear = 'left';
        this.customer.send("tank", {"act":"left"});
    }

    right() {
        this.gear = 'right';
        this.customer.send("tank", { "act": "right" });
    }

    reverse() {
        this.gear = 'reverse';
        this.customer.send("tank", { "act": "reverse" });
    }

    driving() {
        this.gear = 'driving';
        this.customer.send("tank", { "act": "driving" });
    }

    parking() {
        this.gear = 'parking';
        this.customer.send("tank", { "act": "parking" });
    }

    setSpeed(i: number) {
        this.customer.send("tank", { "act": "speed","n":i });
    }
}

export class TankClient extends MySocket {
    tank: Tank;
    name: string;
    constructor(name?: string) {
        super("ws://localhost:1811/tank");
        
        this.name = name;
     
        this.link.onopen = () => {
            this.login();
        }

        this.link.onmessage = (event: any) => {
            let r: Receive = JSON.parse(event.data);
            let args = r.args;
            this.tank = new Tank();
            switch (r.cmmand){
                case "text":
                    this.say(args[0]);
                    break;
                case "speed":
                    this.tank.lspeed = args[0];
                    this.tank.rspeed = args[1];
                    break;
                case "setting":
                    this.tank.in1 = args[0];
                    this.tank.in2 = args[1];
                    this.tank.in3 = args[2];
                    this.tank.in4 = args[3];
                    break;
                case "init":
                    let t:any = args[0];
                    for (let i in t) {
                        this[i] = t[i];
                    }
            }
        }
    }

    login() {
        if (this.name == "") {
            this.say("名称不能为空");
            return;
        }
        this.send("auth", { name: this.name });
    }
}

@Injectable()
export class TankServer extends CommonService {
    constructor(http: Http) {
        super(http)
    }

    create(tank: Tank): Promise<Result> {
        if (tank.name == "") {
            return;
        }
        let parame = this.createParams();
        return this.post("rpi.tank.register", tank, { search: parame })
    }

    edit() {
        this.send("edit", { in1: this.in1, in2: this.in2, in3: this.in3, in4: this.in4, en1: this.en1, en2: this.en2 });
    }
}

export class Customer extends MySocket {
    tanks: Tank[] = [];
    tank: Tank;

    constructor(url?: string) {
        super("ws://localhost:1811/customer");

        this.link.onopen = () => {
            this.messages.push("连接成功");
            this.login();
        }

        this.link.onmessage = (event: any) => {
         
            let r: Receive = JSON.parse(event.data);
            let args = r.args;
            switch (r.cmmand) {
                case "text":
                    this.say(r.args[0]);
                    break;
                case "addintank":
                    for (let i: any in args) {
                        let tank = new Tank();
                        for (let j: any in args[i] )  {
                            tank[j] = args[i][j];
                        }
                        this.tanks.push(tank); 
                    }
                    break;
                case "byebye":
                    let tank_name = args[0].tank_name;
                    for (let i in this.tanks) {
                        if (this.tanks[i].name == tank_name) {
                            this.tanks.splice(i,1);
                        }
                    }
            }

        }
    }

    connect_tank(customer: Customer, tank: Tank) {
        this.tank = tank;
        this.tank.customer = customer;
        this.send('connect_tank', { tank_name: this.tank.name });
    }


    login() {
        let token = this.getCookie("token")
        this.send("login", { token: token });
        console.log(token);
    }

    getCookie(name: string):string {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = name + "=";
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s\+/g, "");
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return "";
    }

}