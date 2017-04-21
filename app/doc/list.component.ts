import {Component} from '@angular/core';
import {Doc, Router, PageComponent, Page, Result, DocService}from './doc.service';

@Component({
    templateUrl: 'app/doc/list.component.html'
})

export class ListComponent {
    items: Doc[];
    tags = [];
    item_ids = [];
    search = { tag: "all", key: "" };
    curr_item = new Doc();
    offset = 0;
    rowcount = 10;
    total = 0;
    order = "id";
    deitalHeight = 40;
    showProMod:string;
    constructor(private server: DocService, private router: Router) {
        this.listing();
    }

    listing(page?: Page) {
        var params = this.server.createParams();
        params.set("order", this.order);
        if (page) {
            params.set("offset", String(page.offset));
            params.set("rowcount", String(page.rowcount));
        } else{
            params.set("offset", String(this.offset));
            params.set("rowcount", String(this.rowcount));
        }
        this.server.rows(params).then((res: Result) => {
            this.items = <Doc[]>res.items;
            this.total = res.total;
        });
    }

    loadPage(curr) {

    }

    edit(item: Doc) {

    }

    selectAll() {
        for (let i in this.items) {
            this.items[i].selected = true;
        }
    }


    create() {
        this.router.navigate(['/items/base', 0]);
        this.deitalHeight = 80;
        this.curr_item = new Doc();
        return;
    }
    goMod(item: Doc,flag:string) {
        this.showMod(item);
    }

    showMod(item: Doc) {
        this.curr_item = item;
        
    }

}