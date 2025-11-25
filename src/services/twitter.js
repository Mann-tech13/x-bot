// services/twitter.js

function percentEncode(str) {
  return encodeURIComponent(str)
    .replace(/[!*()']/g, char => "%" + char.charCodeAt(0).toString(16).toUpperCase());
}

async function hmacSha1(baseString, key) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const signingKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    signingKey,
    encoder.encode(baseString)
  );

  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

export async function postTweet(env, text) {
  const url = "https://api.twitter.com/1.1/statuses/update.json";
  const method = "POST";

  const oauth = {
    oauth_consumer_key: env.TWITTER_API_KEY,
    oauth_token: env.TWITTER_ACCESS_TOKEN,
    oauth_nonce: crypto.randomUUID().replace(/-/g, ""),
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_signature_method: "HMAC-SHA1",
    oauth_version: "1.0"
  };

  const params = {
    status: text,
    ...oauth
  };

  // 1. Create parameter string
  const paramString = Object.keys(params)
    .sort()
    .map(key => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join("&");

  // 2. Create signature base string
  const baseString = [
    method,
    percentEncode(url),
    percentEncode(paramString)
  ].join("&");

  // 3. Create signing key
  const signingKey = `${percentEncode(env.TWITTER_API_SECRET)}&${percentEncode(env.TWITTER_ACCESS_TOKEN_SECRET)}`;

  // 4. Sign request
  const signature = await hmacSha1(baseString, signingKey);

  oauth.oauth_signature = signature;

  // Build Authorization header
  const authHeader =
    "OAuth " +
    Object.keys(oauth)
      .sort()
      .map(key => `${percentEncode(key)}="${percentEncode(oauth[key])}"`)
      .join(", ");

  // Twitter requires form-encoded body
  const body = new URLSearchParams({ status: text });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString()
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Twitter Error:", result);
    throw new Error("Twitter post failed");
  }

  return result;
}
