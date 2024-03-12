const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");

// Import MQTT library
const aedes = require("aedes")();
const mqttServer = require("net").createServer(aedes.handle);

// Create Express app
const app = express();
const PORT = 5000;

// สร้าง WebSocket server ที่พอร์ต 8080
const wss = new WebSocket.Server({ port: 8080 });

// เพิ่ม middleware CORS
app.use(cors());

// เมื่อมีการเชื่อมต่อ WebSocket
wss.on("connection", function connection(ws) {
  console.log("WebSocket connected");

  // เมื่อมีข้อมูลถูกส่งมาจาก WebSocket client
  ws.on("message", function incoming(message) {
    console.log("Received message from client: %s", message);
  });
});

// เริ่มต้น MQTT broker
mqttServer.listen(1883, () => {
  console.log("MQTT server listening on port 1883");
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
