import { generateTweet } from "../services/gemini.js";
import { storePendingTweet } from "../services/store.js";
import { sendTelegramMessage } from "../services/telegram.js";

export default async function getTweet(chatId, env) {
  const tweet = await generateTweet(env);
  // await storePendingTweet(env, tweet);
  await sendTelegramMessage(
    env,
    chatId,
    tweet
  );  
  return new Response("ok");
}
