/* ========== CONFIG ========== */
const API_KEY = "groq_API_KEY";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

/* ========== ELEMENTS ========== */
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");

/* ========== THEME ========== */
function toggleTheme() {
  const theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = theme;
}

/* ========== CHAT ========== */
sendBtn.onclick = sendMessage;

input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function addMessage(text, role) {
  welcome.style.display = "none";
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  sendBtn.disabled = true;

  const typing = addMessage("AI is thinking...", "ai");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await res.json();
    typing.textContent = data.choices[0].message.content;
  } catch {
    typing.textContent = "Error getting response.";
  }

  sendBtn.disabled = false;
}

function newChat() {
  messages.innerHTML = "";
  messages.appendChild(welcome);
  welcome.style.display = "block";
}



const titleText = "Hi, I’m WALL-E AI 👋";
const subtitleText =
  "I’m a basic chatbot designed to help with coding, writing, and general questions.";

const titleEl = document.getElementById("welcome-title");
const subtitleEl = document.getElementById("welcome-subtitle");

let i = 0;

function typeTitle() {
  if (i < titleText.length) {
    titleEl.textContent += titleText.charAt(i);
    i++;
    setTimeout(typeTitle, 70);
  } else {
    setTimeout(() => {
      subtitleEl.textContent = subtitleText;
    }, 500);
  }
}

typeTitle();


