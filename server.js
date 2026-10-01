const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Store rooms in memory
const rooms = {};

// Give the browser access to the public folder
app.use(express.static("public"));


// Generate a random room code
function generateRoomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        code += characters[randomIndex];
    }

    return code;
}


// A user connects
io.on("connection", (socket) => {

    console.log("Someone connected:", socket.id);


    // CREATE ROOM
    socket.on("createRoom", (name) => {

        let roomCode;

        // Make sure the code isn't already being used
        do {
            roomCode = generateRoomCode();
        } while (rooms[roomCode]);


        // Create the room
        rooms[roomCode] = {
            players: []
        };


        // Add the creator
        rooms[roomCode].players.push({
            id: socket.id,
            name: name || "Anonymous"
        });


        // Put the socket into the room
        socket.join(roomCode);

        // Remember which room they're in
        socket.roomCode = roomCode;


        // Tell the creator their room code
        socket.emit("roomCreated", {
            roomCode: roomCode,
            players: rooms[roomCode].players
        });


        console.log(`Room created: ${roomCode}`);
    });


    // JOIN ROOM
    socket.on("joinRoom", ({ roomCode, name }) => {

        roomCode = roomCode.toUpperCase();


        // Does the room exist?
        if (!rooms[roomCode]) {

            socket.emit("errorMessage", "Room does not exist.");

            return;
        }


        // Add player
        rooms[roomCode].players.push({
            id: socket.id,
            name: name || "Anonymous"
        });


        // Join the Socket.IO room
        socket.join(roomCode);

        socket.roomCode = roomCode;


        // Tell everyone in the room about the updated players
        io.to(roomCode).emit(
            "playersUpdated",
            rooms[roomCode].players
        );


        console.log(`${name} joined ${roomCode}`);
    });


    // DISCONNECT
    socket.on("disconnect", () => {

        console.log("Disconnected:", socket.id);


        const roomCode = socket.roomCode;

        if (!roomCode) {
            return;
        }


        const room = rooms[roomCode];

        if (!room) {
            return;
        }


        // Remove player
        room.players = room.players.filter(
            player => player.id !== socket.id
        );


        // If nobody is left, delete the room
        if (room.players.length === 0) {

            delete rooms[roomCode];

            console.log(`Room deleted: ${roomCode}`);

            return;
        }


        // Update everyone else
        io.to(roomCode).emit(
            "playersUpdated",
            room.players
        );
    });

});


server.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Server running on port ${PORT}`
    );

});