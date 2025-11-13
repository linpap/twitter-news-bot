export const NEWS_SOURCES = [
  {
    name: 'Reuters',
    category: 'Current Affairs & Political',
    type: 'rss',
    url: 'https://www.reuters.com/rssfeed/worldNews',
    backup: 'https://www.reuters.com/world'
  },
  {
    name: 'TechCrunch',
    category: 'Technology',
    type: 'rss',
    url: 'https://techcrunch.com/feed/',
    backup: 'https://techcrunch.com/'
  },
  {
    name: 'MarketWatch',
    category: 'Stock Market',
    type: 'rss',
    url: 'https://www.marketwatch.com/rss/topstories',
    backup: 'https://www.marketwatch.com/'
  },
  {
    name: 'ESPN Football',
    category: 'Football/Soccer',
    type: 'rss',
    url: 'https://www.espn.com/espn/rss/soccer/news',
    backup: 'https://www.espn.com/soccer/'
  },
  {
    name: 'BBC News',
    category: 'General News',
    type: 'rss',
    url: 'http://feeds.bbci.co.uk/news/rss.xml',
    backup: 'https://www.bbc.com/news'
  }
];

export const TWITTER_CHAR_LIMIT = 280;
export const RESERVED_CHARS = 25; // For hashtags and links
export const MAX_CONTENT_LENGTH = TWITTER_CHAR_LIMIT - RESERVED_CHARS;
