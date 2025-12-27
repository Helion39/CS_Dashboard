# Deploy to Vercel

## Quick Setup (5 minutes)

1. **Go to Vercel**: https://vercel.com
2. **Sign up** with your GitHub account
3. **Click "New Project"**
4. **Import** your repository: `Helion39/CS_Dashboard`
5. **Configure**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `helpdesk-app`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. **Add Environment Variables** (click "Environment Variables"):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

7. **Click Deploy** - That's it!

## Why This Will Work:
- Vercel is made by Next.js creators
- Better handling of API routes and environment variables
- No build cache issues like Netlify
- Perfect Supabase integration

## After Deploy:
Your app will be live at: `your-project.vercel.app`
Every git push auto-deploys!
