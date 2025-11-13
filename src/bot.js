import cron from 'node-cron';
import { crawlAndQueue } from './crawl.js';
import { postFromQueue } from './post.js';
import { verifyCredentials } from './twitter.js';
import dotenv from 'dotenv';

dotenv.config();

console.log(`
╔═══════════════════════════════════════════╗
║   🤖 TWITTER NEWS BOT STARTING...         ║
╚═══════════════════════════════════════════╝
`);

async function startBot() {
  // Verify Twitter credentials
  console.log('\n🔐 Verifying Twitter credentials...');
  const isAuthenticated = await verifyCredentials();

  if (!isAuthenticated) {
    console.error('\n❌ Twitter authentication failed. Please check your credentials in .env\n');
    process.exit(1);
  }

  console.log('\n✓ Bot initialized successfully!\n');
  console.log('📅 Schedule:');
  console.log(`   • Crawl news: Every ${process.env.CRAWL_INTERVAL_MINUTES || 30} minutes`);
  console.log(`   • Post tweets: Every ${process.env.POST_INTERVAL_MINUTES || 5} minutes\n`);

  // Crawl job: Every 30 minutes
  cron.schedule(`*/${process.env.CRAWL_INTERVAL_MINUTES || 30} * * * *`, async () => {
    await crawlAndQueue();
  });

  // Post job: Every 5 minutes
  cron.schedule(`*/${process.env.POST_INTERVAL_MINUTES || 5} * * * *`, async () => {
    await postFromQueue();
  });

  // Run initial crawl immediately
  console.log('🚀 Running initial crawl...\n');
  await crawlAndQueue();

  console.log('\n✓ Bot is now running. Press Ctrl+C to stop.\n');
}

startBot().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
