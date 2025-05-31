const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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", // ⚠️ Do not expose this in production
});

async function askChatGPT(userInput) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: userInput }],
  });

  return completion.choices[0].message.content;
}

module.exports = { askChatGPT };
