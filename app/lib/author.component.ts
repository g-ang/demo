import {Component, Input,OnChanges} from '@angular/core';
import {Author} from './common.service';
@Component({
    selector: '[author]',
    templateUrl: '/app/lib/author.component.html',
})

export class AuthorComponent implements OnChanges {
    @Input('author') author: Author;

    ngOnChanges() {

    }
}