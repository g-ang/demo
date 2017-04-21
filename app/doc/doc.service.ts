import {Injectable} from '@angular/core';
import {CommonService, List, auth, Result, warn, Author} from './../lib/common.service';
export *  from './../lib/common.service';
import {Http, URLSearchParams} from '@angular/http';

export class Doc{
    id: number;
    title: string;
    content: string;
    socure_url: string;
    labels = [];
    selected = false;
}

@Injectable()
export class DocService extends CommonService {

    constructor(http: Http) {
        super(http)
    }

    save(doc: Doc):Promise<Result> {
        var params=this.createParams();
        return this.post("doc/create", doc,{ search: params })
    }


    rows(param: URLSearchParams): Promise<Result> {
        return this.get('doc/listing', { search: param });
    }

    getDetail(id: number): Promise<Result> {
        var params = this.createParams();
        return this.get(`doc/get/${id}`, params);
    }
}