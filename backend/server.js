import express from "express";
import http from "http";
import { io } from 'socket.io-client';

const app = express();
const server = http.createServer(app);
const PORT = 5001;

app.get("/", (req, res) => {
    res.send('<p>"Hello"</p>');
})

server.listen(PORT, () => {
    console.log("Server running on Port: ", PORT);
})