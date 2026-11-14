(function () {
  const CHAT_API = "http://localhost:8080/api/chat";

  const button = document.createElement("button");
  button.className = "chat-toggle";
  button.setAttribute("aria-label", "Open chatbot");
  button.innerHTML =
    '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">' +
    '<rect x="5" y="8" width="14" height="11" rx="3" fill="currentColor"/>' +
    '<circle cx="9.5" cy="13" r="1.5" fill="#1e3a5f"/>' +
    '<circle cx="14.5" cy="13" r="1.5" fill="#1e3a5f"/>' +
    '<rect x="11" y="3" width="2" height="4" fill="currentColor"/>' +
    '<circle cx="12" cy="3" r="1.5" fill="currentColor"/>' +
    "</svg>";

  const box = document.createElement("div");
  box.className = "chat-box";
  box.hidden = true;
  box.innerHTML =
    '<div class="chat-header"><strong>CodeStart Assistant</strong>' +
    '<button type="button" aria-label="Close chat">&times;</button></div>' +
    '<div class="chat-messages"><p class="chat-bot">Hi! Ask me about courses, fees, or batch timings.</p></div>' +
    '<form class="chat-form"><input type="text" placeholder="Type your question" required>' +
    '<button type="submit">Send</button></form>';

  document.body.appendChild(button);
  document.body.appendChild(box);

  const messages = box.querySelector(".chat-messages");
  const input = box.querySelector("input");

  button.addEventListener("click", () => { box.hidden = !box.hidden; });
  box.querySelector(".chat-header button").addEventListener("click", () => { box.hidden = true; });

  function addMessage(text, cssClass) {
    const p = document.createElement("p");
    p.className = cssClass;
    p.textContent = text;
    messages.appendChild(p);
    messages.scrollTop = messages.scrollHeight;
  }

  box.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage(question, "chat-user");
    input.value = "";

    try {
      const response = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });
      const data = await response.json();
      addMessage(data.reply, "chat-bot");
    } catch (error) {
      addMessage("I can't reach the server right now. Please call +91 70754 05512.", "chat-bot");
    }
  });
})();