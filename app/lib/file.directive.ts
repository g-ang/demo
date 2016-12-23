import {Directive, ElementRef, Input, Output, EventEmitter} from  '@angular/core';
import {warn} from './common.service';
@Directive({
    selector: '[upload]',
    host: {
        '(change)': 'upload($event.target)'
    }
})

export class Upload{
    file: any;
    @Input('upload') upload_addr: string;
    @Output() success = new EventEmitter();

    constructor(_elm: ElementRef) {
        this.file = _elm.nativeElement;
    }

    upload(a) {
        var file = this.file.files[0];
        var xhr = new XMLHttpRequest();
        var formdata = new FormData();
        formdata.append("file", file);
        
        xhr.open("POST", this.upload_addr);
        xhr.overrideMimeType("application/octet-stream");
        warn.load("上传中...");
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState == 4) {
                this.success.emit(JSON.parse(xhr.responseText));
            }
        })
        xhr.send(formdata)
    }
}
