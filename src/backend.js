document.documentElement.setAttribute('data-theme', 'light');
const inputBox = document.querySelector('.search');
const welcomeTexts = document.getElementById('welcome-texts');
const chatMessages = document.getElementById('chat-messages');

inputBox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && inputBox.value.trim() !== '') {
        const messageText = inputBox.value.trim();

        welcomeTexts.style.display = 'none';
        chatMessages.style.display = 'flex';

        const userMessage = document.createElement('div');
        userMessage.style.alignSelf = 'flex-end';
        userMessage.style.background = '#DCF8C6';
        userMessage.style.padding = '10px 15px';
        userMessage.style.borderRadius = '12px';
        userMessage.style.maxWidth = '70%';
        userMessage.style.wordWrap = 'break-word';
        userMessage.textContent = messageText;
        chatMessages.appendChild(userMessage);

        inputBox.value = '';
        chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });

        const thinkingMessage = document.createElement('div');
        thinkingMessage.style.alignSelf = 'flex-start';
        thinkingMessage.style.background = '#F1F0F0';
        thinkingMessage.style.padding = '10px 15px';
        thinkingMessage.style.borderRadius = '12px';
        thinkingMessage.style.maxWidth = '70%';
        thinkingMessage.style.wordWrap = 'break-word';
        thinkingMessage.textContent = 'Thinking...';
        chatMessages.appendChild(thinkingMessage);
        chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });

        setTimeout(() => {
            chatMessages.removeChild(thinkingMessage);

            const botReply = document.createElement('div');
            botReply.style.alignSelf = 'flex-start';
            botReply.style.background = '#F1F0F0';
            botReply.style.padding = '10px 15px';
            botReply.style.borderRadius = '12px';
            botReply.style.maxWidth = '70%';
            botReply.style.wordWrap = 'break-word';

            const response = getBotResponse(messageText);

            if (isValidImageUrl(response)) {
                const img = document.createElement('img');
                img.src = response;
                img.style.maxWidth = '500px';
                img.style.maxHeight = '500px';
                img.style.borderRadius = '10px';
                img.alt = 'Bot image response';
                botReply.appendChild(img);
            } else {
                botReply.textContent = response;
            }

            chatMessages.appendChild(botReply);
            chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
        }, 1500);
    }
});

function isValidImageUrl(url) {
    return (typeof url === 'string') && (url.match(/\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i) !== null);
}


function getBotResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes('crafting')) return 'You can craft a sword with 2 sticks and 2 planks!';
    if (lower.includes('ip')) return 'Our server IP is: play.yakisovaai.com';
    if (lower.includes('help')) return 'Sure! I can assist with crafting, commands, server info, and more.';
    if (lower.includes('hello there')) return 'Hello, how can I help you today?';
    if (lower.includes('how to craft a sword') || lower.includes('how to make a sword')) {
        return 'https://static.beebom.com/wp-content/uploads/2023/01/crafting-Recipe-of-Diamond-Sword.jpg?w=640';
    }
    return 'I’m not sure yet, but I’m learning more every day!';
}
