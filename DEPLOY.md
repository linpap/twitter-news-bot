# 🚀 Deploy to Vercel (24/7 Free Hosting)

Your code is already committed to git! Now let's push to GitHub and deploy to Vercel.

## Option A: Using GitHub Website (Easiest)

1. **Create GitHub Repository:**
   - Go to: https://github.com/new
   - Repository name: `twitter-news-bot`
   - Public/Private: Your choice
   - **Don't** initialize with README (we already have files)
   - Click "Create repository"

2. **Push Your Code:**
   Copy the commands GitHub shows under "push an existing repository":
   ```bash
   cd /Users/soumyajit/Desktop/Code/twitter
   git remote add origin https://github.com/YOUR_USERNAME/twitter-news-bot.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel:**
   - Go to: https://vercel.com/new
   - Click "Import Git Repository"
   - Select `twitter-news-bot`
   - Click "Import"
   - **IMPORTANT:** Add environment variables (see below)
   - Click "Deploy"

## Option B: Using GitHub CLI (Automated)

If GitHub CLI installed successfully, run:

```bash
cd /Users/soumyajit/Desktop/Code/twitter
gh auth login
gh repo create twitter-news-bot --public --source=. --push
```

Then deploy to Vercel (see step 3 above).

## 🔑 Environment Variables for Vercel

In Vercel dashboard, add these environment variables:

⚠️ **NEVER commit your actual credentials to Git!**

Copy these from your `.env` file or get them from:
- Twitter API: https://developer.twitter.com/en/portal/dashboard
- Supabase: https://supabase.com/dashboard → Project Settings → API

```
TWITTER_API_KEY=your_twitter_api_key_here
TWITTER_API_SECRET=your_twitter_api_secret_here
TWITTER_ACCESS_TOKEN=your_twitter_access_token_here
TWITTER_ACCESS_SECRET=your_twitter_access_secret_here
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
CRAWL_INTERVAL_MINUTES=30
POST_INTERVAL_MINUTES=15
CRON_SECRET=your_random_secret_string
```

## 📅 Vercel Cron Jobs (Automatic)

Vercel will automatically set up these cron jobs from `vercel.json`:
- `/api/crawl` - Every 30 minutes (fetch news)
- `/api/post` - Every 5 minutes (post tweets)

## ✅ Verify Deployment

After deployment:

1. **Check deployment logs** in Vercel dashboard
2. **Monitor your Twitter:** https://twitter.com/thearshs
3. **Check Supabase queue:** https://supabase.com/dashboard

## 🎯 Expected Behavior

- **First 30 minutes:** Bot crawls news sources, adds to queue
- **Every 5 minutes after:** Bot posts 1 tweet from queue
- **Result:** ~150 tweets per day, all automated!

## 🛑 Stop the Bot

To stop posting:
- Go to Vercel dashboard
- Pause the project
- Or delete the deployment

## 📊 Monitor Performance

- **Vercel Logs:** https://vercel.com/dashboard → Your Project → Logs
- **Twitter Profile:** https://twitter.com/thearshs
- **Supabase Database:** https://supabase.com/dashboard

---

**Need help?** Check the main README.md or QUICK_START.md
