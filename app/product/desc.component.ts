import {Component, Input, OnInit, ElementRef,ViewChild,OnChanges} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ItemService, Item, Template, Result, warn, setShowProModel, Resource,Page}from './item.service';

@Component({
    templateUrl: '/app/product/desc.component.html'
})

export class DescComponent {
    options: Template[];

    curr_tmp: Template;

    item = new Item();
   
    action = 'preview';  //动作

    @ViewChild('iframe') iframe: ElementRef; //预览iframe 

    constructor(private itemService: ItemService, private route: ActivatedRoute) {
       
        setShowProModel('desc');

        itemService.getTmpOptions().then(options => this.options = options);

        route.params.subscribe((params: Params) =>
            this.itemService.getItem(params["id"]).then(item => {
                this.item = item;

                if (this.item.temp_id > 0) {
                    this.setCurrid(this.item.temp_id);
                } else {
                   var tmp = new Template();
                   tmp.id = 0;
                   this.curr_tmp = tmp;
                }
            })
        )
    }

    ngAfterViewInit() {
        if (this.curr_tmp && this.curr_tmp.id > 0) {
            this.iframe.nativeElement.src = `/api/item.margecontent?item_id=${this.item.id}&tmp_id=${this.curr_tmp.id}`;
        }
    }

    setCurrid(id: number){
        for (let index in this.options) {
            if (this.options[index].id == id) {
                this.setCurr(this.options[index]);
                return ;
            }
        }
        return ;
    }

    setCurr(curr: Template) {
        this.item.temp_id = curr.id;
        this.curr_tmp = curr;
        if (this.iframe) {
            this.iframe.nativeElement.src = `/api/item.margecontent?item_id=${this.item.id}&tmp_id=${this.curr_tmp.id}`;
        }
    }

    save() {
        this.itemService.setTemp([this.item.id], this.curr_tmp.id, this.item.desc).then((res: Result) => {
            if (res.isSucc) {
                warn.succ("保存成功");
            } else {
                warn.fail(res.error_msg);
            }
        });
    }

    resource() {
        this.action = 'resource';
    }

    preview() {
        this.action = 'preview';
        var form = document.createElement("form");
        var body = document.createElement("textarea");
        body.name = "body";
        body.value = this.item.desc;
        form.appendChild(body);
        form.method = "post";
        form.action = `/api/item.margecontent?ispreview=1&tmp_id=${this.curr_tmp.id}`;
        form.target = "preview";
        form.submit();
    }
}

@Component({
    selector: 'resource',
    templateUrl:'/app/product/desc_resource.component.html'
})

export class ResourceComponent implements OnInit, OnChanges {
    @Input('item') item: Item;

    offset = 0;
    rowcount = 10;
    total = 0;
    upload_dir: string; //资源上传地址

    items: Resource[]; //资源列表

    constructor(private itemService: ItemService, private route: ActivatedRoute) { }

    ngOnInit() { }
    ngOnChanges() {
        if (this.item.id > 0) {
            this.upload_dir = this.itemService.url("item.upres?rel_id=" + String(this.item.id));
            this.listing();
        }
    }

    listing(page?: Page) {
        if (page) {
            this.offset = page.offset;
            this.rowcount = page.rowcount;
        }
        this.itemService.getRess(this.item.id, this.offset, this.rowcount).then((res: Result) => {
            if (res.isSucc) {
                this.items = <Resource[]>res.items;
                console.log(this.items);
                this.total;
            }
        })
    }

    upSuccess(res: Result) {
        if (res.isSucc) {
            warn.succ("上传成功");
            this.items.push(<Resource>res.item);
        } else {
            warn.fail(res.error_msg);
        }
    }
}