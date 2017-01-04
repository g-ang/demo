import {Component} from '@angular/core';
import {Tank, Customer, Receive} from './tank.server';
@Component({
    templateUrl:'/app/ihome/tank.component.html'
})
    
export class TankComponent {
    tank: Tank;
    customer: Customer;
    constructor() {

    }

    linkTank() {
        this.tank = new Tank();
    }

    linkCustomer() {
        this.customer = new Customer();
      
    }
}