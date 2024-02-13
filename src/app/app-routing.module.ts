import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path:'recipes' , loadChildren :()=>import('./recipes/recipes.module').then(m=>m.RecipesModule)}, //loading Routes lazly,
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}) ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
