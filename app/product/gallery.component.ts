import {Component,Input} from '@angular/core';
import {ItemService, Item, setShowProModel, Result, warn, Resource, ResourceFlag, Page}from './item.service';
import {ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: '/app/product/gallery.component.html'
})


export class GalleryComponent{
    @Input('item') item: Item;
   
    resources: Resource[];
    item_id: number;
    headImageFlag =false;
    detailImageFlag=false;
    hiddenFlagSelect=true;
    flags: ResourceFlag[];

    selectedIds=[];
    constructor(private itemService: ItemService, private route: ActivatedRoute) {
        setShowProModel('gallery');
        route.params.subscribe((params: Params) => {
            this.item_id = params["id"];
            this.itemService.getItem(this.item_id).then(item => this.item = item);
            this.getImages(this.item_id)
        })
    }

    getUploadAddr(flag: number) {
        return this.itemService.url(`item.upres?rel_id=${this.item_id}&flag=${flag}`);
    }

    getImages(item_id: number) {
        this.itemService.getRess(item_id,0,100).then((res: any) => {
            if (res.isSucc) {
                this.resources = <Resource[]>res.items;
                this.flags = <ResourceFlag[]>res.flags;
                for (let i in this.resources) {
                    this.resources[i].flags = this.getFlags(this.resources[i].flag);
                }
            }
        })
    }

    selectAll(e: any) {
        this.selectedIds = [];
        var checked = <boolean>e.srcElement.checked;
        for (let i in this.resources) {
            this.resources[i].selected = checked;
            if (checked) {
                this.selectedIds.push(this.resources[i].id);
            }
        }
    }

    selected(r: Resource) {
        if (r.selected) {
            r.selected = false;
            let i: any;
            for ( i in this.selectedIds) {
                if (this.selectedIds[i] == r.id) {
                    this.selectedIds.splice(i,1);
                }
            }
        } else {
            this.selectedIds.push(r.id);
            r.selected = true;
        }
    }

    getFlags(flag: number): ResourceFlag[] {
        let flags: ResourceFlag[] = [];
        for (let i in this.flags) {
            let id = this.flags[i].id;
            if ((flag & id) == id) {
                 flags.push(this.flags[i]);
            }
        }
        return flags;
    }

    sumFlagRes(flag: number):number{
        let sum = 0;
        for (let i in this.resources) {
            let res = this.resources[i];

            if ((res.flag & flag) == flag) {
                sum++;
            }
        }
        return sum;
    }

    setFlag(){
        var ids=[];
        for (let i in this.resources) {
            if (this.resources[i].selected == true) {
                ids.push(this.resources[i].id)
            }
        }

        if (ids.length > 0) {
            let flags = [];
            for (let i in this.flags) {
                if (this.flags[i].selected) {
                    flags.push(this.flags[i].id);
                }
            }

           if (flags.length == 0) {
               warn.fail("请选择至少一项标记");
               return false;
            }

           this.itemService.setResFlag(ids, flags).then((res: Result) => {
                if (res.isSucc) {
                    warn.succ("保存成功");
                    this.hiddenFlagSelect = true;
                    this.getImages(this.item_id);
                } else {
                    warn.fail(res.error_msg);
               }
            })
        } else {
            warn.fail("请至少选择一项");
        }
    }

    upSuccess(res: Result) {
        if (res.isSucc) {
            warn.succ("上传成功");
            let resource=<Resource>res.item;
            resource.flags = this.getFlags(resource.flag);
            this.resources.unshift(resource);
        } else {
            warn.fail(res.error_msg);
        }
    }
}