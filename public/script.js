const socket = io();


// =====================================
// VIEWS
// =====================================

const views = {
    home: document.getElementById("homeView"),
    lobby: document.getElementById("lobbyView"),
    question: document.getElementById("questionView"),
    voting: document.getElementById("votingView"),
    result: document.getElementById("resultView")
};


// =====================================
// ELEMENTS
// =====================================

const message = document.getElementById("message");

const nameInput = document.getElementById("nameInput");
const roomCodeInput = document.getElementById("roomCodeInput");

const createButton = document.getElementById("createButton");
const joinButton = document.getElementById("joinButton");

const roomCodeLabel = document.getElementById("roomCodeLabel");
const roomCodeBig = document.getElementById("roomCodeBig");
const copyButton = document.getElementById("copyButton");

const playersList = document.getElementById("playersList");
const playerCount = document.getElementById("playerCount");
const hostHint = document.getElementById("hostHint");
const startButton = document.getElementById("startButton");

const questionTitle = document.getElementById("questionTitle");
const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answerInput");
const submitAnswerButton =
    document.getElementById("submitAnswerButton");

const answerStatus = document.getElementById("answerStatus");
const answerProgress = document.getElementById("answerProgress");

const answersList = document.getElementById("answersList");
const voteProgress = document.getElementById("voteProgress");

const realQuestion = document.getElementById("realQuestion");
const imposterName = document.getElementById("imposterName");

const finalVotesList =
    document.getElementById("finalVotesList");

const playAgainButton =
    document.getElementById("playAgainButton");

const waitingForAgain =
    document.getElementById("waitingForAgain");

const leaveButton =
    document.getElementById("leaveButton");

const leaveDuringGameButton =
    document.getElementById("leaveDuringGameButton");

const leaveVotingButton =
    document.getElementById("leaveVotingButton");

const leaveAfterGameButton =
    document.getElementById("leaveAfterGameButton");


// =====================================
// STATE
// =====================================

let currentRoomCode = null;

let amHost = false;

let currentPlayers = [];

let hasSubmittedAnswer = false;

let hasVoted = false;


// =====================================
// SHOW A VIEW
// =====================================

function showView(viewName) {

    Object.values(views).forEach(view => {
        view.classList.add("hidden");
    });

    views[viewName].classList.remove("hidden");
}


// =====================================
// SHOW MESSAGE
// =====================================

function showMessage(text, isError = false) {

    message.textContent = text || "";

    message.classList.toggle(
        "error",
        isError
    );

    message.classList.toggle(
        "success",
        !isError && Boolean(text)
    );
}


// =====================================
// GET NAME
// =====================================

function getName() {

    return nameInput.value.trim();
}


// =====================================
// GET ROOM CODE
// =====================================

function getRoomCode() {

    return roomCodeInput
        .value
        .trim()
        .toUpperCase();
}


// =====================================
// UPDATE LOBBY
// =====================================

function updateLobby(state) {

    currentRoomCode = state.roomCode;

    currentPlayers = state.players;

    amHost = state.hostId === socket.id;


    roomCodeLabel.textContent =
        state.roomCode;

    roomCodeBig.textContent =
        state.roomCode;


    playerCount.textContent =
        `${state.players.length}/12`;


    playersList.innerHTML = "";


    state.players.forEach(player => {

        const li =
            document.createElement("li");


        const name =
            document.createElement("span");

        name.textContent =
            player.name;


        const role =
            document.createElement("span");

        role.className =
            "player-role";

        role.textContent =
            player.isHost
                ? "👑 Host"
                : "";


        li.append(
            name,
            role
        );


        playersList.appendChild(li);
    });


    // Only host sees Start Game
    startButton.classList.toggle(
        "hidden",
        !amHost
    );


    if (amHost) {

        if (state.players.length < 3) {

            hostHint.textContent =
                "You are the host. At least 3 players are needed.";

        } else {

            hostHint.textContent =
                "You are the host. Start when everyone is ready.";
        }

    } else {

        hostHint.textContent =
            "Waiting for the host to start the game.";
    }
}


