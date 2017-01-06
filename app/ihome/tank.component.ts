import {Component} from '@angular/core';
import {Tank, Customer, Receive, TankClient, TankServer} from './tank.server';
@Component({
    templateUrl:'/app/ihome/tank.component.html'
})
    
export class TankComponent {
    tank=new Tank();
    customer: Customer;
    mod: string;

    constructor(tankServer:TankServer) {
        this.customer = new Customer();
    }

    createTank() {
        this.mod = 'createtank';
    }

  
}