# 🚂 Railway Deployment Guide for SentrySol

## Pre-Deployment Checklist

- [ ] Code pushed to GitHub repository
- [ ] All dependencies listed in `package.json`
- [ ] Build scripts configured in `package.json`
- [ ] Production environment variables ready
- [ ] Railway account created and connected to GitHub

## Railway Configuration

### Build Settings

- **Build Command**: `npm run build:production`
- **Start Command**: `npm start`
- **Node Version**: 18+ (auto-detected)
- **Root Directory**: `/`

### Environment Variables

```
NODE_ENV=production
PORT=8080
VITE_BACKEND_URL=https://your-app.railway.app
```

## Deployment Steps

### Method 1: GitHub Integration

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `sentrysol666-sys/Sentrysol-beta-version`
4. Choose `stellar-zone` branch
5. Add environment variables
6. Deploy!

### Method 2: CLI Deployment

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

## Post-Deployment

### Custom Domain (Optional)

1. Go to your Railway project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Environment Variables Update

Update `VITE_BACKEND_URL` to your Railway app URL:

```
VITE_BACKEND_URL=https://your-app-name.railway.app
```

## Monitoring

- **Logs**: Check Railway dashboard for build and runtime logs
- **Metrics**: Monitor CPU, memory usage in Railway dashboard
- **Health Check**: Your app should respond at `https://your-app.railway.app`

## Troubleshooting

### Build Fails

- Check Node.js version compatibility
- Verify all dependencies in `package.json`
- Review build logs in Railway dashboard

### App Won't Start

- Ensure `PORT` environment variable is set
- Check start command: `npm start`
- Review runtime logs

### 404 Errors

- Verify SPA routing is configured correctly
- Check static file serving in `server/node-build.ts`

## Features Available After Deployment

✅ Landing page with wallet integration  
✅ Pricing page with interactive tiers  
✅ Dashboard with mock transaction data  
✅ Solana & Ethereum wallet connections  
✅ Network graph visualizations  
✅ Transaction flow analysis

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: Create issues in your repository
