import {Component, Input, OnChanges, Injectable, Output, EventEmitter} from '@angular/core';
import {Author, CommonService, Result, warn} from './common.service';
import {Http, URLSearchParams} from '@angular/http';
export class Label {

    name: string;
    id: number;
}

@Injectable()
export class LabelService extends CommonService {
    constructor(http: Http) {
        super(http)
    }

    add(name): Promise<Result>{
        var parame=this.createParams();
        return this.post("doc/label/add", { name: name }, { search: parame })
    }
}

@Component({
    selector: '[ilabel]',
    templateUrl: '/app/lib/label.component.html',
})

export class LabelComponent implements OnChanges {
    @Input('ilabel') label: Label;
    @Output('succ') callback = new EventEmitter();
    name: string;
    labels:Label[];
    constructor(private labelServer: LabelService) {
        this.labels = [];
    }

    ngOnChanges() {

    }

    add() {
       
        this.labelServer.add(this.name).then((re: Result) => {
            if (re.isSucc) {
               
                var label = <Label>re.item;
                this.labels.push(label);
                warn.succ(this.name + ",添加成功");
                this.name = "";
                this.callback.emit(this.labels);
            } else {
                warn.fail(re.error_msg);
            }
        })
    }
}
