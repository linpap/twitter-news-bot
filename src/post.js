import { getQueuedArticles, markAsPosted, saveArticle } from './database.js';
import { initTwitter, postTweet } from './twitter.js';

export async function postFromQueue() {
  console.log('\n📢 POST JOB STARTED:', new Date().toISOString());
  console.log('==========================================\n');

  try {
    // Initialize Twitter client
    const twitter = initTwitter();
    if (!twitter) {
      console.error('❌ Twitter client initialization failed');
      return;
    }

    // Get 1 article from queue (posts every 5 minutes)
    const articles = await getQueuedArticles(1);

    if (articles.length === 0) {
      console.log('📭 Queue is empty. Nothing to post.\n');
      return;
    }

    const article = articles[0];

    console.log(`\n📝 Posting article from ${article.source}:`);
    console.log(`   Title: ${article.title.substring(0, 60)}...`);
    console.log(`   Tweet: ${article.rewritten_tweet}`);
    console.log(`   Link: ${article.original_url}\n`);

    // Post to Twitter
    const result = await postTweet({
      tweet: article.rewritten_tweet,
      link: article.original_url
    });

    if (result.success) {
      // Mark as posted in queue
      await markAsPosted(article.id);

      // Save to posted_news archive
      await saveArticle({
        title: article.title,
        link: article.original_url,
        source: article.source,
        category: article.category,
        tweet: article.rewritten_tweet
      });

      console.log(`✓ Successfully posted and archived`);
      console.log(`✓ Tweet ID: ${result.tweetId}\n`);
    } else {
      console.error(`❌ Failed to post: ${result.error}\n`);
    }

    console.log(`✓ POST JOB COMPLETED\n`);

  } catch (error) {
    console.error('❌ Post job error:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await postFromQueue();
  process.exit(0);
}
