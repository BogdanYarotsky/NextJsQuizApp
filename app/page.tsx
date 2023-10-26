"use client";
import { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';

function extractYouTubeId(url: string) {
  try {
    const parsedUrl = new URL(url);
    let videoId = null;

    if (parsedUrl.hostname === "www.youtube.com" || parsedUrl.hostname === "youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        const searchParams = new URLSearchParams(parsedUrl.search);
        videoId = searchParams.get('v');
      } else if (parsedUrl.pathname.startsWith("/live/")) {
        videoId = parsedUrl.pathname.split("/")[2];
      }
    }

    return videoId;
  } catch (error) {
    console.error("Invalid URL");
    return null;
  }
}

export default function Home() {
  const router = useRouter();
  const [videoField, setVideoField] = useState<string>('');
  const [roundFields, setRoundFields] = useState<string[]>(['']);

  const handleRoundChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...roundFields];
    values[index] = event.target.value;
    setRoundFields(values);
  };

  const handleRemoveField = () => {
    if (roundFields.length < 2) return;
    setRoundFields(roundFields.slice(0, -1));
  };

  const openLinkInNewTab = () => {
    const video = extractYouTubeId(videoField);
    const queryParams = {
      video: video ?? "null",
      rounds: "tbd"
    }
    const url = "/quiz?" + new URLSearchParams(queryParams).toString();
    window.open(url, '_blank');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <div className="mb-2">
        <div>Лінк на трансляцію:</div>
        <input className="border rounded px-2 py-1 ml-2"
          value={videoField}
          onChange={event => setVideoField(event.target.value)}
          type="text"
        />
      </div>
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={() => setRoundFields([...roundFields, ''])}>Додати тур</button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handleRemoveField}>Прибрати тур</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handleRemoveField}>Лінк</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handleRemoveField}>Опис</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={openLinkInNewTab}>Превью</button>
      </div>
      {roundFields.map((field, index) => (
        <div key={index}>
          <div>Тур {index}:</div>
          <input className="border rounded px-2 py-1 ml-2"
            type="text"
            value={field}
            onChange={event => handleRoundChange(index, event)}
          />
        </div>
      ))}
    </div>
  );
}
