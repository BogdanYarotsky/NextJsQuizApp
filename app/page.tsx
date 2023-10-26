"use client";
import { useState } from "react";

const extractYouTubeIdError = new Error('Не зміг зчитати посилання на трансляцію.');

function extractYouTubeId(youtubeVideoUrl: string) {
  try {
    const parsedUrl = new URL(youtubeVideoUrl);

    if (parsedUrl.hostname !== "www.youtube.com" && parsedUrl.hostname !== "youtube.com") {
      return new Error('Посилання на трансляцію не з ютуба.');
    }

    if (parsedUrl.pathname === "/watch") {
      const searchParams = new URLSearchParams(parsedUrl.search);
      const videoId = searchParams.get('v');
      return searchParams.get('v') ?? extractYouTubeIdError;
    }

    if (parsedUrl.pathname.startsWith("/live/")) {
      return parsedUrl.pathname.split("/")[2];
    }

    return extractYouTubeIdError;
  } catch (error) {
    return extractYouTubeIdError;
  }
}

function extractFormsIds(formUrls: string[]): (string | Error)[] {
  return formUrls.map(url => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname !== "forms.gle") {
        return new Error("URL is not a Google Forms URL");
      }
      const pathSegments = parsedUrl.pathname.split("/");
      const formId = pathSegments[pathSegments.length - 1];
      return formId;

    } catch (error) {
      return new Error("Invalid Google Forms Url");
    }
  });
}

function buildQuizUrl(youtubeUrl: string, formUrls: string[]): string | Error {
  const youtubeId = extractYouTubeId(youtubeUrl);
  if (youtubeId instanceof Error) {
    return youtubeId;
  }

  const formsIds = extractFormsIds(formUrls);
  const formIdsErrors = formsIds.filter(formId => formId instanceof Error) as Error[];
  if (formIdsErrors.length > 0) {
    return new Error(formIdsErrors.map(err => err.message).join(' '));
  }

  // at this stage we 100% that formIds don't have Error entries
  const validFormIds = formsIds as string[];

  const queryParams = {
    video: youtubeId,
    forms: validFormIds.join('.')
  }

  return "/quiz?" + new URLSearchParams(queryParams).toString();
}

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [formUrls, setFormUrls] = useState<string[]>(['', '']);

  const handleFormUrlChange = (index: number, value: string) => {
    setFormUrls(formUrls.map((url, i) => i === index ? value : url));
  };

  const addFormUrlField = () => {
    setFormUrls([...formUrls.slice(0, -1), '', ...formUrls.slice(-1)])
  };

  const removeFormUrlField = () => {
    if (formUrls.length <= 2) return;
    setFormUrls([...formUrls.slice(0, -2), ...formUrls.slice(-1)]);
  };

  const openLinkInNewTab = () => {
    const urlOrError = buildQuizUrl(youtubeUrl, formUrls);

    if (urlOrError instanceof Error) {
      window.alert(urlOrError.message);
      return;
    }

    window.open(urlOrError, '_blank');
  }

  const getRoundString = (index: number) => {
    return index == formUrls.length - 1 ? "Фінал" : "Тур " + index;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <div className="mb-2">
        <div>Лінк на трансляцію:</div>
        <input className="border rounded px-2 py-1 ml-2"
          value={youtubeUrl}
          onChange={event => setYoutubeUrl(event.target.value)}
          type="text"
        />
      </div>
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={addFormUrlField}>Додати тур</button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={removeFormUrlField}>Прибрати тур</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={removeFormUrlField}>Лінк</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={removeFormUrlField}>Опис</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={openLinkInNewTab}>Превью</button>
      </div>
      {formUrls.map((field, index) => (
        <div key={index}>
          <div>{getRoundString(index)}:</div>
          <input className="border rounded px-2 py-1 ml-2"
            type="text"
            value={field}
            onChange={event => handleFormUrlChange(index, event.target.value)}
          />
        </div>
      ))}
    </div>
  );
}