// =====================================
// CREATE ROOM
// =====================================

createButton.addEventListener(
    "click",
    () => {

        const name =
            getName();


        if (!name) {

            showMessage(
                "Enter your name first.",
                true
            );

            return;
        }


        createButton.disabled = true;


        socket.emit(
            "createRoom",
            {
                name
            }
        );
    }
);


// =====================================
// JOIN ROOM
// =====================================

joinButton.addEventListener(
    "click",
    () => {

        const name =
            getName();

        const roomCode =
            getRoomCode();


        if (!name) {

            showMessage(
                "Enter your name first.",
                true
            );

            return;
        }


        if (
            !roomCode ||
            roomCode.length !== 6
        ) {

            showMessage(
                "Enter the 6-character room code.",
                true
            );

            return;
        }


        joinButton.disabled = true;


        socket.emit(
            "joinRoom",
            {
                roomCode,
                name
            }
        );
    }
);


// =====================================
// ROOM CODE INPUT
// =====================================

roomCodeInput.addEventListener(
    "input",
    () => {

        roomCodeInput.value =
            roomCodeInput.value
                .toUpperCase()
                .replace(
                    /[^A-Z0-9]/g,
                    ""
                );
    }
);


// =====================================
// ROOM CREATED
// =====================================

socket.on(
    "roomCreated",
    state => {

        createButton.disabled =
            false;

        joinButton.disabled =
            false;


        currentRoomCode =
            state.roomCode;


        updateLobby(
            state
        );


        showMessage(
            "Room created! Share the code with your friends."
        );


        showView(
            "lobby"
        );
    }
);


// =====================================
// ROOM STATE UPDATED
// =====================================

socket.on(
    "roomState",
    state => {

        currentRoomCode =
            state.roomCode;


        currentPlayers =
            state.players;


        updateLobby(
            state
        );


        // Only return to lobby
        // when the room is actually in lobby state.
        if (
            state.status === "lobby" &&
            currentRoomCode
        ) {

            showView(
                "lobby"
            );
        }
    }
);


// =====================================
// START GAME
// =====================================

startButton.addEventListener(
    "click",
    () => {

        socket.emit(
            "startGame"
        );
    }
);


// =====================================
// GAME STARTED
// =====================================

socket.on(
    "gameStarted",
    ({
        question,
        playerName
    }) => {

        hasSubmittedAnswer = false;

        hasVoted = false;


        questionTitle.textContent =
            `${playerName}, your secret question is:`;


        questionText.textContent =
            question;


        answerInput.value = "";

        answerInput.disabled = false;

        submitAnswerButton.disabled = false;


        answerStatus.classList.add(
            "hidden"
        );


        answerProgress.textContent =
            "0 players have submitted";


        showMessage("");


        showView(
            "question"
        );
    }
);


// =====================================
// ANSWER PROGRESS
// =====================================

socket.on(
    "answerProgress",
    ({
        submitted,
        total
    }) => {

        answerProgress.textContent =
            `${submitted} / ${total} players have submitted`;
    }
);


// =====================================
// SUBMIT ANSWER
// =====================================

submitAnswerButton.addEventListener(
    "click",
    () => {

        const answer =
            answerInput.value.trim();


        if (!answer) {

            showMessage(
                "Type an answer first.",
                true
            );

            return;
        }


        if (hasSubmittedAnswer) {
            return;
        }


        submitAnswerButton.disabled =
            true;


        socket.emit(
            "submitAnswer",
            {
                answer
            }
        );
    }
);


// =====================================
// ANSWER SUBMITTED
// =====================================

socket.on(
    "answerSubmitted",
    () => {

        hasSubmittedAnswer = true;


        answerInput.disabled =
            true;


        submitAnswerButton.disabled =
            true;


        answerStatus.classList.remove(
            "hidden"
        );


        showMessage(
            "Your answer has been submitted."
        );
    }
);


