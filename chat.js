const OpenAI = require("openai");

const openai = new OpenAI({

});

async function askChatGPT(userInput) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: userInput }],
  });

  return completion.choices[0].message.content;
}

module.exports = { askChatGPT };
