import {Component} from '@angular/core';
import {GroupService, Group, auth, Router}from './group.service';

@Component({
    templateUrl: 'app/group/groups.component.html'
})

export class GroupsComponent{
	keyword:string;
    groups: Group[];
    total = 0;
    page = 1;
    rowcount = 10;
    openappl = false;
    curr_group: Group;
    auth=auth;
	constructor(
        private groupService: GroupService, private router: Router){
        this.keyword = "";
        this.getMyGroups();
    }

    getMyGroups() { }

    search(s: any) {
        let params = this.groupService.createParams();
        params.set("q", this.keyword);

        this.groupService.search(params).then(
            res => {
                if (res.isSucc) {
                    this.groups = <Group[]>res.items;
                    this.total = res.total;
                } else {
                  
                }
            });
    }

    detail(group: Group) {
        this.curr_group = group;
        if (false == group.isreadpurview) {
            this.openappl = true;
            return;
        }
     
    }

    create() {
        this.router.navigate(['/group/create']);
    }

    applclose() {
        this.openappl = false;
    }
}
