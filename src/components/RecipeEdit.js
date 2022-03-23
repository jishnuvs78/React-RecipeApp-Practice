import React , {useContext} from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import { v4 as uuidv4 } from 'uuid'

export default function RecipeEdit({recipe}) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

  function handleChange(changes) {
    handleRecipeChange(recipe.id,{ ...recipe, ...changes })
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients]
    const index = newIngredients.findIndex(i=>i.id===id)
    newIngredients[index]=ingredient
    handleChange({ ingredients: newIngredients})
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: '',
      amount: ''
    }

    handleChange({ingredients : [...recipe.ingredients,newIngredient] })
  }

  function handleIngredientDelete(id) {
    handleChange({ingredients: recipe.ingredients.filter(i=>i.id!==id)})
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button className="btn recipe-edit__remove-button" onClick={()=>handleRecipeSelect(undefined)}>&times;</button>
      </div>
      <div className="recipe-edit__details-grid">
        <label htmlFor="name" className="recipe-edit__label">Name</label>
        <input onInput={e=>handleChange({ name: e.target.value})} type="text" name="name" id="name" value={recipe.name} className="recipe-edit__input"></input>
        <label htmlFor="cookingTime" className="recipe-edit__label">Cook Time</label>
        <input onInput={e=>handleChange({ cookingTime: e.target.value})} type="text" name="cookingTime" id="cookingTime" value={recipe.cookingTime} className="recipe-edit__input"></input>
        <label htmlFor="servings" className="recipe-edit__label">Servings</label>
        <input onInput={e=>handleChange({ servings: parseInt(e.target.value) || '' })} type="text" name="servings" id="servings" min="1" value={recipe.servings} className="recipe-edit__input"></input>
        <label htmlFor="instructions" className="recipe-edit__label">Instructions</label>
        <textarea onInput={e=>handleChange({ instructions: e.target.value})} name="instructions" id="instructions" value={recipe.instructions} className="recipe-edit__input"></textarea>
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
         {recipe.ingredients.map(ingredient=>(
           <RecipeIngredientEdit
              key={ingredient.id}
              handleIngredientChange={handleIngredientChange}
              handleIngredientDelete={handleIngredientDelete}
              ingredient={ingredient}
             />
         ))}
      </div>
      <div className="recipe-edit__add-ingredient-button-container">
        <button className="btn btn--primary" onClick={()=>handleIngredientAdd()}>Add Ingredient</button>
      </div>
    </div>
  )
}
