import {NgModule, FormsModule, RouterModule, CommonModule, Routes, BrowserModule, AuthorComponent} from './../lib/common.module';

import {IhomeComponent} from './ihome.component';
import {TankComponent} from './tank.component';
import {TankServer} from './tank.server';
import { CKEditorModule } from 'ng2-ckeditor';
const routers: Routes = [
    {
        path: 'ihome', component: IhomeComponent, children: [
            { path: 'tank', component: TankComponent },
           
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routers), CommonModule, FormsModule],
    declarations: [
        IhomeComponent,
        TankComponent,
    ],
    providers: [
        TankServer
    ],
    exports: [RouterModule]

})

export class IhomeModule {

}