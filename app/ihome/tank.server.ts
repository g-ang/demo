import {Injectable} from '@angular/core';
import {CommonService, List, auth, Result, warn, Author, getCookie} from './../lib/common.service';
export *  from './../lib/common.service';
import {Http, URLSearchParams} from '@angular/http';

export class Receive {
    cmmand: string;
    args: any[];
}

export class Tank{
    lspeed: string; //1-100速度
    rspeed: string; //1-100速度
    speed: number;  //1-100速度
    name: string;
    gear: string;
    in1: string;
    in2: string;
    in3: string;
    in4: string;
    en1: string;
    en2: string;
    icon: string;
}


export class TankConnect {
    protected link: WebSocket;
    cmmand: string;
    args: string[];
    messages: string[];
    tank: Tank;
    name: string;
    tanks: Tank[] = [];


    constructor() {
        this.link = new WebSocket("ws://localhost:1811/connect");

        this.messages = [];
        this.link.onclose = () => {
            this.messages.push("断开连接");
        }

        this.link.onopen = () => {
            this.auth();
        }

        this.link.onmessage = (event: any) => {
            let r: Receive = JSON.parse(event.data);
            let args = r.args;
            switch (r.cmmand){
                case "text":
                    this.say(args[0]);
                    break;
                case "addintank":
                    for (let i in args) {
                        let tank = new Tank();
                        for (let j in args[i]) {
                            tank[j] = args[i][j];
                        }
                        this.tanks.push(tank);
                    }
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
                    break;
                case "byebye":
                    let tank_name = args[0].tank_name;
                    for (let i in this.tanks) {
                        if (this.tanks[i].name == tank_name) {
                            this.tanks.splice(parseInt(i), 1);
                        }
                    }
                    break;
            }
        }
    }

    send(cmmand, args) {
        this.link.send(JSON.stringify({ "cmmand": cmmand, "args": args }));
    }

    say(text: string) {
        this.messages.push(text);
    }

    connect_tank(tank: Tank) {
        this.tank = tank;
        this.send('connect_tank', { tank_name: tank.name });
    }

    left() {
        this.tank.gear = 'left';
        this.send("tank", { "act": "left" });
    }

    right() {
        this.tank.gear = 'right';
        this.send("tank", { "act": "right" });
    }

    reverse() {
        this.tank.gear = 'reverse';
        this.send("tank", { "act": "reverse" });
    }

    driving() {
        this.tank.gear  = 'driving';
        this.send("tank", { "act": "driving" });
    }

    parking() {
        this.tank.gear  = 'parking';
        this.send("tank", { "act": "parking" });
    }

    setSpeed(i: number) {
        this.send("tank", { "act": "speed", "n": i });
    }

    auth() {
        let token = getCookie("token");
        this.send("auth", { token: token });
    }
}

@Injectable()
export class TankServer extends CommonService {
    constructor(http: Http) {
        super(http);
    }

    create(tank: Tank): Promise<Result> {
        let parame = this.createParams();
        return this.post("rpi.tank.register", tank, { search: parame })
    }

    edit(){
    }
}