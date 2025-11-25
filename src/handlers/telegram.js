import router from "../router.js";
import { sendTelegramMessage } from "../services/telegram.js";

export default async function telegramHandler(req, env) {
  const update = await req.json();
  const message = update.message;

  if (!message) return new Response("ok");

  const chatId = message.chat.id.toString();
  const text = message.text?.trim();  

  if (chatId !== env.TELEGRAM_ALLOWED_USER_ID) {
    await sendTelegramMessage(env, chatId, "❌ Access denied");
    return new Response("ok");
  }

  return await router(text, chatId, env);
}
