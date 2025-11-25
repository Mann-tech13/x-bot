import { COMMANDS } from "./constants/commands.js";
import getTweet from "./commands/get.js";
import { sendTelegramMessage } from "./services/telegram.js";

export default async function router(text, chatId, env) {    
  switch (text.toLowerCase()) {
    case COMMANDS.GET_TWEET:
      await getTweet(chatId, env);
      break;

    default:
      await sendTelegramMessage(env, chatId, "❓ Unknown command");
      break;
  }
  return new Response("ok");
}
