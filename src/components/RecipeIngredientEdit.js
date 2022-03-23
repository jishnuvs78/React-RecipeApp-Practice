import React from 'react'

export default function RecipeIngredientEdit(props) {
  const{
    ingredient,
    handleIngredientChange,
    handleIngredientDelete
  } = props

  function handleChange(changes) {
    handleIngredientChange(ingredient.id,{ ...ingredient, ...changes })
  }

  return (
    <>
      <input onInput={e=>handleChange({ name: e.target.value})} type="text" value={ingredient.name} className="recipe-edit__input"></input>
      <input onInput={e=>handleChange({ amount: e.target.value})} type="text" value={ingredient.amount} className="recipe-edit__input"></input>
      <button className="btn btn--danger" onClick={()=>handleIngredientDelete(ingredient.id)}>&times;</button>
    </>
  )
}
