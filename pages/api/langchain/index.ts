import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

export default async function handle() {
  const llm = new OpenAI({ temperature: 0.9 });

  const prompt = new PromptTemplate({
    inputVariables: ["product"],
    template: "{product}を作る日本語の新会社名をを1つ提案してください",

  });

  const prompt1 = PromptTemplate.fromTemplate(
    `You are a naming consultant for new companies.
  What is a good name for a company that makes {product}?`
  );
  const formattedPrompt = await prompt1.format({
    product: "colorful socks",
  });
  console.log("🚀 ~ file: index.ts:21 ~ handle ~ formattedPrompt:", formattedPrompt)

  const chain = new LLMChain({ llm: llm, prompt });

  // チェーンの実行
  const res = await chain.call({ product: "家庭用ロボット" });
  console.log("🚀 ~ file: index.ts:27 ~ handle ~ res:", res)
}
// export default async function handle() {
//   const template = "{product}を作る日本語の新会社名をを1つ提案してください";
//   const prompt = new PromptTemplate({
//     template: template,
//     inputVariables: ["product"],
//   });

//   const model = new OpenAI({
//     openAIApiKey: process.env.OPENAI_API_KEY,
//     temperature: 0.8,
//   });

//   const result = prompt.format({ product: "家庭用ロボット" });

//   console.log("🚀 ~ file: index.ts:12 ~ handle ~ result:", result);

//   result.then(async (res) => {
//     console.log("🚀 ~ file: index.ts:17 ~ handle ~ res:", res);
//     const aaa = await model.call(res);
//     console.log("🚀 ~ file: index.ts:23 ~ result.then ~ aaa:", aaa);

//     return;
//   });
// }

const snippet = `
require("dotenv").config();

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export const runChat = async () => {
  const chat = new ChatOpenAI({ temperature: 0 });

  const res = await chat.call([
    new HumanChatMessage(
      "こんにちは"
    ),
  ]);  
  console.log(res);
};

runChat();
`;
console.log("🚀 ~ file: index.ts:73 ~ snippet:", snippet)
