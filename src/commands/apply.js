import { getPendingTweet, clearPending } from "../services/store.js";
import { sendTelegramMessage } from "../services/telegram.js";
import { postTweet } from "../services/twitter.js";

export default async function apply(chatId, env) {
  const pending = await getPendingTweet(env);
  if (!pending) {
    await sendTelegramMessage(env, chatId, "❌ No tweet pending");
    return new Response("ok");
  }
  await postTweet(env, pending);
  await clearPending(env);
  await sendTelegramMessage(env, chatId, "🚀 Tweet posted successfully!");
  return new Response("ok");
}
