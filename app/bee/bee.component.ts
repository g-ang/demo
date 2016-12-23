import {Component, Input} from '@angular/core';
import { Result, warn, Page, BeeService}from './bee.service';

@Component({
    templateUrl:'/app/bee/bee.component.html',
})


export class BeeComponent {
    res: Result;
    constructor(ser: BeeService) {
  
    }
}
