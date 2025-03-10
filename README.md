# Blogit - Blog Writing SaaS Platform

🚀 **Blogit** is a modern, feature-rich **Blog Writing SaaS** that allows users to create and manage multiple blogging sites, write articles, and manage all content through an intuitive admin panel.

🔗 **Live Demo:** [Blogit](https://blogits.vercel.app/)

---

## 📌 Features
- ✅ **Multi-Site Blogging** – Users can create and manage multiple blogs under one account.
- ✍️ **Article Management** – Write, edit, and publish blog posts effortlessly.
- 🔐 **Authentication** – Secure user authentication with Clerk.
- 🎛 **Admin Panel** – Manage all blogs and articles from a single dashboard.
- 🔄 **Data Validation** – Ensuring valid input using **Zod**.
- ⚡ **Fast & Scalable** – Hosted on **Vercel** for optimal performance.

---

## 🛠 Tech Stack

| Technology  | Usage  |
|-------------|--------|
| **Next.js** | Frontend & Backend (API Routes) |
| **Prisma**  | Database ORM for managing content |
| **Zod**     | Form validation & data parsing |
| **Clerk**   | Authentication system |
| **Supabase** | Database & storage |
| **Vercel**  | Hosting and deployment |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/blogit.git
cd blogit
```

### 2️⃣ Install Dependencies
```bash
npm install
# OR
yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file and add the necessary environment variables:

```
DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_SECRET_KEY=your_clerk_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Run the Development Server
```bash
npm run dev
# OR
yarn dev
```
The app will be available at `http://localhost:3000`

---

## 🎯 Project Structure
```
📂 blogit/
├── 📂 app/                    # Next.js App Router
│   ├── 📂 dashboard/         # Admin dashboard for site & blog management
│   ├── 📂 components/        # Reusable UI components
│   ├── 📂 utils/             # Utility functions & database connections
│   ├── 📂 api/               # API routes for handling requests
│   └── 📄 layout.tsx         # Main layout for the application
├── 📂 prisma/                # Prisma ORM configurations
├── 📂 public/                # Static assets (logos, images)
├── 📄 .env.local             # Environment variables
├── 📄 next.config.js         # Next.js configuration
├── 📄 package.json           # Dependencies & scripts
└── 📄 README.md              # Project documentation
```

## 💡 Contributing
We welcome contributions! If you’d like to contribute:
1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to your branch (`git push origin feature/new-feature`)
5. Create a Pull Request