// =====================================
// ALL ANSWERS READY
// =====================================

socket.on(
    "answersReady",
    ({
        answers
    }) => {

        hasVoted = false;


        voteProgress.textContent =
            `0 / ${answers.length} players have voted`;


        renderAnswers(
            answers
        );


        showMessage(
            ""
        );


        showView(
            "voting"
        );
    }
);


// =====================================
// SHOW ALL ANSWERS
// =====================================

function renderAnswers(answers) {

    answersList.innerHTML = "";


    answers.forEach(player => {

        const card =
            document.createElement("div");

        card.className =
            "answer-card";


        // -------------------------
        // TOP
        // -------------------------

        const top =
            document.createElement("div");

        top.className =
            "answer-top";


        const name =
            document.createElement("strong");

        name.textContent =
            player.name;


        const voteCount =
            document.createElement("span");

        voteCount.className =
            "vote-count";

        voteCount.id =
            `votes-${player.id}`;

        voteCount.textContent =
            "0 votes";


        top.append(
            name,
            voteCount
        );


        // -------------------------
        // ANSWER
        // -------------------------

        const answer =
            document.createElement("p");

        answer.className =
            "player-answer";

        answer.textContent =
            player.answer;


        // -------------------------
        // VOTE BUTTON
        // -------------------------

        const voteButton =
            document.createElement("button");

        voteButton.className =
            "vote-button";


        if (player.id === socket.id) {

            voteButton.textContent =
                "That's You";

            voteButton.disabled =
                true;

        } else {

            voteButton.textContent =
                "Vote for this player";


            voteButton.addEventListener(
                "click",
                () => {

                    if (hasVoted) {
                        return;
                    }


                    socket.emit(
                        "voteFor",
                        {
                            playerId:
                                player.id
                        }
                    );
                }
            );
        }


        // -------------------------
        // ADD CARD
        // -------------------------

        card.append(
            top,
            answer,
            voteButton
        );


        answersList.appendChild(
            card
        );
    });
}


// =====================================
// VOTE SUBMITTED
// =====================================

socket.on(
    "voteSubmitted",
    () => {

        hasVoted = true;


        document
            .querySelectorAll(
                ".vote-button"
            )
            .forEach(button => {

                button.disabled = true;

            });


        showMessage(
            "Vote submitted!"
        );
    }
);


// =====================================
// VOTE UPDATE
// =====================================

socket.on(
    "voteUpdate",
    ({
        counts,
        votedCount,
        total
    }) => {

        voteProgress.textContent =
            `${votedCount} / ${total} players have voted`;


        Object.entries(
            counts
        ).forEach(
            ([playerId, count]) => {

                const element =
                    document.getElementById(
                        `votes-${playerId}`
                    );


                if (!element) {
                    return;
                }


                element.textContent =
                    count === 1
                        ? "1 vote"
                        : `${count} votes`;
            }
        );
    }
);


// =====================================
// GAME REVEALED
// =====================================

socket.on(
    "gameRevealed",
    ({
        realQuestion: revealedQuestion,
        imposterName: revealedImposter,
        imposterId,
        results
    }) => {

        realQuestion.textContent =
            revealedQuestion;


        imposterName.textContent =
            revealedImposter;


        // Imposter name is red
        imposterName.classList.add(
            "imposter-red"
        );


        renderFinalVotes(
            results,
            imposterId
        );


        playAgainButton.classList.toggle(
            "hidden",
            !amHost
        );


        if (amHost) {

            waitingForAgain.textContent =
                "You are the host. Start another round when ready.";

        } else {

            waitingForAgain.textContent =
                "Waiting for the host to start another round.";
        }


        showMessage("");


        showView(
            "result"
        );
    }
);


// =====================================
// FINAL VOTE RESULTS
// =====================================

