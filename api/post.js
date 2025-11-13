// Vercel Serverless Function for posting
import { postFromQueue } from '../src/post.js';

export default async function handler(req, res) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.authorization;

  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await postFromQueue();
    res.status(200).json({
      success: true,
      message: 'Post completed',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Post API error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
