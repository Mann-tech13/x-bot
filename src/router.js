import { COMMANDS } from "./constants/commands.js";
import getTweet from "./commands/get.js";
import apply from "./commands/apply.js";
import deny from "./commands/deny.js";
import { sendTelegramMessage } from "./services/telegram.js";

export default async function router(text, chatId, env) {    
  switch (text.toLowerCase()) {
    case COMMANDS.GET_TWEET:
      await getTweet(chatId, env);
      break;

    // case COMMANDS.APPLY:
    //   await apply(chatId, env);
    //   break;

    // case COMMANDS.DENY:
    //   await deny(chatId, env);
    //   break;

    default:
      await sendTelegramMessage(env, chatId, "❓ Unknown command");
      break;
  }
  return new Response("ok");
}
