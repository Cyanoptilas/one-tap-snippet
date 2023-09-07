import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Configuration, OpenAIApi } = require("openai");
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: req.body.text,
        },
      ],
    });

    if (
      !response ||
      !response.data.choices ||
      response.data.choices.length === 0
    ) {
      return res
        .status(500)
        .json({ error: "Failed to get a valid response from OpenAI" });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
}
