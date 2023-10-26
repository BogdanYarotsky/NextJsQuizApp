import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get('form');
    if (!formId) return new Response("Form ID missing", { status: 400 });

    try {
        const response = await axios.get(`https://forms.gle/${formId}`);
        return new Response(response.data, {
            headers: {
                'Content-Type': 'text/html'
            }
        });
    } catch (error) {
        return new Response("An error occurred while fetching the form", { status: 500 });
    }
}