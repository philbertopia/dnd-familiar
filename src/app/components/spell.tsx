"use client";

import { useState, FormEvent } from "react";

// Define Spell type
type Spell = {
  name: string;
  level: number;
};

export function SpellSlotTracker() {
  const [spells, setSpells] = useState<Spell[]>([]); // Using the Spell type here
  const [spellName, setSpellName] = useState<string>("");
  const [spellLevel, setSpellLevel] = useState<string>(""); // string for input
  const [slots, setSlots] = useState<number[]>(Array(9).fill(0)); // Array to track slots for spell levels 1-9
  const [usedSlots, setUsedSlots] = useState<number[]>(Array(9).fill(0)); // Array to track used slots for spell levels 1-9

  const addSpell = (e: FormEvent) => {
    e.preventDefault();
    if (spellName.trim() === "" || spellLevel.trim() === "") return;

    const level = parseInt(spellLevel);

    if (isNaN(level) || level < 1 || level > 9) return; // Check if level is a valid number between 1 and 9

    setSpells((prevSpells) => [
      ...prevSpells,
      { name: spellName, level: level },
    ]);
    setSpellName("");
    setSpellLevel("");
  };

  const deleteSpell = (index: number) => {
    setSpells(spells.filter((_, i) => i !== index));
  };

  const incrementSlot = (level: number) => {
    const newSlots = [...slots];
    newSlots[level - 1]++;
    setSlots(newSlots);
  };

  const decrementSlot = (level: number) => {
    const newSlots = [...slots];
    if (newSlots[level - 1] > 0) {
      newSlots[level - 1]--;
      setSlots(newSlots);
      if (usedSlots[level - 1] > newSlots[level - 1]) {
        // Adjust used slots if they exceed available slots
        const newUsedSlots = [...usedSlots];
        newUsedSlots[level - 1] = newSlots[level - 1];
        setUsedSlots(newUsedSlots);
      }
    }
  };

  const castSpell = (level: number) => {
    const newUsedSlots = [...usedSlots];
    if (usedSlots[level - 1] < slots[level - 1]) {
      newUsedSlots[level - 1]++;
      setUsedSlots(newUsedSlots);
    }
  };

  const regainSlot = (level: number) => {
    const newUsedSlots = [...usedSlots];
    if (newUsedSlots[level - 1] > 0) {
      newUsedSlots[level - 1]--;
      setUsedSlots(newUsedSlots);
    }
  };

  // Function to regain all used slots
  const regainAllSlots = () => {
    setUsedSlots(Array(9).fill(0));
  };

  return (
    <div className="p-3 mt-3 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Spells</h2>

      {/* Add Spell Form */}
      <form className="space-y-4" onSubmit={addSpell}>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="spellName"
          >
            Spell Name
          </label>
          <input
            type="text"
            id="spellName"
            value={spellName}
            onChange={(e) => setSpellName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter spell name"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="spellLevel"
          >
            Spell Level (1-9)
          </label>
          <input
            type="number"
            id="spellLevel"
            value={spellLevel}
            onChange={(e) => setSpellLevel(e.target.value)}
            min="1"
            max="9"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter spell level"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Spell
        </button>
      </form>

      {/* Spell List */}
      <div className="space-y-4 mt-6">
        {spells.map((spell, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded"
          >
            <div>
              <p className="font-medium">{spell.name}</p>
              <p className="text-sm text-gray-600">Level: {spell.level}</p>
            </div>
            <button
              onClick={() => deleteSpell(index)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Spell Slot Tracker */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Spell Slot Tracker</h3>
        {slots.map((slot, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm font-medium">
                Level {index + 1}: {usedSlots[index]} / {slot} slots used
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => incrementSlot(index + 1)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                +1 Slot
              </button>
              <button
                onClick={() => decrementSlot(index + 1)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                -1 Slot
              </button>
              <button
                onClick={() => castSpell(index + 1)}
                className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Use Slot
              </button>
              <button
                onClick={() => regainSlot(index + 1)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Regain Slot
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Regain All Slots Button */}
      <button
        onClick={regainAllSlots}
        className="mt-6 w-full py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-800"
      >
        Regain All Slots
      </button>
    </div>
  );
}
