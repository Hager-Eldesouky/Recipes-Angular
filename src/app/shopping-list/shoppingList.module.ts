import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports:[FormsModule, SharedModule,ReactiveFormsModule,RouterModule.forChild([
        {
         path: 'shopping-list', component: ShoppingListComponent 
        }
         ])

    ]
})
export class ShoppingListModule{

}