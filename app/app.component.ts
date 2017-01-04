import { Component } from '@angular/core';
import {warn, bread, Nav, CommonService, auth} from './lib/common.service';

@Component({
    selector: 'my-app',
    templateUrl: "/app/app.component.html",
    styleUrls: ["./app/app.component.css"],
    providers: [CommonService],
})

export class AppComponent{
    warn = warn;
    bread = bread;
    auth = auth;
    constructor(common:CommonService) {

        console.log(auth.account().nick);
    }

    logout() {
        auth.logout();
    }
}