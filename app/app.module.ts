
import { AppComponent }   from './app.component';
import { HttpModule }    from '@angular/http';
import {AccountModule }  from './account/account.module';
import {ProductModule} from './product/product.module';
import {BeeModule}   from './bee/bee.module';
import {IhomeModule}   from './ihome/ihome.module';
import {SigninComponent} from './account/signin.component';
import {GroupModule} from './group/group.module';
import {DocModule} from './doc/doc.module';
import {NgModule, FormsModule, RouterModule, CommonModule, Routes, BrowserModule, ReactiveFormsModule} from './lib/common.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AccountModule,
        ProductModule,
        BeeModule,
        IhomeModule,
        CommonModule,
        ReactiveFormsModule,
        GroupModule,
        DocModule,
    ], 
    declarations: [AppComponent, SigninComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}