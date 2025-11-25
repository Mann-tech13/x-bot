export async function storePendingTweet(env, text) {
  return env.TWEET_STORE.put("pending_tweet", text);
}

export async function getPendingTweet(env) {
  return env.TWEET_STORE.get("pending_tweet");
}

export async function clearPending(env) {
  return env.TWEET_STORE.delete("pending_tweet");
}
