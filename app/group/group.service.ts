import {Injectable} from '@angular/core';
import {CommonService, List, auth, Result, warn, Author} from './../lib/common.service';
export *  from './../lib/common.service';
import {Http, URLSearchParams} from '@angular/http';
export class Group{
    id: number;
    name: string;
    content: string;
    author: string;
    isstar: boolean;
    ismember: boolean;
    write_forum_purview: number;
    read_forum_purview: number;
    isreadpurview: boolean;
    isauthor: boolean;
	constructor() {
            this.isstar    = false;
            this.ismember = false;
            this.read_forum_purview = 1;
            this.write_forum_purview = 1;
            this.isreadpurview = false;
            this.isauthor = false;
    }
}

@Injectable()
export class StarGroups {
    public items: Group[];
    constructor() { this.items = []; }
    set(groups: Group[]) {
        this.items = groups;
    }

    add(group: Group) {
        this.items.splice(0, 0, group);
    }

    len() {
        return this.items.length;
    }

    delete(group_id: number) {
        let data = [];
        for (let i in this.items) {
            if (this.items[i].id == group_id) {
                this.items.splice(parseInt(i), 1);
            }
        }
        this.items = data;
    }
}

@Injectable()
export class GroupService  extends CommonService {

    constructor(http: Http) {
        super(http)
    }

	create(group: Group){
		let params=this.createParams();
        return this.post('group.create', group,{search:params});
	}

    search(param: URLSearchParams):Promise<Result>{
        return this.get(this.url('group.search'), { search: param});
    }

    getMyGroups() {
        let params = this.createParams();
        params.set("offset", "0");
        params.set("rowcount", "10");
        return this.get(this.url('groups'), { search: params });
    }

	loadStars(){}

    stars() {}

	detail(group_id:number){
		let params=this.createParams();
		params.set('group_id',String(group_id));
		return this.get('group.detail',{search:params});
	}

	addStar(group_id:number){
		let params=this.createParams();
		params.set('group_id',String(group_id));
        return this.get('group.addstar',{search:params});
    }

    cancelStar(group_id: number) {
        let params = this.createParams();
        params.set('group_id', String(group_id));
        return this.get('group.cancelstar', { search: params });
    }

    addAppl(group_id: number) {
        let params = this.createParams();
        params.set('group_id', String(group_id));
        return this.get('group.addappl', { search: params });
    }

    getReadFountPurview(){
        return [{ id: 1, title: "所有人可查看" }, { id: 2, title: "会员可查看" }, { id:3, title:"组成员可查看"}];
    }

    getWriteFountPurview() {
        return [{ id: 1, title: "会员可发表" }, {id: 2,title: "组成员可发表" }, { id:3,title: "管理员可发表"}];
    }
}
