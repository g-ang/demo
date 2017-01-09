import {Component} from '@angular/core';
import {Tank, TankConnect, Receive, TankServer, Router, Result, warn} from './tank.server';
@Component({
    templateUrl:'/app/ihome/tank.component.html'
})
    
export class TankComponent {
    tank=new Tank();
    conn: TankConnect;

    deitalHeight = 0;
    showProMod: string;
    constructor(tankServer: TankServer, private router: Router){
        this.conn = new TankConnect();
    }
    create() {
        this.deitalHeight = 40;
        this.router.navigate(['/ihome/tank/create']);
    }

    goMod(mod: string) {
        this.showProMod = mod;
    }
}


@Component({
    templateUrl: '/app/ihome/tank_create.component.html'
})

export class TankCreateComponent {
    tank = new Tank();
    constructor(private tankServer: TankServer, private router: Router) {
    }
    save() {
        this.tankServer.create(this.tank).then((res: Result) => {
            if (res.isSucc) {
                warn.succ("保存成功");
            } else {
                warn.fail(res.error_msg);
            }
        })
    }
}