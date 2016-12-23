import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpModule }    from '@angular/http';
import {AccountModule }  from './account/account.module';
import {ProductModule} from './product/product.module';
import {BeeModule}   from './bee/bee.module';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AccountModule,
        ProductModule,
        BeeModule,
    ], 
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}