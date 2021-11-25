addEventListener('fetch', async (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});
const handleRequest = async (request) => {
    if (request.method == 'POST') {
        const data = await request.json();
        await CONFIG.put(`data`, JSON.stringify(data));
        return new Response('OK', { status: 200 });
    }
    if (request.method == 'GET') {
        const data = await request.json();
        await CONFIG.get(`data`);
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new Response('Not Found', { status: 404 });
};
