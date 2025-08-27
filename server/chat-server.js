
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

// Auto-response system for demo purposes
const autoResponses = [
  "Thanks for reaching out! How can I help you today?",
  "I understand your concern. Let me assist you with that.",
  "That's a great question! Here's what I can tell you...",
  "I'll need a moment to look that up for you.",
  "Is there anything specific you'd like to know about our services?"
];

wss.on('connection', (ws) => {
  const clientId = Date.now().toString();
  clients.set(clientId, ws);
  
  console.log(`Client ${clientId} connected`);
  
  // Send welcome message
  setTimeout(() => {
    ws.send(JSON.stringify({
      type: 'message',
      message: 'Hello! Welcome to Scholars Space support. How can I help you today?',
      sender: 'Support Agent',
      timestamp: new Date().toISOString()
    }));
  }, 1000);

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'message') {
        console.log(`Message from ${clientId}: ${message.message}`);
        
        // Simulate typing indicator
        ws.send(JSON.stringify({
          type: 'typing',
          isTyping: true
        }));
        
        // Auto-respond after delay (simulate human response time)
        setTimeout(() => {
          ws.send(JSON.stringify({
            type: 'typing',
            isTyping: false
          }));
          
          const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
          ws.send(JSON.stringify({
            type: 'message',
            message: randomResponse,
            sender: 'Support Agent',
            timestamp: new Date().toISOString()
          }));
        }, 2000 + Math.random() * 3000);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(clientId);
    console.log(`Client ${clientId} disconnected`);
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error for client ${clientId}:`, error);
    clients.delete(clientId);
  });
});

const PORT = process.env.CHAT_PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Chat server running on port ${PORT}`);
});
