"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const router = useRouter();

  const isButtonEnabled = query || cuisine || maxTime;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (maxTime) params.append("maxTime", maxTime);
    
    router.push(`/recipes?${params.toString()}`);
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Recipe Search</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Recipe Query</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Pasta"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cuisine</label>
          <select
            className="w-full p-2 border rounded"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            <option value="">Select Cuisine</option>
            <option value="italian">Italian</option>
            <option value="mexican">Mexican</option>
            <option value="chinese">Chinese</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Max Preparation Time (minutes)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            placeholder="e.g. 30"
            min="1"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${isButtonEnabled ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
          disabled={!isButtonEnabled}
        >
          Next
        </button>
      </form>
    </div>
  );
}
