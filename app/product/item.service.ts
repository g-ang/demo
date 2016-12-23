import {Injectable} from '@angular/core';
import {CommonService, List, auth, Result, warn, Author} from './../lib/common.service';
export *  from './../lib/common.service';
import {Http, URLSearchParams} from '@angular/http';

export class Template {
    id: number;
    tag: string;
}

//显示模块.[]
export var showProMod:string;


//设置显示模块
export function setShowProModel(mod: string){
    showProMod = mod;
}

export function setCurrItem(item: Item) {
    currItem = item;
}
/**
 * 商品
 */
export class Item {
    id: number;
    name: string;
    sku: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    cn_name: string;
    quant: number;
    channel_id: number;
    desc: string;
    headimg: string;
    authorid: number;
    price: number;
    old_price: number;
    add_time: string;
    colors: string[];
    sizes: string[];
    gallery: string[];
    temp_id: number;
    ebay_itemid: number;
    selected: boolean;
    constructor() {
        this.id = 0;
    }
}


export class ProductSkuImage {
    name: string;
    original: string;
    preview: string;
    localOriginal: string;
    localPreview: string;
    addtime: string;
}


export class WarehouseProduct {
    images: string[];
    sukImages: ProductSkuImage[];
    buyAddr: string;
}

/**
 * 图片
 */
export class Img {
    src: string;
    title: string;
    desc: string;
    width: number;
    height: number;

    constructor(src: string, title?: string, desc?: string) {
        this.src = src;
        this.title = title;
        this.desc = desc;

        var image = new Image();
        image.src = "/res/warehouse/images/" + src;
        this.width = image.width;
        this.height = image.height;

    }
}

export class Resource {
    id: number;
    addtime: string;
    addr: string;
    flag: number;
    author: Author;
    selected: boolean;
    isheadimage: boolean;
    isdetailimage: boolean;
    flags: ResourceFlag[];
}
export class ResourceFlag {
    id: number;
    title: number;
    selected: boolean;
}

@Injectable()
export class ItemService extends CommonService {
    
    constructor(http: Http) {
        super(http)
    }

    getItem(id: number): Promise<Item> {
        var params = this.createParams();
        params.set("id", String(id));
        return this.get("item", { search: params }).then(re => {
           setCurrItem(<Item>re.item);
           return  re.item;
        });
    }

    rows(param: URLSearchParams): Promise<Result> {
        return this.get('items', { search: param });
    }

    getTmpOptions(): Promise<Template[]> {
        return this.get("item.template.tags").then(re => re.items as Template[])
    }

    save(item: Item): Promise<Result> {
        let parame = this.createParams();
        return this.post('item.save',item, { search: parame });
    }

    saveToEbay(item: Item): Promise<Result> {
        let parame = this.createParams();
        parame.set("item_id", String(item.id));
        return this.get('item.savetoebay', { search: parame });
    }

    addToTag(tag_name: string, item_ids: number[]) {
        let parame = this.createParams();
        parame.set("tag", tag_name);
        return this.post(this.url('item.addtotag'), JSON.stringify({ "item_ids": item_ids }), { search: parame });
    }

    setUnder(item_ids: number[]) {
        let parame = this.createParams();
        return this.post(this.url('item.setunder'), JSON.stringify({ "item_ids": item_ids }), { search: parame });
    }

    setUpper(item_ids: number[]) {
        let parame = this.createParams();
        return this.post(this.url('item.setupper'), JSON.stringify({ "item_ids": item_ids }), { search: parame });
    }

    setResize(item_ids: number[]) {
        let parame = this.createParams();
        return this.post(this.url('item.resize'), JSON.stringify({ "item_ids": item_ids }), { search: parame });
    }

    setTemp(item_ids: number[], temp_id: number,body:string) {
        let parame = this.createParams();
        return this.post('item.settemp', { "item_ids": item_ids, "temp_id": temp_id, "desc": body}, { search: parame });
    }

    delImage(image_id: number) {
        let parame = this.createParams();
        parame.set('image_id', String(image_id));
        return this.get('product.image.del', { search: parame });
    }

    channels() {
        let parame = this.createParams();
        return this.get('product.channels', { search: parame });
    }

    attrs() {
        let parame = this.createParams();
        return this.get('product.attrs', { search: parame });
    }

    bindebay(item: Item): Promise<Result> {
        let parame = this.createParams();
        return this.post("item.bindebay", { item_id: item.id, ebay_itemid: item.ebay_itemid },{ search: parame })
    }

    preview(tmp_id: number, body: string): Promise<Result>  {
        var param=this.createParams();
        param.set("ispreview", "1");
        return this.post("item.item.margecontent", { tmp_id: tmp_id,body:body }, { search: param });
    }

    getRess(rel_id: number,offset:number,rowcount:number): Promise<Result> {
        let param = this.createParams();
        param.set("rel_id", String(rel_id));
        param.set("offset", String(offset));
        param.set("rowcount", String(rowcount));
        return this.get("item.ress", { search: param });
    }

    setResFlag(res_ids: number[], flags: number[]): Promise<Result> {
        let parame = this.createParams();
        return this.post('item.setresflag', { "res_ids": res_ids, "flags": flags }, { search: parame });
    }
}

/**
 * 仓库管理
 */
@Injectable()
export class WarehouseService extends CommonService {
    constructor(http: Http) {
        super(http)
    }

    down(down_url: string): Promise<Result> {
        var params = this.createParams();
        return this.post("downtowarehouse", { down_url: down_url }, { search: params });
    }

    getDetail(item_id: number): Promise<WarehouseProduct>{
        var param = this.createParams();
        param.set("item_id", String(item_id));
        return this.get("warehouse.productinfo", { search: param }).then(res => res.item as WarehouseProduct)
    }
}

export var currItem = new Item();