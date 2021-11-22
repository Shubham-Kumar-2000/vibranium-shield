addEventListener('fetch', async (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});
const handleRequest = async (request) => {
    if (request.method != 'POST') {
        return new Response('Not Found', { status: 404 });
    }
    const data = await request.json();
    await CONFIG.put(`data`, JSON.stringify(data));
    return new Response('OK', { status: 200 });
};
