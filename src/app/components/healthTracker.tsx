"use client";

import { useState } from "react";

export function HealthTracker() {
  const [characters, setCharacters] = useState<
    { name: string; maxHealth: number; currentHealth: number }[]
  >([]);
  const [characterName, setCharacterName] = useState<string>("");
  const [maxHealth, setMaxHealth] = useState<string>("");

  const addCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      characterName.trim() === "" ||
      maxHealth.trim() === "" ||
      isNaN(Number(maxHealth)) ||
      Number(maxHealth) <= 0
    ) {
      return;
    }

    setCharacters([
      ...characters,
      {
        name: characterName,
        maxHealth: parseInt(maxHealth),
        currentHealth: parseInt(maxHealth),
      },
    ]);
    setCharacterName("");
    setMaxHealth("");
  };

  const updateHealth = (index: number, change: number) => {
    const updatedCharacters = [...characters];
    const newHealth = Math.max(
      0,
      updatedCharacters[index].currentHealth + change
    );
    updatedCharacters[index].currentHealth = newHealth;
    setCharacters(updatedCharacters);
  };

  const deleteCharacter = (index: number) => {
    setCharacters(characters.filter((_, i) => i !== index));
  };

  return (
    <div className="p-3 lg:w-1/2 w-full bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Health Tracker</h2>

      {/* Character List */}
      <div className="space-y-4">
        {characters.map((character, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded"
          >
            <div>
              <p className="font-medium">{character.name}</p>
              <p className="text-sm text-gray-600">
                Health: {character.currentHealth} / {character.maxHealth}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => updateHealth(index, -1)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -1
              </button>
              <button
                onClick={() => updateHealth(index, 1)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +1
              </button>
              <button
                onClick={() => deleteCharacter(index)}
                className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Character Form */}
      <form className="mt-6 space-y-4" onSubmit={addCharacter}>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="characterName"
          >
            Character Name
          </label>
          <input
            type="text"
            id="characterName"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter character name"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="maxHealth"
          >
            Maximum Health
          </label>
          <input
            type="number"
            id="maxHealth"
            value={maxHealth}
            onChange={(e) => setMaxHealth(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter maximum health"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Character
        </button>
      </form>
    </div>
  );
}

