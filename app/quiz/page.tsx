'use client'
import { useSearchParams } from 'next/navigation'

export default function Quiz() {
    const searchParams = useSearchParams()

    return (
        <iframe width="560" height="315" src="https://www.youtube.com/embed/DWFGa2ludLY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    )
}