# 🤖 Twitter News Bot

Automated Twitter bot that fetches headlines from 5 news sources, rewrites them using Claude AI, and posts them to Twitter every 5 minutes.

## 📰 News Sources

1. **Reuters** - Current Affairs & Political News
2. **TechCrunch** - Technology News
3. **MarketWatch** - Stock Market & Finance
4. **ESPN** - Football/Soccer News
5. **BBC News** - General World News

## 🚀 Features

- ✅ Fetches headlines from 5 major news sources every 30 minutes
- ✅ Rewrites headlines using Claude AI (optimized for Twitter)
- ✅ Posts to Twitter every 5 minutes (6 tweets per 30-minute cycle)
- ✅ Deduplication - never posts the same article twice
- ✅ Queue system - manages posting intervals smoothly
- ✅ Database tracking with Supabase
- ✅ Vercel deployment with cron jobs
- ✅ GitHub integration ready

## 📋 Setup Instructions

### 1. Twitter API Credentials

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new App (or use existing)
3. Generate API Keys:
   - API Key (Consumer Key)
   - API Secret (Consumer Secret)
   - Access Token
   - Access Token Secret
4. Make sure your app has **Read and Write** permissions
5. Add credentials to `.env` file

**Detailed Twitter API Setup:**
- Sign up at https://developer.twitter.com
- Apply for Elevated access (free, takes 1-2 days)
- Create new Project → New App
- Go to "Keys and tokens" tab
- Generate all 4 credentials
- Enable OAuth 1.0a with Read+Write permissions

### 2. Claude API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create account / Sign in
3. Go to API Keys section
4. Create new API key
5. Add to `.env` file as `ANTHROPIC_API_KEY`

Cost: ~$0.002 per headline rewrite (very cheap!)

### 3. Supabase Database Setup

1. Go to your existing Supabase project: https://hpghkusuekkjmpiiszpt.supabase.co
2. Open SQL Editor
3. Copy and paste the entire content of `database_setup.sql`
4. Click "Run" to create tables
5. Done! (Credentials already in `.env`)

### 4. Install Dependencies

```bash
cd /Users/soumyajit/Desktop/Code/twitter
npm install
```

### 5. Configure Environment Variables

Edit `.env` file and add your credentials:

```env
# Twitter API
TWITTER_API_KEY=your_key_here
TWITTER_API_SECRET=your_secret_here
TWITTER_ACCESS_TOKEN=your_token_here
TWITTER_ACCESS_SECRET=your_token_secret_here

# Claude API
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Supabase (already configured)
SUPABASE_URL=https://hpghkusuekkjmpiiszpt.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 6. Test Locally

```bash
# Test crawling
npm run crawl

# Test posting (requires queue to have articles)
npm run post

# Run full bot with cron jobs
npm run dev
```

## 🌐 Deploy to Vercel

### 1. Push to GitHub

```bash
cd /Users/soumyajit/Desktop/Code/twitter
git init
git add .
git commit -m "Initial commit: Twitter news bot"
gh repo create twitter-news-bot --public --source=. --push
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: twitter-news-bot
# - Directory: ./
# - Build command: npm install
# - Output directory: (leave empty)
```

### 3. Add Environment Variables in Vercel

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add all variables from `.env`:
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_SECRET`
- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `CRON_SECRET` (generate a random string for security)

### 4. Enable Cron Jobs

Vercel automatically enables cron jobs from `vercel.json`:
- `/api/crawl` - Every 30 minutes
- `/api/post` - Every 5 minutes

Check cron logs in Vercel dashboard.

## 📊 How It Works

```
Every 30 minutes:
1. Crawl 5 news sources (RSS feeds)
2. Fetch 5 latest headlines from each
3. Check if already posted (deduplication)
4. Rewrite with Claude AI (Twitter-optimized)
5. Add to queue

Every 5 minutes:
1. Get 1 article from queue
2. Post to Twitter
3. Mark as posted
4. Archive in database
```

**Result:** 6 tweets per hour, 144 tweets per day, all unique!

## 🛠️ Commands

```bash
# Local development
npm run dev              # Start bot with cron jobs
npm run crawl            # Manual crawl (fetch + rewrite + queue)
npm run post             # Manual post (post 1 from queue)

# Deployment
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production

# Git
git add .
git commit -m "message"
git push
```

## 📁 Project Structure

```
twitter/
├── src/
│   ├── bot.js           # Main bot with cron jobs
│   ├── config.js        # News sources configuration
│   ├── crawl.js         # Crawl and queue logic
│   ├── post.js          # Post from queue logic
│   ├── database.js      # Supabase database functions
│   ├── fetcher.js       # RSS + web scraping
│   ├── rewriter.js      # Claude AI integration
│   └── twitter.js       # Twitter API integration
├── api/
│   ├── crawl.js         # Vercel cron endpoint
│   └── post.js          # Vercel cron endpoint
├── .env                 # Your credentials (git-ignored)
├── .env.example         # Template
├── database_setup.sql   # Supabase table creation
├── vercel.json          # Vercel config + cron
├── package.json         # Dependencies
└── README.md            # This file
```

## 🔒 Security Notes

- Never commit `.env` file (already in `.gitignore`)
- Use `CRON_SECRET` in production to protect endpoints
- Twitter API keys have rate limits (be mindful)
- Claude API is pay-per-use (~$2-5/month for this bot)

## 💰 Cost Estimate

- **Twitter API**: Free (Elevated access)
- **Claude API**: ~$2-5/month (144 rewrites/day)
- **Supabase**: Free tier (plenty for this use case)
- **Vercel**: Free tier (cron jobs included)

**Total: ~$2-5/month** 🎉

## 🐛 Troubleshooting

**Bot not posting:**
- Check Twitter API credentials in `.env`
- Verify Twitter app has Read+Write permissions
- Check Vercel logs for errors

**No articles in queue:**
- Run `npm run crawl` manually
- Check if RSS feeds are accessible
- Verify Claude API key is valid

**Database errors:**
- Make sure you ran `database_setup.sql` in Supabase
- Check Supabase credentials in `.env`

## 📈 Future Enhancements

- [ ] Add more news sources
- [ ] Category-specific hashtags
- [ ] Image attachments from articles
- [ ] Sentiment analysis
- [ ] Tweet analytics dashboard
- [ ] Multiple Twitter accounts support

## 📝 License

MIT - Feel free to modify and use!

---

**Created:** 2025-11-12
**Status:** ✅ Ready for deployment
