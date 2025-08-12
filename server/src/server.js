import connectDB from "./db/connect.db.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import { createServer } from "http";
import { WebSocketServer } from "ws";

// Load env variables
dotenv.config({ path: "./.env" });

// Create HTTP server from Express app
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Map<pollCode, Set<WebSocket>>
const pollRooms = new Map();

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      // Client joins a specific poll room
      if (data.type === "JOIN_POLL" && data.pollCode) {
        const code = data.pollCode;

        if (!pollRooms.has(code)) {
          pollRooms.set(code, new Set());
        }
        pollRooms.get(code).add(ws);

        ws.pollCode = code; // store for cleanup
        console.log(`Client joined poll: ${code}`);
      }
    } catch (err) {
      console.error("Invalid WS message", err);
    }
  });

  ws.on("close", () => {
    if (ws.pollCode && pollRooms.has(ws.pollCode)) {
      pollRooms.get(ws.pollCode).delete(ws);
      console.log(`Client left poll: ${ws.pollCode}`);
    }
  });
});

// Broadcast function for sending messages only to poll's clients
const broadcastToPoll = (pollCode, data) => {
  const strData = JSON.stringify(data);
  const clients = pollRooms.get(pollCode) || new Set();

  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(strData);
    }
  }
};

// Make broadcast function available in controllers via app
app.set("broadcast", broadcastToPoll);

// Connect DB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    server.on("error", (error) => {
      console.error("Server Error", error);
      throw error;
    });
  })
  .catch((error) => {
    console.error("MONGODB connection failed!", error);
  });
