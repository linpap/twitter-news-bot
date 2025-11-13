# 🐦 Twitter API Setup Guide

Complete step-by-step guide to get your Twitter API credentials.

## Prerequisites

- Active Twitter/X account
- Email address and phone number verified
- Account should be at least a few days old (Twitter requirement)

## Step-by-Step Setup

### 1. Apply for Twitter Developer Account

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Click "Sign up" or "Sign in" with your Twitter account
3. You'll be asked to apply for a developer account

### 2. Complete Developer Application

Fill out the application form:

**Primary reason for using Twitter API:**
```
I'm building an automated news aggregation bot that will:
- Fetch headlines from various news sources (Reuters, TechCrunch, etc.)
- Rewrite them to be Twitter-friendly
- Post them automatically to keep my followers informed
- This is for personal use / educational purposes
```

**Will you make Twitter content or derived information available to government entities?**
- Select: **No**

**Use case details (be specific):**
```
I'm creating an automated Twitter bot that:
1. Fetches news headlines from RSS feeds (Reuters, BBC, TechCrunch, MarketWatch, ESPN)
2. Uses AI to rewrite headlines to fit Twitter's character limit
3. Posts news updates every 5 minutes
4. Stores posted articles in a database to avoid duplicates
5. Will post approximately 150 tweets per day
6. All content will be properly attributed to original sources

This is a personal project for educational purposes.
```

**Will your app use Tweet, Retweet, Like, Follow, or Direct Message functionality?**
- Select: **Yes**
- Explain: "I will only post tweets with news headlines and source links. No likes, follows, or DMs."

**Do you plan to analyze Tweets, Twitter users, or their content?**
- Select: **No** (unless you want to add analytics later)

### 3. Review and Submit

- Accept the Developer Agreement and Policy
- Click "Submit Application"
- **Wait Time:** Usually instant approval, sometimes 1-2 days

### 4. Create a Project and App

Once approved:

1. Click "Create Project"
2. **Project Name:** `news-bot-project` (or your choice)
3. **Use Case:** Select "Making a bot"
4. **Project Description:** "Automated news aggregation and posting bot"
5. Click "Next"

6. **Create an App:**
   - **App Name:** `twitter-news-bot` (must be unique across Twitter)
   - If name is taken, try: `news-bot-[your-username]` or `newsbot-[random-number]`
   - Click "Complete"

### 5. Generate API Keys (IMPORTANT!)

After creating the app, you'll see your API keys **ONCE**. Copy them immediately!

**You'll see:**
```
API Key (Consumer Key): xxxxxxxxxxxxxxxxxxxxxxxxx
API Secret (Consumer Secret): xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Bearer Token: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**🚨 SAVE THESE IMMEDIATELY!** Copy them to your `.env` file or a secure location.

### 6. Set Up User Authentication (OAuth 1.0a)

1. Go to your app dashboard
2. Click "Keys and Tokens" tab
3. Scroll to "Authentication Tokens" section
4. Click "Generate" next to "Access Token and Secret"
5. **Set App Permissions** to **"Read and Write"** (very important!)

**You'll get:**
```
Access Token: xxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Access Token Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**🚨 SAVE THESE TOO!**

### 7. Configure App Permissions

1. Go to "Settings" tab in your app
2. Scroll to "User authentication settings"
3. Click "Set up"
4. **App Permissions:** Select **"Read and Write"**
5. **Type of App:** Select **"Automated App or Bot"**
6. **Callback URLs:** Leave empty (not needed for this bot)
7. Click "Save"

### 8. Add Credentials to Your Bot

Open `/Users/soumyajit/Desktop/Code/twitter/.env` and fill in:

```env
# Twitter API Credentials
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here
TWITTER_ACCESS_TOKEN=your_access_token_here
TWITTER_ACCESS_SECRET=your_access_token_secret_here

# Claude API (get from https://console.anthropic.com/)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Supabase (already configured)
SUPABASE_URL=https://hpghkusuekkjmpiiszpt.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 9. Verify Your Setup

Run this to test your credentials:

```bash
cd /Users/soumyajit/Desktop/Code/twitter
node -e "
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const user = await client.v2.me();
console.log('✓ Connected as:', user.data.username);
"
```

## Common Issues & Solutions

### ❌ "Could not authenticate you"
- Check that you copied all 4 credentials correctly
- Make sure there are no extra spaces
- Verify app has "Read and Write" permissions

### ❌ "App does not have write permissions"
1. Go to app Settings → User authentication settings
2. Change to "Read and Write"
3. Regenerate Access Token & Secret (old ones won't work!)
4. Update `.env` with new tokens

### ❌ "403 Forbidden"
- Your app might not be approved for Elevated access
- Apply for Elevated access in Developer Portal
- Usually takes 1-2 days

### ❌ "429 Too Many Requests"
- You've hit rate limits
- Free tier: 50 tweets per 24 hours
- Elevated: 300 tweets per 3 hours
- Reduce `POST_INTERVAL_MINUTES` in `.env`

## Rate Limits

**Free Tier:**
- 50 tweets per 24 hours
- Good enough for testing

**Elevated Access (Free):**
- 300 tweets per 3 hours
- 10,000 tweets per month
- Perfect for this bot (150/day = 4,500/month)

**To Apply for Elevated:**
1. Go to [Developer Portal](https://developer.twitter.com/en/portal/products/elevated)
2. Click "Apply for Elevated"
3. Fill out the same questions as before
4. Usually approved in 1-2 days

## Security Best Practices

1. ✅ Never share your API keys publicly
2. ✅ Keep `.env` in `.gitignore` (already done)
3. ✅ Use separate apps for testing vs production
4. ✅ Regenerate keys if you accidentally expose them
5. ✅ Enable 2FA on your Twitter account

## Need Help?

- [Twitter API Documentation](https://developer.twitter.com/en/docs)
- [Rate Limits Guide](https://developer.twitter.com/en/docs/twitter-api/rate-limits)
- [API Status Page](https://api.twitterstat.us/)

---

**Ready to go?** Once your `.env` is configured, run:

```bash
npm run dev
```

Your bot will start posting! 🚀
