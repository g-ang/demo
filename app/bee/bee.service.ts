import {Injectable} from '@angular/core';
import {CommonService, List, auth, Result, warn, Author} from './../lib/common.service';
export *  from './../lib/common.service';
import {Http, URLSearchParams} from '@angular/http';


@Injectable()
export class BeeService extends CommonService {
    
    constructor(http: Http) {
        super(http)
    }
   
}