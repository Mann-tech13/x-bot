import telegram from "./handlers/telegram.js";
import { handleError } from "./utils/error.js";

export default {
  async fetch(req, env) {
    try {      
      if (req.method === "POST") {
        return await telegram(req, env);
      }
      return new Response("✅ Bot is running");
    } catch (err) {
      return handleError(err);
    }
  }
};
