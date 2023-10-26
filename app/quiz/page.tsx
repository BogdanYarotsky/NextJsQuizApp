'use client'
import { useSearchParams } from 'next/navigation'

const VideoPlayer = ({ video }: { video: string }) =>
    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />;


export default function Quiz() {
    const searchParams = useSearchParams()
    const video = searchParams.get('video');

    return (
        <>
            {video && <VideoPlayer video={video} />}
        </>
    )
}