# FeedLoop

FeedLoop is a powerful SaaS platform designed to streamline feedback collection and analysis. Create engaging surveys, gather valuable insights from your users, and make data-driven decisions to improve your products and services.

## Features

- **Survey Creation**: Build custom surveys with various question types
- **Real-time Analytics**: Visualize feedback data with interactive charts and dashboards
- **User Management**: Handle authentication and user roles
- **Responsive Design**: Works seamlessly across all devices
- **Dark/Light Mode**: Theme support for better user experience

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd feedloop
npm install
```

Set up your environment variables by copying `.env.example` to `.env.local` and filling in your Supabase credentials.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), [https://feedloop-five.vercel.app/](https://feedloop-five.vercel.app/) with your browser to see the result.

## Project Structure

```
feedloop/
├── app/                    # Next.js app directory
│   ├── (app)/             # Protected app routes
│   ├── (landing)/         # Public landing pages
│   └── auth/              # Authentication pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configs
└── public/                # Static assets
```

## Contributing

We welcome contributions! Please read our contributing guidelines and code of conduct.

## License

This project is licensed under the MIT License.
