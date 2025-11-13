import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

let twitterClient;

export function initTwitter() {
  if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_ACCESS_TOKEN) {
    console.error('Twitter credentials not found in .env file');
    return null;
  }

  twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });

  return twitterClient;
}

export async function postTweet(article) {
  try {
    if (!twitterClient) {
      throw new Error('Twitter client not initialized');
    }

    // Format the tweet: [Rewritten headline] + [Link]
    const tweetText = `${article.tweet}\n\n🔗 ${article.link}`;

    const result = await twitterClient.v2.tweet(tweetText);

    console.log(`✓ Posted tweet (ID: ${result.data.id})`);
    return { success: true, tweetId: result.data.id };
  } catch (error) {
    console.error('Error posting tweet:', error.message);
    return { success: false, error: error.message };
  }
}

export async function verifyCredentials() {
  try {
    if (!twitterClient) {
      initTwitter();
    }

    const user = await twitterClient.v2.me();
    console.log(`✓ Twitter authenticated as: @${user.data.username}`);
    return true;
  } catch (error) {
    console.error('Twitter authentication failed:', error.message);
    return false;
  }
}
