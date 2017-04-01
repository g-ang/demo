import {Injectable} from '@angular/core';
import {CommonService, List, auth, Result, warn, Author} from './../lib/common.service';
export *  from './../lib/common.service';
import {Http, URLSearchParams} from '@angular/http';
export class Forum {
    title: string;
    content: string;
}

@Injectable()
export class ForumService extends CommonService{
    constructor(http: Http) {
        super(http)
    }

    save(forum: Forum): Promise<Result>  {
        let parame = this.createParams();
        return  this.post("forum.create", forum, { search: parame });
    }
}