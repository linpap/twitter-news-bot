// Vercel Serverless Function for crawling
import { crawlAndQueue } from '../src/crawl.js';

export default async function handler(req, res) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.authorization;

  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await crawlAndQueue();
    res.status(200).json({
      success: true,
      message: 'Crawl completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Crawl API error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
