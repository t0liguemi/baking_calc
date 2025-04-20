import { useState } from "react";
import "./index.css";
import RecipeTable from "./table";
function App() {
  type Recipe = {
    name: string;
    description?: string;
    ingredients: {
      name: string;
      proportion: number;
    }[];
  };

  const masaMadreRecipe: Recipe = {
    name: "Pan de masa madre",
    description: "Idealmente fermentar un minimo de 24 horas en frío",
    ingredients: [
      { name: "Harina de fuerza", proportion: 0.85 },
      { name: "Harina integral", proportion: 0.15 },
      { name: "Agua", proportion: 0.7 },
      { name: "Masa Madre", proportion: 0.1 },
      { name: "Sal", proportion: 0.02 },
    ],
  };

  const twentyFourHoursPizzaRecipe: Recipe = {
    name: "24 Hour proof pizza",
    description:
      "Pizza dough made to proof for 24 hours in the fridge (4-5°C), a traditional pizza dough ball is around 230-260 grams",
    ingredients: [
      {
        name: "Bread flour",
        proportion: 100,
      },
      { name: "Water", proportion: 60 },
      { name: "Salt", proportion: 2 },
      { name: "Instant dry yeast", proportion: .35 },
    ],
  };

  const recipeList = [masaMadreRecipe, twentyFourHoursPizzaRecipe];

  const [activeRecipe, setActiveRecipe] = useState(0);

  return (
    <div className="p-4 h-screen flex flex-col">
      <h1 className="text-4xl font-extrabold text-zinc-800 mb-8">
        Calculadora de pancitos
      </h1>
      <small>
        Puedes modificar cualquier valor y las cantidades se adaptarán
        manteniendo la receta!
      </small><div className="my-4">
      <label htmlFor="recipeSelect" >Current recipe: </label>
      <select
      className="bg-white w-lg py-1 px-2 border-2 border-zinc-700 rounded-xl font-bold "
        id="recipeSelect"
        onChange={(e: any) => {
          setActiveRecipe(e.target.value);
        }}
      >
        {recipeList.map((recipe, i) => {
          return <option key={i} value={i}>{recipe.name}</option>;
        })}
      </select></div>

      <RecipeTable recipe={recipeList[activeRecipe]} />
    </div>
  );
}

export default App;
