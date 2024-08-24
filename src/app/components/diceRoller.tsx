'use client'

import { useState } from "react";

export function DiceRoller() {
  const [diceType, setDiceType] = useState(6); // Default to a 6-sided die
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [rollResults, setRollResults] = useState<number[]>([]); // Explicitly define the type as an array of numbers
  const [total, setTotal] = useState(0);

  const rollDice = () => {
    const results: number[] = [];
    let sum = 0;

    for (let i = 0; i < numberOfDice; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      results.push(roll);
      sum += roll;
    }

    setRollResults(results); // No more type error here
    setTotal(sum);
  };

  return (
    <div className="p-3 lg:w-1/2 w-full bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Dice Roller</h2>

      {/* Dice Roll Settings */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="diceType">
            Type of Dice (e.g., 4 for d4, 6 for d6, etc.)
          </label>
          <input
            type="number"
            id="diceType"
            value={diceType}
            onChange={(e) => setDiceType(parseInt(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            min="1"
            placeholder="Enter dice type (e.g., 6 for d6)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="numberOfDice">
            Number of Dice
          </label>
          <input
            type="number"
            id="numberOfDice"
            value={numberOfDice}
            onChange={(e) => setNumberOfDice(parseInt(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            min="1"
            placeholder="Enter number of dice"
          />
        </div>

        <button
          onClick={rollDice}
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Roll Dice
        </button>
      </div>

      {/* Roll Results */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Roll Results:</h3>
        {rollResults.length > 0 ? (
          <div>
            <p className="text-gray-700">Dice Rolls: {rollResults.join(", ")}</p>
            <p className="text-gray-700">Total: {total}</p>
          </div>
        ) : (
          <p className="text-gray-500">No rolls yet. Click &quot;Roll Dice&quot; to start.</p>
        )}
      </div>
    </div>
  );
}
