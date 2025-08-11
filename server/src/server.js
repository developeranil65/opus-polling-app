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
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.add(ws);

  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  ws.on("message", (msg) => {
    console.log("Message from client:", msg.toString());
  });
});

// Broadcast function for sending messages to all clients
const broadcast = (data) => {
  const strData = JSON.stringify(data);
  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(strData);
    }
  }
};

// Make broadcast available in controllers via app
app.set("broadcast", broadcast);

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
  }
);
