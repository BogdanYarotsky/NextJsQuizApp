'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

const VideoPlayer = ({ videoId }: { videoId: string }) => {
    return (
        <iframe
            className="aspect-video rounded-lg shadow-lg mx-auto"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Youtube player: ${videoId}`}
            frameBorder="0"
            width={690}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen />
    );
};

const GoogleForm = ({ url }: { url: string }) => {
    return (
        <iframe
            className="w-full h-full mx-auto"
            src={url}
            width="640"
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
        <div className='bg-custom-purple flex flex-col h-screen pt-5'>
            {videoParam && <VideoPlayer videoId={videoParam} />}
            <div className='mt-2 mb-3 flex justify-center'>
                {formsUrls.map((_, index) => (
                    <button
                        className={`p-2 mx-1 rounded ${activeTab === index ?
                            'bg-button-purple-hl text-white border-black border-2 font-semibold'
                            : 'bg-button-purple text-white'}`}

                        key={index}
                        onClick={() => setActiveTab(index)}>
                        {index === formsUrls.length - 1 ? `Фінал` : `Тур ${index}`}
                    </button>
                ))}
            </div>
            <div className='flex-grow'>
                {formsUrls.map((url, index) => (
                    <div className='h-full' key={index} style={{ display: index === activeTab ? 'block' : 'none' }}>
                        <GoogleForm url={url} />
                    </div>
                ))}
            </div>
        </div>
    );
}