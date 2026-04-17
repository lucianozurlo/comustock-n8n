// ─── Markdown mínimo: convierte [texto](url) en <a> clickeable ───────────

function renderMarkdown(text) {
  const div = document.createElement("div");

  // Escapar HTML base
  let safe = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // [texto](url) → <a href="url" target="_blank">texto</a>
  safe = safe.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // URLs crudas sueltas → mostrar solo el hostname como texto
  safe = safe.replace(
    /(?<!\()(https?:\/\/[^\s<"&]+)/g,
    (url) => {
      try { return new URL(url).hostname; }
      catch { return ""; }
    }
  );

  // Saltos de línea → <br>
  safe = safe.replace(/\n/g, "<br>");

  div.innerHTML = safe;
  return div;
}

// ─── Comunicación con n8n ─────────────────────────────────────────────────

async function showTypingAndReply(userText) {
  isAwaitingResponse = true;
  toggleSendState();

  const typingRow = appendMessage("assistant", "", { typing: true });

  try {
    const resp = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userText }),
    });

    const raw = await resp.text();

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status} - ${raw || "sin body"}`);
    }

    if (!raw.trim()) {
      throw new Error("n8n respondió 200 pero con body vacío");
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(`La respuesta no es JSON: ${raw}`);
    }

    const result = Array.isArray(data) ? data[0] : data;
    const replyText =
      result.reply || result.output || result.text || result.response || "Sin respuesta.";

    typingRow.remove();

    // Crear fila con contenido renderizado (markdown → HTML)
    const row = document.createElement("div");
    row.className = "message-row assistant";
    const bubble = document.createElement("div");
    bubble.className = "message-bubble";
    bubble.appendChild(renderMarkdown(replyText));
    row.appendChild(bubble);
    messages.appendChild(row);
    scrollToBottom();

  } catch (err) {
    console.error("Error real contra n8n:", err);
    typingRow.remove();
    appendMessage("assistant", `Error conectando con n8n: ${err.message}`);
  }

  saveMessages();
  isAwaitingResponse = false;
  isLockedUntilReplyFinishes = false;
  toggleSendState();
}
