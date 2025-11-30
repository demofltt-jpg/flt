export default {
  async fetch(request) {
    return new Response('Cloudflare Worker is running! 🚀', {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  },
};
