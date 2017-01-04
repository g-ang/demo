
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

        this.link.onopen = () => {
            this.messages.push("连接Tank");
        }

        this.link.onclose = () => {
            this.messages.push("断开连接");
        }

    }

     send() {
         this.link.send(JSON.stringify({ "cmmand": this.cmmand, "args": this.args }));
         this.cmmand = "";
         this.args = [];
    }

}

export class Tank extends MySocket {

    constructor(url?: string) {
        super("ws://localhost:1811/tank");

     
        this.link.onmessage = (event: any) => {
            console.log(event.data);
            let r: Receive = JSON.parse(event.data);

            if(r.cmmand == "text"){
                this.messages.push(r.args[0]);
            }
        }
    }
  

}

export class Customer extends MySocket{

    constructor(url?: string) {
        super("ws://localhost:1811/customer");
        this.link.onmessage = (event: any) => {
            console.log(event.data);
            let r: Receive = JSON.parse(event.data);

            if (r.cmmand == "text") {
                this.messages.push(r.args[0]);
            }
        }
    }
}