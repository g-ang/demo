import {Component} from '@angular/core';
import {ItemService, Item, showProMod, Router, setShowProModel, PageComponent, Page, Result, currItem}from './item.service';

@Component({
    templateUrl: 'app/product/items.component.html'
})

export class ItemsComponent {
    items: Item[];
    tags = [{ code: "all", name: "所有销售中商品" }, { "code": "is_hot", name: "畅销" }, { code: "is_new", name: "新款" }, { code: "is_under", name: "已下架" }];
    item_ids = [];
    search = { tag: "all", key: "" };
    curr_item = new Item();
    offset = 0;
    rowcount = 10;
    total = 0;
    order = "id";
    deitalHeight = 40;
    showProMod:string;
    constructor(private itemService: ItemService, private router: Router) {
        setShowProModel('base');
        this.curr_item = currItem;
        this.listing();
    }

    listing(page?: Page) {
        var params = this.itemService.createParams();
        params.set("order", this.order);
        if (page) {
            params.set("offset", String(page.offset));
            params.set("rowcount", String(page.rowcount));
        } else{
            params.set("offset", String(this.offset));
            params.set("rowcount", String(this.rowcount));
        }
        this.itemService.rows(params).then((res: Result) => {
            this.items = <Item[]>res.items;
            this.total = res.total;
        });
    }

    loadPage(curr) {

    }

    edit(item: Item) {

    }

    selectAll() {
        for (let i in this.items) {
            this.items[i].selected = true;
        }
    }
    setupper() {}
    
    addtobestselling() { }

    addtonewarrivals() { }

    setunder() { }

    resize() { }

    onSelect() { }

    create() {
        this.router.navigate(['/items/base', 0]);
        this.deitalHeight = 80;
        this.curr_item = new Item();
        return;
    }
    goMod(item: Item,flag:string) {
        setShowProModel(flag);
        this.showProMod = showProMod;
        this.showMod(item);
    }

    showMod(item: Item) {
        this.curr_item = item;
        switch (showProMod){
            case "desc":
                this.router.navigate(['/items/desc', item.id]);
                return;
            case 'base':
                this.router.navigate(['/items/base', item.id]);
                return;
            case 'warehouse':
                this.router.navigate(['/items/warehouse', item.id]);
                return;
            case 'gallery':
                this.router.navigate(['/items/gallery',item.id]);
        }
       
    }

}