function renderFinalVotes(results, imposterId) {

    finalVotesList.innerHTML = "";

    const sortedResults = [...results].sort(
        (a, b) => b.votes - a.votes
    );

    sortedResults.forEach(player => {

        const row = document.createElement("div");
        row.className = "final-vote-row";


        // -------------------------
        // NAME + VOTE COUNT
        // -------------------------

        const top = document.createElement("div");
        top.className = "final-vote-top";


        const name = document.createElement("div");
        name.className = "final-player-name";

        name.textContent = player.name;


        // Make the imposter's name RED
        if (player.id === imposterId) {
            name.classList.add("imposter-red");
        }


        const votes = document.createElement("div");
        votes.className = "final-vote-count";

        votes.textContent =
            player.votes === 1
                ? "1 vote"
                : `${player.votes} votes`;


        top.append(name, votes);


        // -------------------------
        // WHO VOTED FOR THEM
        // -------------------------

        const voters = document.createElement("div");
        voters.className = "voters";

        if (
            player.voters &&
            player.voters.length > 0
        ) {
            voters.textContent =
                `Voted: ${player.voters.join(", ")}`;
        } else {
            voters.textContent =
                "Voted: —";
        }


        // -------------------------
        // ADD TO SCREEN
        // -------------------------

        row.append(
            top,
            voters
        );

        finalVotesList.appendChild(row);
    });
}


// =====================================
// PLAY AGAIN
// =====================================

playAgainButton.addEventListener(
    "click",
    () => {

        socket.emit(
            "playAgain"
        );
    }
);


// =====================================
// BACK TO LOBBY
// =====================================

socket.on(
    "backToLobby",
    () => {

        hasSubmittedAnswer = false;

        hasVoted = false;


        answerInput.value = "";


        answerInput.disabled = false;

        submitAnswerButton.disabled = false;


        showMessage(
            "New round ready!"
        );


        showView(
            "lobby"
        );
    }
);


// =====================================
// COPY ROOM CODE
// =====================================

copyButton.addEventListener(
    "click",
    async () => {

        if (!currentRoomCode) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                currentRoomCode
            );


            showMessage(
                "Room code copied!"
            );


            setTimeout(
                () => {
                    showMessage("");
                },
                1500
            );

        } catch {

            showMessage(
                "Copy failed. Please copy the code manually.",
                true
            );
        }
    }
);


// =====================================
// LEAVE ROOM
// =====================================

function leaveRoom() {

    // Tell server to remove us
    socket.emit(
        "leaveRoom"
    );


    // Clear local game state
    currentRoomCode = null;

    currentPlayers = [];

    amHost = false;

    hasSubmittedAnswer = false;

    hasVoted = false;


    answerInput.value = "";

    answerInput.disabled = false;

    submitAnswerButton.disabled = false;


    // Re-enable home buttons
    createButton.disabled = false;

    joinButton.disabled = false;


    showMessage("");


    // Go back to home
    showView(
        "home"
    );
}


leaveButton.addEventListener(
    "click",
    leaveRoom
);


leaveDuringGameButton.addEventListener(
    "click",
    leaveRoom
);


leaveVotingButton.addEventListener(
    "click",
    leaveRoom
);


leaveAfterGameButton.addEventListener(
    "click",
    leaveRoom
);


// =====================================
// SOCKET CONNECTED
// =====================================

socket.on(
    "connect",
    () => {

        createButton.disabled = false;

        joinButton.disabled = false;
    }
);


// =====================================
// SOCKET DISCONNECTED
// =====================================

socket.on(
    "disconnect",
    () => {

        showMessage(
            "Connection lost. Refresh the page to reconnect.",
            true
        );
    }
);


// =====================================
// ERRORS FROM SERVER
// =====================================

socket.on(
    "errorMessage",
    text => {

        createButton.disabled = false;

        joinButton.disabled = false;

        submitAnswerButton.disabled = false;


        showMessage(
            text,
            true
        );
    }
);
