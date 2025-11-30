/**
 * Cloudflare Worker to serve static HTML and assets
 */

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // Default to index.html for root path
    if (pathname === '/') {
      pathname = '/index.html';
    }

    // Try to fetch the requested file
    try {
      const response = await fetch(new Request(url.origin + pathname, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      }));

      if (response.status === 404) {
        // If file not found, try serving index.html as fallback
        return new Response(
          await fetch(new Request(url.origin + '/index.html', {
            method: 'GET',
            headers: request.headers,
          })).then(r => r.text()),
          {
            status: 404,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          }
        );
      }

      return response;
    } catch (error) {
      // On error, serve index.html
      return new Response(
        await fetch(new Request(url.origin + '/index.html', {
          method: 'GET',
          headers: request.headers,
        })).then(r => r.text()),
        {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
    }
  },
};
