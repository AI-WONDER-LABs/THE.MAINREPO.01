/**
 * Ai-bilder - Main application entry point
 *
 * This is a placeholder file for the application entry point.
 * The actual application logic will be implemented here.
 */

const http = require('http');

const PORT = process.env.PORT || 3000;

// Simple HTTP server for health checks
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', message: 'Ai-bilder is running' }));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Ai-bilder - Coming Soon\n');
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ai-bilder server listening on port ${PORT}`);
});

module.exports = server;
