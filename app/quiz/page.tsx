'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

const VideoPlayer = ({ videoId }: { videoId: string }) => {
    return (
        <iframe
            className="aspect-w-16 aspect-h-9 w-[70%] mx-auto"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Youtube player: ${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen />
    );
};

const GoogleForm = ({ url }: { url: string }) => {
    return (
        <iframe
            className="w-[70%] mx-auto"
            src={url}
            width="640" height="5000"
            title={`Google Form: ${url}`}
        />
    );
};

export default function Quiz() {
    const searchParams = useSearchParams()
    const videoParam = searchParams.get('video');
    const formsParam = searchParams.get('forms');
    const formsUrls = formsParam === null ? []
        : formsParam.split(".").map(id => `https://forms.gle/${id}`);

    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            {videoParam && <VideoPlayer videoId={videoParam} />}
            <div className='mt-2 mb-2 flex justify-center'>
                {formsUrls.map((_, index) => (
                    <button className="bg-blue-500 text-white p-2 mx-1 rounded" key={index} onClick={() => setActiveTab(index)}>
                        {index == formsUrls.length - 1 ? `Фінал` : `Тур ${index}`}
                    </button>
                ))}
            </div>
            <div>
                {formsUrls.map((url, index) => (
                    <div key={index} style={{ display: index === activeTab ? 'block' : 'none' }}>
                        <GoogleForm url={url} />
                    </div>
                ))}
            </div>
        </>
    );
}