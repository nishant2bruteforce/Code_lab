import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

function addMessage(msg, type = "normal") {
  const item = document.createElement("li");

  if (type === "system") {
    item.textContent = msg;
    item.classList.add("system");
  } else if (type === "chat") {
    const usernameSpan = document.createElement("span");
    usernameSpan.className = "username";
    usernameSpan.textContent = `${msg.username}:`;

    const messageText = document.createTextNode(` ${msg.message}`);

    item.appendChild(usernameSpan);
    item.appendChild(messageText);
  }

  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

// --- Socket Event Listeners ---
socket.on("connect", () => {
  console.log(`Connected to server with ID: ${socket.id}`);
});

socket.on("chat message", (data) => {
  addMessage(data, "chat");
});

socket.on("system message", (msg) => {
  addMessage(msg, "system");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});
