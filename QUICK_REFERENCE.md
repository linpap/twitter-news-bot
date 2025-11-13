# 🚀 Twitter News Bot - Quick Reference

## 📊 Monitor Your Bot

```bash
# Check queue status (how many articles waiting)
npm run queue

# View Railway logs (live)
railway logs

# Check Twitter account
open https://twitter.com/thearshs
```

## 🧪 Test Locally

```bash
# Run bot locally (testing mode)
npm run dev

# Test crawl only (fetch + queue articles)
npm run crawl

# Test posting only (post 1 from queue)
npm run post
```

## 🔧 Common Commands

```bash
# Navigate to project
cd /Users/soumyajit/Desktop/Code/twitter

# View environment variables
cat .env

# Check git status
git status

# View recent commits
git log --oneline -5

# Push changes to Railway
git add .
git commit -m "Your message"
git push
```

## 🌐 Important Links

- **Twitter Account**: https://twitter.com/thearshs
- **Railway Dashboard**: https://railway.app/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard
- **GitHub Repo**: https://github.com/linpap/twitter-news-bot
- **Twitter API Console**: https://developer.twitter.com/en/portal/dashboard

## ⚙️ Current Configuration

- **Crawl Interval**: Every 30 minutes (5 sources)
- **Post Interval**: Every 15 minutes (1 tweet)
- **Tweet Rate**: ~96 tweets/day
- **Cost**: $0/month (FREE!)

## 🐛 Troubleshooting

### Bot not posting
```bash
# 1. Check Railway logs
railway logs

# 2. Check queue
npm run queue

# 3. Verify credentials
cat .env | grep TWITTER
```

### Duplicate errors
✅ FIXED! Now checks both posted_news and news_queue tables.

### Rate limit errors
- Reduce POST_INTERVAL_MINUTES to higher value (30-60)
- Update in Railway → Variables

## 📝 Quick Edits

### Change posting speed
1. Edit `.env`: `POST_INTERVAL_MINUTES=15`
2. Update Railway → Variables
3. Railway will auto-restart

### Add news sources
1. Edit `src/config.js`
2. Add new source configuration
3. Push to GitHub (auto-deploys)

### Change tweet format
1. Edit `src/twitter.js` line ~25
2. Modify the tweet template
3. Push to GitHub

## 🎯 Health Check

Your bot is healthy if:
- ✅ Railway shows "Deployment successful"
- ✅ Logs show "Authenticated as @thearshs"
- ✅ New tweets appearing every 15 minutes
- ✅ Queue is processing (run `npm run queue`)
- ✅ No repeated errors in logs

## 📞 Quick Support

1. **Check Railway logs first** - Most issues show up there
2. **Check Twitter API status** - https://api.twitterstat.us/
3. **Check Supabase status** - https://status.supabase.com/
4. **Review PROJECT_SUMMARY.md** - Complete documentation

---

**Last Updated**: November 13, 2025
**Status**: ✅ LIVE and RUNNING
