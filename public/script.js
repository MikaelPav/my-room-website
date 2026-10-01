const socket = io();


// HTML elements

const createRoomButton =
    document.getElementById("createRoom");

const joinRoomButton =
    document.getElementById("joinRoom");

const roomCodeInput =
    document.getElementById("roomCode");

const nameInput =
    document.getElementById("name");

const home =
    document.getElementById("home");

const room =
    document.getElementById("room");

const displayCode =
    document.getElementById("displayCode");

const bigCode =
    document.getElementById("bigCode");

const playersList =
    document.getElementById("players");

const message =
    document.getElementById("message");


// CREATE ROOM

createRoomButton.addEventListener("click", () => {

    const name = nameInput.value.trim();

    socket.emit("createRoom", name);
});


// JOIN ROOM

joinRoomButton.addEventListener("click", () => {

    const roomCode =
        roomCodeInput.value.trim();

    const name =
        nameInput.value.trim();


    if (!roomCode) {

        message.textContent =
            "Please enter a room code.";

        return;
    }


    socket.emit("joinRoom", {
        roomCode: roomCode,
        name: name
    });
});


// ROOM CREATED

socket.on("roomCreated", (data) => {

    showRoom(data.roomCode);

    updatePlayers(data.players);
});


// PLAYERS UPDATED

socket.on("playersUpdated", (players) => {

    updatePlayers(players);
});


// ERROR

socket.on("errorMessage", (error) => {

    message.textContent = error;
});


// SHOW ROOM

function showRoom(roomCode) {

    home.classList.add("hidden");

    room.classList.remove("hidden");

    displayCode.textContent = roomCode;

    bigCode.textContent = roomCode;
}


// UPDATE PLAYER LIST

function updatePlayers(players) {

    playersList.innerHTML = "";


    players.forEach(player => {

        const li =
            document.createElement("li");

        li.textContent =
            "🟢 " + player.name;

        playersList.appendChild(li);
    });
}