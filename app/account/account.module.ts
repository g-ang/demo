import {NgModule, FormsModule, RouterModule, CommonModule, Routes, BrowserModule, ReactiveFormsModule} from './../lib/common.module';

import { AccountService, auth} from './account.service';
import { LayoutComponent} from './layout.component';
import { CenterComponent} from './center.component';
import { LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {MemoComponent} from './memo.component';


const routers: Routes = [
    {
        path: 'account', component:LayoutComponent,
        children: [
            { path: '', component: CenterComponent,pathMatch:'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'memo', component: MemoComponent },

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
        LoginComponent,
      
        CenterComponent,
        RegisterComponent,
        MemoComponent
    ],
    

    providers: [AccountService],
    exports: [RouterModule]

})
export class AccountModule {


}