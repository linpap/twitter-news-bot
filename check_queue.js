import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function checkQueue() {
  console.log('\n📊 QUEUE STATUS CHECK');
  console.log('==========================================\n');

  // Check news_queue
  const { data: queued, error: qError } = await supabase
    .from('news_queue')
    .select('*')
    .eq('posted', false)
    .order('fetched_at', { ascending: true });

  // Check posted_news
  const { data: posted, error: pError } = await supabase
    .from('posted_news')
    .select('id');

  if (qError || pError) {
    console.error('Error:', qError || pError);
    return;
  }

  console.log(`📭 Unposted articles in queue: ${queued?.length || 0}`);
  console.log(`✓ Total articles posted: ${posted?.length || 0}\n`);

  if (queued && queued.length > 0) {
    console.log('📋 Next articles to be posted:\n');
    queued.slice(0, 5).forEach((article, i) => {
      console.log(`${i + 1}. [${article.source}] ${article.title.substring(0, 60)}...`);
      console.log(`   Queued: ${new Date(article.fetched_at).toLocaleString()}`);
      console.log(`   Tweet: ${article.rewritten_tweet}\n`);
    });

    if (queued.length > 5) {
      console.log(`   ... and ${queued.length - 5} more in queue\n`);
    }
  }

  // Calculate estimated time to clear queue
  const postInterval = parseInt(process.env.POST_INTERVAL_MINUTES) || 60;
  const hoursToComplete = Math.ceil((queued?.length || 0) * postInterval / 60);

  if (queued && queued.length > 0) {
    console.log(`⏱️  Estimated time to clear queue: ~${hoursToComplete} hours`);
    console.log(`   (Posting every ${postInterval} minutes)\n`);
  }

  console.log('==========================================\n');
}

checkQueue().then(() => process.exit(0));
