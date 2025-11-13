import { fetchAllNews } from './fetcher.js';
import { rewriteBatch } from './rewriter.js';
import { addToQueue, isArticlePosted } from './database.js';

export async function crawlAndQueue() {
  console.log('\n🔍 CRAWL JOB STARTED:', new Date().toISOString());
  console.log('==========================================\n');

  try {
    // 1. Fetch news from all sources
    const articles = await fetchAllNews();

    if (articles.length === 0) {
      console.log('⚠ No articles fetched. Exiting.\n');
      return;
    }

    // 2. Filter out already posted articles
    const newArticles = [];
    for (const article of articles) {
      const alreadyPosted = await isArticlePosted(article.link);
      if (!alreadyPosted) {
        newArticles.push(article);
      }
    }

    console.log(`\n📝 New articles to process: ${newArticles.length}/${articles.length}\n`);

    if (newArticles.length === 0) {
      console.log('✓ All articles already processed. Nothing to add.\n');
      return;
    }

    // 3. Rewrite headlines with Claude
    const rewritten = await rewriteBatch(newArticles);

    // 4. Add to queue for posting
    let addedCount = 0;
    for (const article of rewritten) {
      const success = await addToQueue(article);
      if (success) addedCount++;
    }

    console.log(`\n✓ Added ${addedCount} articles to posting queue`);
    console.log(`✓ CRAWL JOB COMPLETED\n`);

  } catch (error) {
    console.error('❌ Crawl job error:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  await crawlAndQueue();
  process.exit(0);
}
