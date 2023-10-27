'use client'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

const VideoPlayer = ({ videoId }: { videoId: string }) => {
    return (
        <iframe
            className="w-full md:w-[690px] aspect-video rounded-lg shadow-lg mx-auto"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Youtube video ${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen />
    );
};

const GoogleForm = ({ formId }: { formId: string }) => {
    return (
        <iframe
            className="w-full h-full mx-auto"
            src={`https://forms.gle/${formId}`}
            title={`Google Form ${formId}`}
        />
    );
};

export default function Quiz() {
    const searchParams = useSearchParams()
    const videoParam = searchParams.get('video');
    const formsParam = searchParams.get('forms');
    const formIds = formsParam === null ? []
        : formsParam.split(".");

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className='bg-custom-purple flex flex-col h-screen pt-2'>
            {videoParam && <VideoPlayer videoId={videoParam} />}
            <div className='mt-2 mb-3 flex justify-center'>
                {formIds.map((_, index) => (
                    <button
                        className={`p-2 mx-1 rounded ${activeTab === index ?
                            'bg-button-purple-hl text-white border-black border-2 font-semibold'
                            : 'bg-button-purple text-white'}`}

                        key={index}
                        onClick={() => setActiveTab(index)}>
                        {index === formIds.length - 1 ? `Фінал` : `Тур ${index}`}
                    </button>
                ))}
            </div>
            <div className='flex-grow'>
                {formIds.map((formId, index) => (
                    <div className='h-full' key={index} style={{ display: index === activeTab ? 'block' : 'none' }}>
                        <GoogleForm formId={formId} />
                    </div>
                ))}
            </div>
        </div>
    );
}