# Redis Setup Guide

## What's Been Done

✅ Installed `redis` package
✅ Created API route at `/api/top40/[year]` for reading/writing data
✅ Updated components to save to Redis when you click "Save to Browser" or export
✅ Added fallback to JSON files if Redis is not configured

## Setup Steps

### 1. Create Redis Database

You can use any Redis provider:
- **Upstash** (recommended for serverless): https://upstash.com
- **Redis Cloud**: https://redis.com/cloud
- **Railway**: https://railway.app
- **Your own Redis server**

### 2. Get Redis URL

After creating your Redis database, you'll get a connection URL that looks like:
```
redis://default:password@host:port
```
or
```
rediss://default:password@host:port  (SSL)
```

### 3. Add Environment Variable

**For Local Development:**
1. Create/update `.env.local` in your project root
2. Add your Redis URL:
   ```
   REDIS_URL=redis://default:password@host:port
   ```

**For Production (Vercel):**
1. In Vercel dashboard, go to your project
2. Go to **Settings** → **Environment Variables**
3. Add:
   - Name: `REDIS_URL`
   - Value: Your Redis connection URL
4. Make sure it's available for **Production**, **Preview**, and **Development**

### 4. (Optional) Seed Initial Data

Your existing JSON files will be used as fallback, but you can seed Redis with initial data:

1. Run your dev server: `npm run dev`
2. Visit each year page (e.g., `/top40/2025`)
3. Click "Export JSON" in the description editor
4. This will save the data to Redis automatically

Or use the API directly:
```bash
curl -X PUT http://localhost:3000/api/top40/2025 \
  -H "Content-Type: application/json" \
  -d @app/data/top40/2025.json
```

## How It Works

- **Reading**: Pages try Redis first, fallback to JSON files if Redis is unavailable
- **Writing**: When you click "Save to Browser" or "Export JSON", data is saved to Redis
- **Local Development**: Works with `.env.local` file containing `REDIS_URL`
- **Production**: Uses `REDIS_URL` environment variable from Vercel dashboard

## Testing

1. Make sure `REDIS_URL` is set in `.env.local`
2. Start dev server: `npm run dev`
3. Visit `/top40/2025`
4. Edit description or lyrics
5. Click "Save to Browser"
6. Check browser console - should see "Saved to KV successfully" (message still says KV but it's Redis)
7. Refresh page - changes should persist!

## Troubleshooting

- **"Redis not available"** in console: Make sure `.env.local` has `REDIS_URL` set
- **Data not persisting**: Check that `REDIS_URL` environment variable is set in Vercel dashboard
- **Still using JSON files**: Redis might not be configured - check `REDIS_URL` environment variable
- **Connection errors**: Verify your Redis URL is correct and accessible from Vercel's servers

