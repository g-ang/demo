import {Component, Input} from '@angular/core';
import { Result, warn, Page, DocService, Router, Doc}from './doc.service';
import {ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: "/app/doc/doc.component.html",
})

export class DocComponent {
    res: Result;
    curr: any;
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
    showProMod: string;
    constructor(private server: DocService, private router: Router) {
        this.listing();
    }

    listing(page?: Page) {
        var params = this.server.createParams();
        params.set("order", this.order);
        if (page) {
            params.set("offset", String(page.offset));
            params.set("rowcount", String(page.rowcount));
        } else {
            params.set("offset", String(this.offset));
            params.set("rowcount", String(this.rowcount));
        }
        this.server.rows(params).then((res: Result) => {
            this.items = <Doc[]>res.items;
            this.total = res.total;
        });
    }

    create() {
        this.router.navigate(['/doc/create']);
    }

    selectAll() {
        for (let i in this.items) {
            this.items[i].selected = true;
        }
    }
    showMod(doc:Doc) {
        this.router.navigate(["/doc/detail", doc.id]);
    }

    onSelect(index, doc: Doc) {
      
    }

}


@Component({
    templateUrl: "/app/doc/create.component.html",
})

export class CreateComponent {
    doc: Doc;
    constructor(private server: DocService, private router: Router, route: ActivatedRoute) {
        this.doc = new Doc();

        route.params.subscribe((params: Params) => {
            this.server.getDetail(params["id"]).then(re => this.doc = re.item)
          
        })
    }

    save(){
        this.server.save(this.doc).then((re: any) => {
            if (re.isSucc) {
                this.doc.id = re.id;
                warn.succ("保存成功");
            } else {
                warn.fail(re.error_msg);
            }
        })
    }

    labelcall(labels) {
        this.doc.labels = labels;
    }
}