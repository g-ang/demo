import {NgModule, FormsModule, RouterModule, CommonModule, Routes, BrowserModule, AuthorComponent} from './../lib/common.module';
import {ItemsComponent} from './items.component';
import {ItemComponent} from './item.component';
import {DescComponent, ResourceComponent} from './desc.component';
import {WarehouseComponent, PreviewImageComponent} from './warehouse.component';
import {GalleryComponent} from './gallery.component';
import {ItemService, WarehouseService, PageComponent, Upload} from './item.service';
import { CKEditorModule } from 'ng2-ckeditor';
const routers: Routes = [
    {
        path: 'items', component: ItemsComponent, children:[
            { path: 'base/:id', component: ItemComponent },
            { path: 'desc/:id', component: DescComponent },
            { path: 'warehouse', component: WarehouseComponent },
            { path: 'warehouse/:id', component: WarehouseComponent },
            { path: 'gallery/:id', component: GalleryComponent },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routers), FormsModule, CommonModule,CKEditorModule],
    declarations: [
        ItemComponent,
        ItemsComponent,
        DescComponent,
        ResourceComponent,
        WarehouseComponent,
        PageComponent,
        PreviewImageComponent,
        Upload,
        AuthorComponent,
        GalleryComponent
    ],
    providers: [
        ItemService,
        WarehouseService,
    ],
    exports: [RouterModule]

})

export class ProductModule{

}