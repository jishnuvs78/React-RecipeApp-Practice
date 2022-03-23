import React , {useState,useEffect} from 'react';
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = "JsCookinWidReact.recipes"

function App() {
  const[selectedRecipeId,setSelectedRecipeId] = useState()
  const [recipes,setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe=>recipe.id===selectedRecipeId)

  useEffect(()=>{
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(recipeJSON != null){
      setRecipes(JSON.parse(recipeJSON))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(recipes))
  },[recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookingTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: ''}
      ]
    }

    handleRecipeSelect(newRecipe.id)
    setRecipes([...recipes,newRecipe])
  }

  function handleRecipeChange(id,recipe) {
    const newRecipes = [...recipes]
    const index=newRecipes.findIndex(r=>r.id===id)
    newRecipes[index]=recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if(selectedRecipeId != null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    
    setRecipes(recipes.filter(recipe=>recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )

}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    cookingTime: '1:45',
    servings: 3,
    instructions: "1. Put salt\n2. Put in Oven\n3. Eat",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: 3
      },
      {
        id: 2,
        name: 'salt',
        amount: 4
      }
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    cookingTime: '0:45',
    servings: 5,
    instructions: "1. Put salt\n2. Put in Oven\n3.Eat",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: 3
      },
      {
        id: 2,
        name: 'Paprika',
        amount: 2
      }
    ]
  }
]

export default App;
