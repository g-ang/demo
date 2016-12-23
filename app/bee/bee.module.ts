import {NgModule, FormsModule, RouterModule, CommonModule, Routes, BrowserModule} from './../lib/common.module';
import {Result, BeeService} from './bee.service';
import {BeeComponent} from './bee.component';
import { FlorydayComponent} from './floryday.component';
import { CKEditorModule } from 'ng2-ckeditor';
const routers: Routes = [
    {
        path: 'bee', component: BeeComponent, children: [
            { path: 'floryday', component: FlorydayComponent }
          
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routers), FormsModule, CommonModule,CKEditorModule],
    declarations: [
        BeeComponent,
        FlorydayComponent,
      
    ],
    providers: [
        BeeService,
    ],
    exports: []

})

export class BeeModule{

}