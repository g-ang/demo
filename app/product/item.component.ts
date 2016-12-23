import {Component} from '@angular/core';
import {ItemService, Item, setShowProModel, Result, warn}from './item.service';
import {ActivatedRoute, Params } from '@angular/router';
@Component({
    templateUrl: 'app/product/item.component.html'
})

export class ItemComponent {
    item: Item = new Item();

    constructor(private itemService: ItemService, private route: ActivatedRoute) {
        setShowProModel('base');
        route.params.subscribe((params: Params) => 
            this.itemService.getItem(params["id"]).then(item => this.item = item)

        )
    }

    bindebay(){
        this.itemService.bindebay(this.item).then((res: Result) => {
            if (res.isSucc) {
                warn.succ("保存成功");
            } else {
                warn.fail(res.error_msg);
            }
        });
    }

    save() {
        this.itemService.save(this.item).then((res: Result) => {
            if (res.isSucc) {
                warn.succ("保存成功");
            } else {
                warn.fail(res.error_msg);
            }
        });
    }

    saveToEbay() {
        warn.load("正在更新到Ebay...");
        this.itemService.saveToEbay(this.item).then((res: Result) => {
            if (res.isSucc) {
                warn.succ("保存成功");
            } else {
                warn.fail(res.error_msg);
            }
        });
    }
}