
import { AppComponent }   from './app.component';
import { HttpModule }    from '@angular/http';
import {AccountModule }  from './account/account.module';
import {ProductModule} from './product/product.module';
import {BeeModule}   from './bee/bee.module';
import {IhomeModule}   from './ihome/ihome.module';
import {LoginBoxComponent} from './account/login.component';

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
    ], 
    declarations: [AppComponent, LoginBoxComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}