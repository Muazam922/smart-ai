import { Server } from 'socket.io';
import { analyzeCodeWithAI } from './services/aiService.js';

export function initializeWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('code-analysis-request', async ({ code, model }) => {
      try {
        const analysis = await analyzeCodeWithAI(code, model);
        socket.emit('code-analysis-response', {
          status: 'success',
          analysis
        });
      } catch (error) {
        socket.emit('code-analysis-error', {
          status: 'error',
          message: error.message
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
}
