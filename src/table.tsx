import { useState } from "react";

export default function RecipeTable() {
  //default value
  const totalDough = 1000;

  const defaultRecipe = {
    name: "Pan de masa madre",
    ingredients: [
      { name: "Harina de fuerza", proportion: 0.85 },
      { name: "Harina integral", proportion: 0.15 },
      { name: "Agua", proportion: 0.7 },
      { name: "Masa Madre", proportion: 0.1 },
      { name: "Sal", proportion: 0.02 },
    ],
  };

  const totalCalculation = defaultRecipe.ingredients.reduce(
    (acc, curr) => acc + curr.proportion,
    0
  );

  //check which ratio and its set value is changing the recipe and update the state
  const [refRatio, setRefRatio] = useState({
    lastRatio: totalCalculation,
    lastValue: totalDough,
  });

  return (
    <div className="text-zinc-700">
      <h2 className="text-2xl font-extrabold">{defaultRecipe.name}</h2>
      <p>Total calculation {totalCalculation} g.</p>
      <p>
        Last set ratio {refRatio.lastRatio}, value {refRatio.lastValue}
      </p>
      <div className="flex flex-row items-baseline py-2">
        <p className="text-xl font-bold">Masa total:</p>
        <input
          defaultValue={
            (refRatio.lastRatio * refRatio.lastValue) / totalCalculation
          }
          className="w-[4rem] border-2 border-zinc-700 mx-2 overflow-clip"
        ></input>
        <p>g.</p>
      </div>
      <table className="border-2 border-zinc-800 w-full">
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
          {defaultRecipe.ingredients.map((ing) => {
            return (
              <tr key={ing.name}>
                <td>{ing.name}</td>
                <td>{ing.proportion * 100 + "%"}</td>
                <td>
                  <input
                    type="number"
                    defaultValue={Number(
                      Math.round(
                        (refRatio.lastValue * ing.proportion) /
                          refRatio.lastRatio +
                          "e+2"
                      ) + "e-2"
                    )}
                    onSubmit={(e) => {
                      setRefRatio({
                        lastRatio: ing.proportion,
                        lastValue: e.target.value,
                      });
                    }}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
