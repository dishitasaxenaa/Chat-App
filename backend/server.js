import express from "express";
import http from "http";
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const PORT = 5001;

const io = new Server(server, {     //Creating Soccket.io server
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => {
    res.send('<p>"Hello"</p>');
})

io.on('connection', (socket) => {           //Listen for client connection
    console.log("User connected");
    socket.on("user-message", (message) => {
        io.emit("backend-message", message);
        console.log("User sent a message: ", message);
    })
})

server.listen(PORT, () => {
    console.log("Server running on Port: ", PORT);
})