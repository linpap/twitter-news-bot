-- Run this in your Supabase SQL Editor
-- This creates the necessary tables for the Twitter news bot

-- Table to store the queue of articles to be posted
CREATE TABLE IF NOT EXISTS news_queue (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  original_url TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  category TEXT NOT NULL,
  rewritten_tweet TEXT NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  posted BOOLEAN DEFAULT FALSE,
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table to archive all posted news
CREATE TABLE IF NOT EXISTS posted_news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  original_url TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  category TEXT NOT NULL,
  rewritten_tweet TEXT NOT NULL,
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_news_queue_posted ON news_queue(posted, fetched_at);
CREATE INDEX IF NOT EXISTS idx_posted_news_url ON posted_news(original_url);
CREATE INDEX IF NOT EXISTS idx_posted_news_source ON posted_news(source);

-- Enable Row Level Security (optional, for security)
ALTER TABLE news_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE posted_news ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service access
CREATE POLICY "Allow service role full access to news_queue"
ON news_queue FOR ALL
USING (true);

CREATE POLICY "Allow service role full access to posted_news"
ON posted_news FOR ALL
USING (true);
