import {Component} from '@angular/core';
import {GroupService, Group, auth}from './group.service';

@Component({
    templateUrl: 'app/group/create.component.html'
})

export class CreateComponent {
    group: Group;
    readFountPurview = [];
    writeFountPurview = [];

    constructor(private groupService: GroupService) {
        this.group = new Group();
        this.readFountPurview = this.groupService.getReadFountPurview();
        this.writeFountPurview = this.groupService.getWriteFountPurview();
    }

    save() {

    }
}