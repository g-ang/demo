import {Component, Input} from '@angular/core';
import { Result, warn, Page, BeeService}from './bee.service';

@Component({
    templateUrl:"/app/bee/floryday.component.html",
})


export class FlorydayComponent {
    res: Result;

    curr: any;

    
    constructor(ser: BeeService) {
        ser.get("bee.floryday.listing").then((res: Result) => {
            this.res = res;
        });
    }


}
