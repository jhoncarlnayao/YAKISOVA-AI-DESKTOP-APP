import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));