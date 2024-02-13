import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth/auth.service';
import { exhaustMap, take, tap, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private slService: ShoppingListService, private http: HttpClient, private authService: AuthService) { }


  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  storeRecipes() {


    this.http.put('https://recipe-faf89-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', this.recipes).subscribe((resp) => {
      console.log(resp)
    });
  }
    


  fetchRecipe() {
    
        
        return this.http.get<Recipe[]>(
          'https://recipe-faf89-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
           
         ).pipe(map(recipes => {
          console.log(recipes);
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          console.log(recipes);
          this.setRecipes(recipes);
        })
      );
      
    
      
  }
 
}

