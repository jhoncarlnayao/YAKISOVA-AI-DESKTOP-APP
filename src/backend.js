 document.documentElement.setAttribute('data-theme', 'light');
    const inputBox = document.querySelector('.search');
    const welcomeTexts = document.getElementById('welcome-texts');
    const chatMessages = document.getElementById('chat-messages');

    inputBox.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && inputBox.value.trim() !== '') {
            const messageText = inputBox.value.trim();

            // Hide welcome texts
            welcomeTexts.style.display = 'none';

            // Show chat messages container
            chatMessages.style.display = 'flex';

            // Create and display user message
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

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate bot response
            setTimeout(() => {
                const botReply = document.createElement('div');
                botReply.style.alignSelf = 'flex-start';
                botReply.style.background = '#F1F0F0';
                botReply.style.padding = '10px 15px';
                botReply.style.borderRadius = '12px';
                botReply.style.maxWidth = '70%';
                botReply.style.wordWrap = 'break-word';
                botReply.textContent = getBotResponse(messageText);
                chatMessages.appendChild(botReply);

                // Scroll again after response
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 800);
        }
    });

// RESPONSES!!!!!
    function getBotResponse(input) {
        const lower = input.toLowerCase();
        if (lower.includes('crafting')) return 'You can craft a sword with 2 sticks and 2 planks!';
        if (lower.includes('ip')) return 'Our server IP is: play.yakisovaai.com';
        if (lower.includes('help')) return 'Sure! I can assist with crafting, commands, server info, and more.';
        if(lower.includes('hello there')) return 'Hello, how can I help you today?';
        return 'I’m not sure yet, but I’m learning more every day!';
    }