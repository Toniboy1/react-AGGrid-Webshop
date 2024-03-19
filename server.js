const WebSocket = require('ws'); // Import the WebSocket module
const express = require('express');
const http = require('http');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3002;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let connectedClients = 0;

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    return handle(req, res);
  });

  const wss = new WebSocket.Server({ server }); // Use WebSocket.Server

  wss.on('connection', ws => {
    connectedClients++;
    broadcastUserCount();

    ws.on('close', () => {
      connectedClients--;
      broadcastUserCount();
    });
  });

  function broadcastUserCount() {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) { // Here, use WebSocket.OPEN
        client.send(JSON.stringify({ userCount: connectedClients }));
      }
    });
  }

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
