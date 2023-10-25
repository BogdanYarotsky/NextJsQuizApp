"use client";
import { useState } from "react";

export default function Home() {
  const [inputFields, setInputFields] = useState<string[]>(['']);

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, '']);
  };

  const handleRemoveField = () => {
    if (inputFields.length < 2) return;
    setInputFields(inputFields.slice(0, -1));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <div className="mb-2">
        <div>Лінк на трансляцію:</div>
        <input className="border rounded px-2 py-1 ml-2"
          type="text"
        />
      </div>
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handleAddField}>Додати тур</button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handleRemoveField}>Прибрати тур</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handleAddField}>Лінк на гру</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handleRemoveField}>Опис для телеграму</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleRemoveField}>Превью</button>
      </div>
      {inputFields.map((field, index) => (
        <div>
          <div>Тур {index}:</div>
          <input className="border rounded px-2 py-1 ml-2"
            key={index}
            type="text"
            value={field}
            onChange={event => handleInputChange(index, event)}
          />
        </div>
      ))}
      <div className="flex">

      </div>
    </div>
  );
}
