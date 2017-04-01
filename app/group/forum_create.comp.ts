import {Component} from '@angular/core';
import {GroupService, Group, auth, Router, Result, warn}from './group.service';
import {ForumService, Forum}from './forum.service';
@Component({
    templateUrl: 'app/group/forum_create.html'
})

export class ForumCreateComponent {
    forum: Forum;
    constructor(
        private forumService: ForumService, private router: Router) {
        this.forum = new Forum();
    }

    save() {
        this.forumService.save(this.forum).then((res: Result) => {
            if (res.isSucc) {
                warn.succ("创建成功");
            } else {
                warn.fail(res.error_msg);
            }

        })
    }
}