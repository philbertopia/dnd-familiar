"use client"

import { useState } from "react";

export function Inventory() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemQuantity, setEditItemQuantity] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    if (itemName.trim() === "" || itemQuantity.trim() === "") return;

    setItems([...items, { name: itemName, quantity: parseInt(itemQuantity) }]);
    setItemName("");
    setItemQuantity("");
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setIsEditing(true);
    setCurrentEditIndex(index);
    setEditItemName(items[index].name);
    setEditItemQuantity(items[index].quantity.toString());
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setCurrentEditIndex(null);
    setEditItemName("");
    setEditItemQuantity("");
  };

  const saveEdit = (e) => {
    e.preventDefault();
    if (editItemName.trim() === "" || editItemQuantity.trim() === "") return;

    const updatedItems = items.map((item, index) =>
      index === currentEditIndex
        ? { ...item, name: editItemName, quantity: parseInt(editItemQuantity) }
        : item
    );

    setItems(updatedItems);
    cancelEditing();
  };

  return (
    <div className="p-3 lg:w-1/2 w-full bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Inventory Tracker</h2>

      {/* Inventory List */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => startEditing(index)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add or Edit Item Form */}
      {isEditing ? (
        <form className="mt-6 space-y-4" onSubmit={saveEdit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="editItemName"
            >
              Edit Item Name
            </label>
            <input
              type="text"
              id="editItemName"
              value={editItemName}
              onChange={(e) => setEditItemName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new item name"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="editItemQuantity"
            >
              Edit Quantity
            </label>
            <input
              type="number"
              id="editItemQuantity"
              value={editItemQuantity}
              onChange={(e) => setEditItemQuantity(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new quantity"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={cancelEditing}
            className="w-full mt-2 py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={addItem}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="itemName"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter item name"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="itemQuantity"
            >
              Quantity
            </label>
            <input
              type="number"
              id="itemQuantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter quantity"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Item
          </button>
        </form>
      )}
    </div>
  );
}
