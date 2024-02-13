import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthInterceptorService } from './auth/auth/auth.interceptor.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shoppingList.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
     

   AuthComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
   // RecipesModule, // we import it now lazely so if we leave it here , it would be imported eagerly and lazely
    ShoppingListModule,
    SharedModule
    
  ],
  providers: [ShoppingListService,RecipeService,{
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptorService,
     multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
