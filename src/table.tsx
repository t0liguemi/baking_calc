import { SetStateAction, useEffect, useState } from "react";

type Recipe = {
  name: string;
  description?: string;
  ingredients: {
    name: string;
    proportion: number;
  }[];
};
type QuantityList = { name: string; amount: number; proportion: number }[];

export default function RecipeTable(props: { recipe: Recipe }) {


  const totalRatio = props.recipe.ingredients.reduce(
    (acc, curr) => acc + curr.proportion,
    0
  );

  const [refRatio, setRefRatio] = useState({
    lastRatio: totalRatio,
    lastValue: 1000,
  });

  const recipe = props.recipe;

  const defaultValues: QuantityList = [
    { name: "doughWeight", amount: 1000, proportion: totalRatio },
  ];

  recipe.ingredients.forEach((ing) => {
    defaultValues.push({
      name: ing.name,
      amount:
        (Math.round(
          (ing.proportion * refRatio.lastValue) / totalRatio + Number.EPSILON
        ) *
          100) /
        100,
      proportion: ing.proportion,
    });
  });

    
  const [calculations, setCalculations] = useState<QuantityList>(defaultValues);
  const [formValues, setFormValues] = useState(defaultValues);


  useEffect(() => {
    // Recalculate default values when the recipe changes
    const defaultValues: QuantityList = [
      { name: "doughWeight", amount: 1000, proportion: totalRatio },
    ];

    recipe.ingredients.forEach((ing) => {
      defaultValues.push({
        name: ing.name,
        amount:
          (Math.round(
            (ing.proportion * refRatio.lastValue) / totalRatio + Number.EPSILON
          ) *
            100) /
          100,
        proportion: ing.proportion,
      });
    });

    setCalculations(defaultValues);
    setFormValues(defaultValues);
  }, [recipe, totalRatio, refRatio.lastValue]);

  //check which ratio and its set value is changing the recipe and update the state


  console.log("Default", defaultValues);
  console.log("Calculations", calculations);

  function updateValues(lastRatio: number, lastValue: number) {
    setRefRatio({ lastRatio, lastValue });
    const newValues: QuantityList = [];
    recipe.ingredients.forEach((ing) => {
      newValues.push({
        name: ing.name,
        amount:
          Math.round(
            ((ing.proportion * lastValue) / lastRatio + Number.EPSILON) * 100
          ) / 100,
        proportion: ing.proportion,
      });
    });
    newValues.unshift({
      name: "doughWeight",
      amount: (totalRatio * lastValue) / lastRatio,
      proportion: totalRatio,
    });
    setCalculations(newValues);
    setFormValues(newValues);
  }

  function updateForm(amount: number, index: number) {
    const updatedValue = {
      name: calculations[index].name,
      amount: amount,
      proportion: calculations[index].proportion,
    };
    setFormValues(
      formValues
        .slice(0, index)
        .concat(updatedValue, formValues.slice(index + 1))
    );
  }
  console.log("FormValues", formValues);
  if (formValues.length === 0) {
    return <div>Loading...</div>}

  else return (
    <div className="text-zinc-700">
      <h2 className="text-2xl font-extrabold">{recipe.name}</h2>
      <p>{recipe.description}</p>
      <div className="flex flex-row items-baseline py-2">
        <p className="text-xl font-bold">Masa total:</p>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            updateValues(totalRatio, e.target.amount.value);
          }}
        >
          <input
            name="amount"
            value={Number(Math.round(formValues[0].amount))}
            onChange={(e: any) => updateForm(e.target.value, 0)}
            className="w-[4rem] border-2 border-zinc-700 mx-2 overflow-clip"
          />
        </form>
        <p>g.</p>
      </div>
      <div className="border-2 border-zinc-800 max-w-[48rem] px-4 py-4">
        {formValues && <table className="w-full">
          <thead>
            <tr className="border-zinc-800">
              <th>Ingrediente</th>
              <th>
                Proporción <br />
                (100% = Harinas)
              </th>
              <th>
                Cantidad <br />
                (gramos)
              </th>
            </tr>
          </thead>
          <tbody>
            {calculations.slice(1).map((ing, index) => {
              return (
                <tr key={ing.name}>
                  <td>{ing.name}</td>
                  <td className="flex flex-row justify-center">
                    {ing.proportion + "%"}
                  </td>
                  <td>
                    <form
                      className="flex flex-row justify-center"
                      onSubmit={(e: any) => {
                        e.preventDefault();
                        updateValues(ing.proportion, e.target.amount.value);
                      }}
                    >
                      <input
                        name="amount"
                        type="number"
                        value={formValues[index + 1].amount}
                        onChange={(e: any) =>
                          updateForm(e.target.value, index + 1)
                        }
                      ></input>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>}
      </div>
    </div>
  );
}
