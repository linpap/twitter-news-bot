import Parser from 'rss-parser';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { NEWS_SOURCES } from './config.js';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
});

export async function fetchFromRSS(source) {
  try {
    console.log(`Fetching from ${source.name}...`);
    const feed = await parser.parseURL(source.url);

    const articles = feed.items.slice(0, 5).map(item => ({
      title: item.title,
      link: item.link,
      source: source.name,
      category: source.category,
      pubDate: item.pubDate || new Date().toISOString()
    }));

    console.log(`✓ Fetched ${articles.length} articles from ${source.name}`);
    return articles;
  } catch (error) {
    console.error(`✗ Error fetching from ${source.name}:`, error.message);
    return [];
  }
}

export async function fetchFromWebsite(source) {
  try {
    console.log(`Scraping ${source.name}...`);
    const response = await axios.get(source.backup, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const articles = [];

    // Generic scraping - adjust selectors based on actual site structure
    $('article, .story, .headline').slice(0, 5).each((i, elem) => {
      const title = $(elem).find('h1, h2, h3, a').first().text().trim();
      const link = $(elem).find('a').first().attr('href');

      if (title && link) {
        articles.push({
          title,
          link: link.startsWith('http') ? link : `${new URL(source.backup).origin}${link}`,
          source: source.name,
          category: source.category,
          pubDate: new Date().toISOString()
        });
      }
    });

    console.log(`✓ Scraped ${articles.length} articles from ${source.name}`);
    return articles;
  } catch (error) {
    console.error(`✗ Error scraping ${source.name}:`, error.message);
    return [];
  }
}

export async function fetchAllNews() {
  console.log('\n=== Starting News Crawl ===\n');
  const allArticles = [];

  for (const source of NEWS_SOURCES) {
    let articles = [];

    if (source.type === 'rss') {
      articles = await fetchFromRSS(source);

      // Fallback to scraping if RSS fails
      if (articles.length === 0) {
        console.log(`Trying backup scraping for ${source.name}...`);
        articles = await fetchFromWebsite(source);
      }
    } else {
      articles = await fetchFromWebsite(source);
    }

    allArticles.push(...articles);
  }

  console.log(`\n✓ Total articles fetched: ${allArticles.length}\n`);
  return allArticles;
}
