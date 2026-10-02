document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm');
    const authorInput = document.getElementById('authorInput');
    const messageInput = document.getElementById('messageInput');
    const messagesList = document.getElementById('messagesList');

    // Cargar mensajes guardados al iniciar
    loadMessages();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const author = authorInput.value.trim();
        const text = messageInput.value.trim();

        if (author && text) {
            const newMessage = { author, text };
            saveMessage(newMessage);
            renderMessage(newMessage);

            // Limpiar formulario
            authorInput.value = '';
            messageInput.value = '';
        }
    });

    function saveMessage(message) {
        const messages = JSON.parse(localStorage.getItem('birthday_messages')) || [];
        messages.push(message);
        localStorage.setItem('birthday_messages', JSON.stringify(messages));
    }

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('birthday_messages')) || [];
        messages.forEach(renderMessage);
    }

    function renderMessage({ author, text }) {
        const div = document.createElement('div');
        div.className = 'message-item';
        div.innerHTML = `
            <strong>${escapeHTML(author)}</strong>
            <p>${escapeHTML(text)}</p>
        `;
        messagesList.prepend(div);
    }

    // Evita inyección de código malicioso en los textos
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});