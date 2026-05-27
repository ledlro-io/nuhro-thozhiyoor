# Nuhro Thozhiyoor Heritage Archive

A luxury digital archive and museum dedicated to documenting the history, liturgy, ancient manuscripts, and episcopal succession of the Malabar Independent Syrian Church – Thozhiyoor (Thozhiyur Sabha).

Built as a high-performance Next.js application, utilizing a premium dark-gold design theme, smooth CSS/Framer Motion animations, and a local SQLite database for a **100% free local CMS admin dashboard** out of the box.

---

## 🛠️ Stack & Technologies

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styles**: Tailwind CSS (Custom gold accents and typography)
- **Database**: SQLite (Stored locally as a single file, zero hosting costs)
- **ORM**: Prisma (For clean models, easy to migrate to Supabase/PostgreSQL)
- **Auth**: Secure session cookies & JSON Web Tokens (JWT)
- **Animations**: CSS Compositor animations & Framer Motion
- **Icons**: Lucide React
- **Markdown**: React Markdown (For writing research and biographies in rich text)

---

## 🚀 Getting Started

### 1. Installation

Clone or download the project files into your desired folder, open your terminal, and install the package dependencies:

```bash
npm install
```

### 2. Database Setup & Seeding

Run our custom automation script to initialize your local SQLite database (`prisma/dev.db`) and seed it with initial historical posts, Metropolitans, and gallery items:

```bash
npm run db:setup
```

### 3. Start Development Server

Run the local development server:

```bash
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`** to view the live archive.

---

## 🔐 Administrative CMS

To add, edit, or delete articles, biographies, or gallery deposits:

1. Click **Admin** in the navigation bar or go directly to **`/admin`**.
2. Log in with the pre-seeded credentials:
   - **Username**: `admin`
   - **Password**: `NuhroThozhiyoor2026!`
3. You will be redirected to the Dashboard where you can perform all editing tasks without typing any code.

*Note: For production deployments, change the `JWT_SECRET` in your `.env` file to a secure custom string, and change the admin password inside the dashboard.*

---

## 📂 Project Directory Structure

```
project/
├── prisma/
│   ├── schema.prisma         # Database models (User, Post, Metropolitan, GalleryImage)
│   └── dev.db                # Auto-generated local SQLite file (Created after db:setup)
├── scripts/
│   └── seed.js               # Database seeding script
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Global fonts, layouts, particles, navigation
│   │   ├── page.tsx          # Home page (Hero, Kattumangattu Bavas section)
│   │   ├── about/            # About page (History, Nature of See, Mission)
│   │   ├── archive/          # Filterable post listings with live search
│   │   ├── posts/[slug]/     # Full post reading view (Markdown parsed)
│   │   ├── metropolitans/    # Chronological grid of Metropolitans
│   │   ├── metropolitans/[slug]/ # Full biography details subpages
│   │   ├── timeline/         # Canonical history timeline tree
│   │   ├── gallery/          # Museum items index with interactive detailed modals
│   │   ├── contact/          # Inquiry form & office location details
│   │   ├── admin/            # Admin login
│   │   │   └── dashboard/    # Administrative CMS workspace panel
│   │   └── api/              # Secure API route endpoints
│   ├── components/
│   │   ├── DynamicLogo.tsx   # Custom animated SVG logo representing "Light"
│   │   ├── DynamicParticles.tsx # Golden background particle drift
│   │   ├── RichTextEditor.tsx   # Markdown editor with Live Preview tabs
│   │   ├── Navbar.tsx        # Responsive navigation header
│   │   └── Footer.tsx        # Legal disclosure and social links footer
│   ├── lib/
│   │   ├── prisma.ts         # Cached Prisma client helper
│   │   └── auth.ts           # Token verification & password hashing utility
├── .env                      # Local environment configurations
├── tailwind.config.ts        # Luxury theme, typography & shadow settings
└── tsconfig.json
```

---

## 🌐 Free Production Deployment

When you are ready to deploy to production (Vercel or Netlify), the project remains 100% free:

1. **Deploying Frontend**: Import the repository into Vercel or Netlify. They will deploy the Next.js pages automatically on their free tiers.
2. **Deploying Database**:
   - Since SQLite is a local file, standard serverless hosts like Vercel might reset it on redeployments.
   - For a free cloud database, create a free **Supabase** or **Neon** Postgres database.
   - Update the `DATABASE_URL` in your deployment's environment variables to point to your Supabase PostgreSQL connection string.
   - Run `npx prisma db push` targeting the new database. Prisma handles the tables creation automatically with no code changes required.
