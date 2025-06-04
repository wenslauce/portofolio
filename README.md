# Wenslauce 
A modern, responsive portfolio website built with React and Supabase.

## 🚀 Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Framer Motion
  - Material UI
  - AOS (Animate On Scroll)
  - Lucide Icons
  - SweetAlert2

- **Backend:**
  - Supabase (Comments & Database)
  - Resend API (Independent Email Service)

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/wenslauce/Portofolio_V5.git
   cd Portofolio_V5
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_RESEND_API_KEY=your_resend_api_key
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📦 Production Build

```bash
npm run build
```
The build files will be in the `dist` directory.

## 🔧 Supabase Configuration

1. **Create a Supabase Project:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Create a new project

2. **Set up Database Tables:**
   ```sql
   -- Contact Messages Table
   create table public.contact_messages (
       id uuid default uuid_generate_v4() primary key,
       name text not null,
       email text not null,
       message text not null,
       created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable RLS
   alter table public.contact_messages enable row level security;

   -- Create policies
   create policy "Anyone can create contact messages"
   on public.contact_messages for insert
   with check (true);
   ```

3. **Set up Independent Email Service:**
   - Create a [Resend](https://resend.com) account
   - Get your API key from Resend dashboard
   - Add your domain or use the test domain
   - Add `VITE_RESEND_API_KEY` to your environment variables

## 📝 Features

- Responsive Design
- Dark Theme
- Independent Contact Form with Professional Email Notifications
- Real-time Comments System
- Smooth Animations
- SEO Optimized
- Modern UI/UX

## 🌐 Live Demo

Visit: [https://www.wenslauce.com](https://www.wenslauce.com)

## 📄 License

This project is licensed under the MIT License. If you use this project, please include attribution to the original author.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/wenslauce/Portofolio_V5/issues).

## 📧 Contact

- Website: [wenslauce.com](https://www.wenslauce.com)
- Email: hello@wenslauce.com

---
Made with ❤️ by Wenslauce