import {NgModule, FormsModule, RouterModule, CommonModule, Routes, BrowserModule, ReactiveFormsModule} from './../lib/common.module';

import { AccountService, auth} from './account.service';
import { LayoutComponent} from './layout.component';
import { CenterComponent} from './center.component';
import {EditPasswordComponent} from './editpassword.component';
import {MemoComponent} from './memo.component';


const routers: Routes = [
    {
        path: 'account', component:LayoutComponent,
        children: [
            { path: '', component: CenterComponent,pathMatch:'full' },
            { path: 'memo', component: MemoComponent },
            { path: 'editpass', component: EditPasswordComponent }

        ]
    },
]



@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routers),
        FormsModule,
        ReactiveFormsModule,
        CommonModule],
    declarations: [
        LayoutComponent,
        CenterComponent,
        MemoComponent,
        EditPasswordComponent,
    ],
    

    providers: [AccountService],
    exports: [RouterModule]

})
export class AccountModule {


}