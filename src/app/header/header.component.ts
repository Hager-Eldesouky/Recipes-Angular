import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private recipeSer: RecipeService, private authServive: AuthService) { }
  isAuthenticated=false;
 userSubscription : Subscription;
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  ngOnInit(): void {
this.userSubscription=  this.authServive.user.subscribe((userData)=>{
     this.isAuthenticated=!!userData;
});
  }


  onSaveDate() {
    this.recipeSer.storeRecipes();
  }
  onFetchDate() {
    this.recipeSer.fetchRecipe().subscribe();
  }
  onLogOut(){
    this.authServive.logout();
  }
}
