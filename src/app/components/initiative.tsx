"use client";

import { useState } from "react";

type Character = {
    name: string;
    initiative: number;
  };

export function InitiativeTracker() {
    const [characters, setCharacters] = useState<Character[]>([]);
  const [characterName, setCharacterName] = useState("");
  const [initiativeScore, setInitiativeScore] = useState("");
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

  const addCharacter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (characterName.trim() === "" || initiativeScore.trim() === "") return;

    setCharacters((prevCharacters) => [
      ...prevCharacters,
      { name: characterName, initiative: parseInt(initiativeScore) },
    ]);
    setCharacterName("");
    setInitiativeScore("");
  };

  const deleteCharacter = (index: number) => {
    setCharacters(characters.filter((_, i) => i !== index));
    if (currentTurnIndex >= index && currentTurnIndex > 0) {
      setCurrentTurnIndex((prevIndex) => prevIndex - 1);
    }
  };

  const sortCharactersByInitiative = () => {
    const sorted = [...characters].sort((a, b) => b.initiative - a.initiative);
    setCharacters(sorted);
    setCurrentTurnIndex(0); // Reset turn index when sorting
  };

  const nextTurn = () => {
    if (characters.length === 0) return;
    setCurrentTurnIndex((prevIndex) => (prevIndex + 1) % characters.length);
  };

  return (
    <div className="lg:w-1/2 w-full p-3 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Initiative Tracker</h2>

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
            htmlFor="initiativeScore"
          >
            Initiative Score
          </label>
          <input
            type="number"
            id="initiativeScore"
            value={initiativeScore}
            onChange={(e) => setInitiativeScore(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter initiative score"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Character
        </button>
      </form>

      {/* Initiative List */}
      <div className="space-y-4 mt-6">
        {characters.map((character, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-3 rounded ${
              currentTurnIndex === index ? "bg-yellow-200" : "bg-gray-100"
            }`}
          >
            <div>
              <p className="font-medium">{character.name}</p>
              <p className="text-sm text-gray-600">
                Initiative: {character.initiative}
              </p>
            </div>
            <button
              onClick={() => deleteCharacter(index)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={sortCharactersByInitiative}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sort by Initiative
        </button>
        <button
          onClick={nextTurn}
          className="py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Next Turn
        </button>
      </div>
    </div>
  );
}

