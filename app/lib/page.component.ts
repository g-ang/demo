import {Input, Component, OnInit, EventEmitter, Output} from '@angular/core';
import { warn }from './common.service';
export class Page {
    offset: number;
    rowcount: number;

    constructor(offset: number, rowcount: number) {
        this.offset = offset;
        this.rowcount = rowcount;
    }
}

@Component({
    selector: '[page]',
    templateUrl:'/app/lib/page.component.html'
})
export class PageComponent implements OnInit {
    @Input('page') page: number;
    @Input('total') total: number;
    @Input('rowcount') rowcount: number;
    @Output('callback') callback = new EventEmitter();
    nextOff = false;
    previousOff = true;
    constructor() {
    
    }

    ngOnInit() {
        if (this.rowcount > this.total) {
            this.nextOff = true;
        }
    }

    next() {
        this.page++;
        var offset = parseInt(String(this.rowcount * (this.page - 1)));

        this.callback.next(new Page(offset, this.rowcount));

        this.test(offset);
    }

    previous() {
        this.page--;
        var offset = parseInt(String(this.rowcount * (this.page - 1)));
        this.callback.next(new Page(offset, this.rowcount));
        this.test(offset);
    }

    reload() {
        var offset = parseInt(String(this.rowcount * (this.page - 1)));
        this.callback.emit(new Page(offset, this.rowcount));
        warn.succ("刷新成功");
    }

    test(offset: number) {
        if (offset + this.rowcount >= this.total) {
            this.nextOff = true;
        } else {
            this.nextOff = false;
        }
        if (offset == 0) {
            this.previousOff = true;
        } else {
            this.previousOff = false;
        }
    }
}
