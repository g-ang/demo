import {Component, Input} from '@angular/core';
import { Result, warn, Page, DocService, Router, Doc}from './doc.service';

@Component({
    templateUrl: "/app/doc/doc.component.html",
})

export class DocComponent {
    res: Result;
    curr: any;
    constructor(ser: DocService,private router:Router) {
       
    }

    create() {
        this.router.navigate(['/doc/create']);
    }
}


@Component({
    templateUrl: "/app/doc/create.component.html",
})
export class CreateComponent {
    doc: Doc;
    constructor(private docSer: DocService, private router: Router) {
        this.doc = new Doc();
    }

    save(){
        console.log(this.doc);
        this.docSer.save(this.doc).then((re: any) => {
            if (re.isSucc) {
                this.doc.id = re.id;
                warn.succ("保存成功");
            } else {
                warn.fail(re.error_msg);
            }
        })
    }

    labelcall(labels) {
        console.log(labels);
        this.doc.labels = labels;
    }
}