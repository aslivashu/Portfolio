# Netlify DB Setup Instructions

## After installing Node.js, run these commands:

### 1. Initialize Netlify DB
```bash
npx netlify db init
```

This single command will:
- Provision a PostgreSQL database instantly
- Configure Drizzle ORM and Studio automatically
- Set up environment variables securely connected to your Netlify project
- Give you everything you need for AI-native development

### 2. Install Netlify CLI (if not already installed)
```bash
npm install -g netlify-cli
```

### 3. Login to Netlify
```bash
netlify login
```

### 4. Link your project to Netlify
```bash
netlify link
```

### 5. Start development server
```bash
netlify dev
```

## What You Get:
- ✅ Instantly provisioned PostgreSQL database
- ✅ Drizzle ORM configured automatically
- ✅ Drizzle Studio for database management
- ✅ Environment variables securely connected
- ✅ Ready for AI workflows
- ✅ Generous free tier

## Next Steps After Setup:
1. Use Drizzle Studio to create your database schema
2. Build your API endpoints using Netlify Functions
3. Connect your frontend to the database via API calls
4. Deploy to production with `netlify deploy --prod`
