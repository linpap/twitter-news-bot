# ⚡ Quick Start Guide

Get your Twitter news bot running in 10 minutes!

## 📝 Checklist

### 1. Database Setup (2 minutes)

```bash
# 1. Go to Supabase
open https://supabase.com/dashboard

# 2. Select your project (hpghkusuekkjmpiiszpt)
# 3. Click "SQL Editor" in sidebar
# 4. Copy contents of database_setup.sql
# 5. Paste and click "Run"
```

✅ Done! Tables created.

### 2. Twitter API (5 minutes)

See detailed guide: [TWITTER_API_SETUP.md](./TWITTER_API_SETUP.md)

**Quick version:**
1. Go to https://developer.twitter.com/en/portal/dashboard
2. Sign up → Create Project → Create App
3. Generate API Keys (copy immediately!)
4. Generate Access Token & Secret
5. Set permissions to "Read and Write"
6. Add to `.env` file

### 3. Claude API (2 minutes)

```bash
# 1. Go to Claude Console
open https://console.anthropic.com/

# 2. Sign up / Log in
# 3. Go to "API Keys"
# 4. Click "Create Key"
# 5. Copy the key (starts with sk-ant-)
# 6. Add to .env as ANTHROPIC_API_KEY
```

### 4. Configure .env (1 minute)

```bash
cd /Users/soumyajit/Desktop/Code/twitter
nano .env  # or open with any editor
```

Fill in:
```env
TWITTER_API_KEY=your_key_here
TWITTER_API_SECRET=your_secret_here
TWITTER_ACCESS_TOKEN=your_token_here
TWITTER_ACCESS_SECRET=your_token_secret_here
ANTHROPIC_API_KEY=sk-ant-your_key_here
```

Save and close.

### 5. Test Run (1 minute)

```bash
# Test crawling (fetch headlines)
npm run crawl

# If successful, start the bot
npm run dev
```

You should see:
```
🔍 CRAWL JOB STARTED
Fetching from Reuters...
✓ Fetched 5 articles from Reuters
...
✓ Added 25 articles to posting queue
```

## 🚀 Deploy to Vercel (5 minutes)

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

### Option B: Using GitHub + Vercel Website

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
gh repo create twitter-news-bot --public --source=. --push

# 2. Go to Vercel
open https://vercel.com

# 3. Click "Import Project"
# 4. Select your GitHub repo
# 5. Add environment variables (same as .env)
# 6. Click "Deploy"
```

## ✅ Verification

### Check if bot is working:

```bash
# 1. Check Twitter
open https://twitter.com/your_username

# 2. Check Supabase (see queue)
open https://supabase.com/dashboard

# 3. Check logs locally
npm run dev  # Watch console output

# 4. Check Vercel logs (after deployment)
vercel logs --follow
```

## 📊 Expected Behavior

**Every 30 minutes:**
- Crawls 5 news sites
- Fetches ~25 headlines
- Rewrites with Claude AI
- Adds to queue

**Every 5 minutes:**
- Posts 1 tweet from queue
- Archives in database
- Marks as posted

**Result:** ~150 tweets per day, all automated! 🎉

## 🐛 Troubleshooting

**Problem: "Twitter authentication failed"**
```bash
# Solution: Check credentials
cat .env | grep TWITTER
# Make sure app has "Read and Write" permissions
```

**Problem: "No articles in queue"**
```bash
# Solution: Run crawl manually
npm run crawl
# Then check Supabase → news_queue table
```

**Problem: "Claude API error"**
```bash
# Solution: Verify Claude API key
echo $ANTHROPIC_API_KEY
# Should start with sk-ant-
# Get new key at https://console.anthropic.com/
```

## 🎯 Next Steps

Once running:

1. **Monitor Performance**
   - Watch Twitter for posts
   - Check Supabase for errors
   - Monitor Claude API usage

2. **Customize**
   - Edit `src/config.js` for different news sources
   - Adjust intervals in `.env`
   - Modify tweet format in `src/rewriter.js`

3. **Scale**
   - Apply for Twitter Elevated access (300 tweets/3hrs)
   - Add more news categories
   - Enable images in tweets

## 📞 Support

- Check [README.md](./README.md) for full documentation
- See [TWITTER_API_SETUP.md](./TWITTER_API_SETUP.md) for detailed Twitter setup
- View [database_setup.sql](./database_setup.sql) for database schema

---

**Ready?** Let's go! 🚀

```bash
npm run dev
```
