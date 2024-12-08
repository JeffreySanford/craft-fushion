import { Injectable } from '@angular/core';
import { Observable, catchError, tap, of } from 'rxjs';
import { Recipe } from './recipe.class';
import { ApiService } from '../../common/services/api.service';

@Injectable()
export class PeasantKitchenService {
  private recipe!: Recipe;
  private readonly endpoint = 'recipes';

  constructor(private apiService: ApiService) {}

  /**
   * Retrieves all recipes from the system
   * @returns Observable<Recipe[]> - Array of all recipes
   */
  getRecipes(): Observable<Recipe[]> {
    console.log('Fetching all recipes');
    return this.apiService.get<Recipe[]>(this.endpoint).pipe(
      tap(recipes => console.log(`Retrieved ${recipes.length} recipes`)),
      catchError(error => {
        console.error('Error fetching recipes:', error);
        return of([]);
      })
    );
  }

  /**
   * Sets the currently selected recipe
   * @param recipe - Recipe to be set as current
   */
  setRecipe(recipe: Recipe): void {
    console.log('Setting current recipe:', recipe.id);
    this.recipe = recipe;
  }

  /**
   * Gets the currently selected recipe
   * @returns Recipe - Currently selected recipe
   * @throws Error if no recipe is selected
   */
  getRecipe(): Recipe {
    if (!this.recipe) {
      throw new Error('No recipe currently selected');
    }
    console.log('Getting current recipe:', this.recipe.id);
    return this.recipe;
  }

  /**
   * Creates a new recipe
   * @param recipe - Recipe data to create
   * @returns Observable<Recipe>
   */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    console.log('Adding new recipe:', recipe);
    return this.apiService.post<Recipe>(this.endpoint, recipe).pipe(
      tap(newRecipe => console.log('Created recipe:', newRecipe.id)),
      catchError(error => {
        console.error('Error creating recipe:', error);
        throw error;
      })
    );
  }

  /**
   * Updates an existing recipe
   * @param recipe - Recipe data to update
   * @returns Observable<Recipe>
   */
  updateRecipe(recipe: Recipe): Observable<Recipe> {
    console.log('Updating recipe:', recipe.id);
    return this.apiService.put<Recipe>(`${this.endpoint}/${recipe.id}`, recipe).pipe(
      tap(updatedRecipe => console.log('Updated recipe:', updatedRecipe.id)),
      catchError(error => {
        console.error('Error updating recipe:', error);
        throw error;
      })
    );
  }

  /**
   * Deletes a recipe
   * @param id - Recipe ID to delete
   * @returns Observable<void>
   */
  deleteRecipe(id: string): Observable<void> {
    console.log('Deleting recipe:', id);
    return this.apiService.delete<void>(`${this.endpoint}/${id}`).pipe(
      tap(() => console.log('Deleted recipe:', id)),
      catchError(error => {
        console.error('Error deleting recipe:', error);
        throw error;
      })
    );
  }
}