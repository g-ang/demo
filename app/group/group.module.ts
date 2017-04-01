import {NgModule, FormsModule, RouterModule, CommonModule, Routes, BrowserModule, AuthorComponent} from './../lib/common.module';
import { CKEditorModule } from 'ng2-ckeditor';

import {GroupsComponent} from './groups.component';
import {ForumCreateComponent} from './forum_create.comp';
import {CreateComponent} from './create.component';
import {ForumComponent} from './forum.comp';

import { GroupService} from './group.service';
import { ForumService} from './forum.service';

const routers: Routes = [
    {
        path: 'group', component: GroupsComponent, children: [
            { path: 'create', component: CreateComponent },
        ],
    },
    {
        path: 'forum', component: ForumComponent, children: [
            { path: 'createquest', component: ForumCreateComponent}
        ]
    },

]

@NgModule({
    imports: [RouterModule.forRoot(routers), FormsModule, CommonModule,CKEditorModule],
    declarations: [
        GroupsComponent,
        CreateComponent,
        ForumCreateComponent,
        ForumComponent,
    ],
    providers: [
        GroupService,
        ForumService,
    ],
    exports: [RouterModule]
})

export class GroupModule{

}