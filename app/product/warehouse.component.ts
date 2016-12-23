import {Component, Directive, Input, Output, EventEmitter} from '@angular/core';
import {ItemService, WarehouseService, Item, setShowProModel, Result, warn, WarehouseProduct, Img, ProductSkuImage}from './item.service';
import {ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: 'app/product/warehouse.component.html'
})

export class WarehouseComponent{
    down_url: string;
    item_id = 0;
    detail = new WarehouseProduct();
    curr_image: Img;
    constructor(private warehouseService: WarehouseService,private route: ActivatedRoute) {
        route.params.subscribe((params: Params) => {
            if (params["id"] > 0){
                setShowProModel("warehouse");
                this.item_id = params["id"];
                this.warehouseService.getDetail(this.item_id).then((item: WarehouseProduct) => {
                    this.detail = item;
                })
            }
        })
    }

    donwnload() {
        warn.load("正在下载...");
        this.warehouseService.down(this.down_url).then((res: Result) => {
            if (res.isSucc){
                warn.succ("download ok");
            } else {
                warn.fail(res.error_msg);
            }
        })
    }

    openImage(src: string) {
        this.curr_image = new Img(src,"商品主图");
    }

    openSkuImage(skuimage: ProductSkuImage) {
        this.curr_image = new Img(skuimage.localOriginal, skuimage.name);
    }
}

@Component({
    selector: '[previewimage]',
    templateUrl:'/app/product/previewimage.component.html'
})

export class PreviewImageComponent {
    @Input('previewimage') image: Img;
    
    @Output('callback') callback = new EventEmitter();

    next() {

    }

    previous() {

    }

    close() {
        this.image = null;
    }
}