import {NgModule, FormsModule, RouterModule, CommonModule, Routes, BrowserModule} from './../lib/common.module';
import {Result, DocService} from './doc.service';
import {DocComponent, CreateComponent} from './doc.component';

import { CKEditorModule } from 'ng2-ckeditor';
import {LabelComponent, LabelService} from '../lib/label.component';

const routers: Routes = [
    {
        path: 'doc', component: DocComponent, children: [
            { path: 'create', component: CreateComponent },
            { path: 'detail/:id', component: CreateComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routers), FormsModule, CommonModule, CKEditorModule],
    declarations: [
        DocComponent, CreateComponent, LabelComponent,
    ],
    providers: [
        DocService, LabelService
    ],
    exports: []
})

export class DocModule {

}