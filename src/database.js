import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function initDatabase() {
  // Create table if not exists (run this once)
  const { error } = await supabase.rpc('create_news_table', {});
  if (error && !error.message.includes('already exists')) {
    console.error('Database init error:', error);
  }
}

export async function saveArticle(article) {
  const { data, error } = await supabase
    .from('posted_news')
    .insert([{
      title: article.title,
      original_url: article.link,
      source: article.source,
      category: article.category,
      rewritten_tweet: article.tweet,
      posted_at: new Date().toISOString()
    }]);

  if (error) {
    console.error('Error saving article:', error);
    return false;
  }
  return true;
}

export async function isArticlePosted(url) {
  // Check both posted_news AND news_queue to avoid duplicates
  const { data: posted } = await supabase
    .from('posted_news')
    .select('id')
    .eq('original_url', url)
    .single();

  if (posted) return true;

  const { data: queued } = await supabase
    .from('news_queue')
    .select('id')
    .eq('original_url', url)
    .single();

  return queued !== null;
}

export async function getQueuedArticles(limit = 6) {
  const { data, error } = await supabase
    .from('news_queue')
    .select('*')
    .eq('posted', false)
    .order('fetched_at', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error getting queued articles:', error);
    return [];
  }
  return data || [];
}

export async function addToQueue(article) {
  const { data, error } = await supabase
    .from('news_queue')
    .insert([{
      title: article.title,
      original_url: article.link,
      source: article.source,
      category: article.category,
      rewritten_tweet: article.tweet,
      fetched_at: new Date().toISOString(),
      posted: false
    }]);

  if (error) {
    console.error('Error adding to queue:', error);
    return false;
  }
  return true;
}

export async function markAsPosted(id) {
  const { error } = await supabase
    .from('news_queue')
    .update({ posted: true, posted_at: new Date().toISOString() })
    .eq('id', id);

  return !error;
}

export default supabase;
