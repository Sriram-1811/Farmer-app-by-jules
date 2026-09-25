# Beginner's Guide: How to Host This Application Online for Free

Because you are using **Next.js**, you need two things to host this app online without paying for your own server (VM):
1. **Vercel** (Hosts your website's code and frontend).
2. **Supabase** (Hosts your PostgreSQL database).

This guide will explain exactly where to copy your code and how to make the site live.

---

## Step 1: Copy Your Code to GitHub
You don't need a server right now. Vercel will pull your code directly from GitHub.

1. Go to [GitHub.com](https://github.com/) and create a free account if you don't have one.
2. Click the `+` icon in the top right and select **New repository**.
3. Name it something like `agricultural-marketplace` and click **Create repository**.
4. Open your terminal (command line) on your computer, navigate to the folder where this project is saved, and run these commands to push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/agricultural-marketplace.git
   git push -u origin main
   ```
*(Note: Replace the GitHub URL with the one provided by GitHub when you created the repository).*

---

## Step 2: Create Your Free Database on Supabase
Now we need a place to store data (users, products, etc.).

1. Go to [Supabase.com](https://supabase.com/) and click **Start your project** (it's free).
2. Click **New Project**. Choose an organization, give your project a name, and **create a strong database password**. (Write this password down, you need it later).
3. Wait a few minutes for the database to finish setting up.
4. Once it's ready, look at the left sidebar menu and click the **Settings** icon (the gear).
5. Click **Database** in the settings menu.
6. Scroll down until you see the **Connection string** section. Click the **URI** tab.

**You need to copy two strings from here:**

### 1. The Transaction String (`DATABASE_URL`)
* Make sure the box for **"Use connection pooling"** is checked.
* Make sure "Mode" says "Transaction".
* Copy the string. It will look something like this:
  `postgresql://postgres.xxx:YOUR_PASSWORD@aws-0-xx.pooler.supabase.com:6543/postgres`
* **Important:** Add this text exactly to the very end of the string you just copied: `?pgbouncer=true&connection_limit=1`

### 2. The Direct String (`DIRECT_URL`)
* Uncheck the **"Use connection pooling"** box.
* Copy the string. It will look like this (notice the port is 5432 instead of 6543):
  `postgresql://postgres.xxx:YOUR_PASSWORD@aws-0-xx.pooler.supabase.com:5432/postgres`

---

## Step 3: Deploy the Code on Vercel
Now we connect GitHub to Vercel so Vercel can build your website.

1. Go to [Vercel.com](https://vercel.com/) and create a free account (Sign up with GitHub is easiest).
2. On your Vercel dashboard, click **Add New** -> **Project**.
3. You will see a list of your GitHub repositories. Find the one you made in Step 1 and click **Import**.
4. Leave the Framework Preset as "Next.js".
5. Click the **Environment Variables** section to expand it.

You need to add 4 variables here. Enter the Name on the left, and the Value on the right, then click Add:

* **Name:** `DATABASE_URL`
  * **Value:** The string you created in Step 2 for the Transaction Pooler (the one ending in 6543, with `?pgbouncer=true&connection_limit=1` added). Remember to replace `[YOUR-PASSWORD]` with the password you created!
* **Name:** `DIRECT_URL`
  * **Value:** The direct string you copied in Step 2 (ending in 5432).
* **Name:** `NEXTAUTH_URL`
  * **Value:** Since Vercel hasn't given you a URL yet, type `https://your-future-domain.vercel.app` (You can update this later once Vercel gives you your real website link).
* **Name:** `NEXTAUTH_SECRET`
  * **Value:** Type any long, random mix of letters and numbers (e.g., `dsf897ysdfh89y324yhsdjfsdf897y234`).

6. Finally, click the big **Deploy** button.

---

## Step 4: Setup the Database Tables
Vercel has built your website, but Supabase doesn't know what tables to create yet. You have to send the tables from your computer.

1. Open your terminal on your computer where your code is.
2. Open the file called `.env.example`, copy all its text, and paste it into a new file called `.env`.
3. In the `.env` file, replace the `DATABASE_URL` and `DIRECT_URL` with the real ones from Supabase (the exact same ones you gave to Vercel).
4. Run this command in your terminal to create the tables in Supabase:
   ```bash
   npx prisma migrate deploy
   ```
5. Run this command to add the initial test data (like the Admin user):
   ```bash
   npm run prisma:seed
   ```

## You're Done!
Your website is now live. Go to your Vercel dashboard, click on your project, and click the domain link they provided to view your site!
