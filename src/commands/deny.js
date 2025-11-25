import { clearPending } from "../services/store.js";
import { sendTelegramMessage } from "../services/telegram.js";

export default async function deny(chatId, env) {
  await clearPending(env);
  await sendTelegramMessage(env, chatId, "✅ Tweet discarded");
  return new Response("ok");
}
