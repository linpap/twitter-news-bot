import { MAX_CONTENT_LENGTH } from './config.js';

// Simple rule-based rewriter (no API needed - FREE!)
export async function rewriteHeadline(article) {
  let headline = article.title;

  // Clean up common headline prefixes/suffixes
  headline = headline
    .replace(/^(BREAKING|UPDATE|EXCLUSIVE|LIVE|WATCH):\s*/i, '')
    .replace(/\s*-\s*(Reuters|BBC|TechCrunch|MarketWatch|ESPN).*$/i, '')
    .replace(/\s*\|\s*.+$/i, '') // Remove "| Source Name"
    .trim();

  // Remove extra whitespace
  headline = headline.replace(/\s+/g, ' ');

  // If it's too long, smart truncate
  if (headline.length > MAX_CONTENT_LENGTH) {
    // Try to truncate at sentence or word boundary
    let truncated = headline.substring(0, MAX_CONTENT_LENGTH - 3);

    // Find last complete word
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > MAX_CONTENT_LENGTH * 0.7) {
      truncated = truncated.substring(0, lastSpace);
    }

    headline = truncated + '...';
  }

  // Add source tag for context
  const sourceTag = {
    'Reuters': '📰',
    'TechCrunch': '💻',
    'MarketWatch': '📈',
    'ESPN Football': '⚽',
    'BBC News': '🌍'
  }[article.source] || '📌';

  // Only add emoji if it fits
  const withEmoji = `${sourceTag} ${headline}`;
  if (withEmoji.length <= MAX_CONTENT_LENGTH) {
    headline = withEmoji;
  }

  return headline;
}

export async function rewriteBatch(articles) {
  console.log(`\n=== Processing ${articles.length} Headlines (Free Mode) ===\n`);

  const rewritten = [];
  for (const article of articles) {
    console.log(`Processing: "${article.title.substring(0, 50)}..."`);
    const tweet = await rewriteHeadline(article);
    console.log(`✓ Result: "${tweet}"\n`);

    rewritten.push({
      ...article,
      tweet,
      tweetLength: tweet.length
    });
  }

  return rewritten;
}
