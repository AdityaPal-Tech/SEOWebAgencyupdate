# SEOWebAgency - AI-Powered SEO & Digital Growth Platform

SEOWebAgency is a state-of-the-art, high-performance web platform designed to automate search optimization diagnostics, showcase growth metrics, and generate qualified inbound leads. Built with Next.js 16, React 19, Tailwind CSS v4, and Three.js WebGL graphics, the platform delivers a premium, fast, and interactive user experience.

---

## 🚀 Key Features

*   **Next-Gen Search Automation Suite**: High-impact headlines, real-time trust metrics, and user-friendly lead generation.
*   **3D WebGL Background**: An interactive particle background canvas powered by Three.js that responds dynamically.
*   **Interactive Growth Dashboard**: Simulated conversions and real-time SEO data tracking visualizations.
*   **AI SEO Audit Tool**: A diagnostic engine allowing users to input websites and obtain immediate automated recommendations.
*   **Interactive Mouse Glow Trail**: A customizable, fluid glow pattern that follows the user's cursor.
*   **Seamless Direct Connect**: Instant WhatsApp support integration and SMTP lead capture dispatch flow.
*   **100/100 Core Web Vitals**: Fully optimized for fast rendering and edge deliveries.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Frontend Library**: [React 19](https://react.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **3D Graphics**: [Three.js](https://threejs.org/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Project Structure

```text
web/
├── public/              # Static assets (images, icons, etc.)
├── src/
│   ├── app/             # Next.js App Router (layout, pages, styles)
│   ├── components/      # Reusable UI Components
│   │   ├── AuditTool.tsx           # SEO Audit diagnostic interface
│   │   ├── ClientShowcase.tsx       # Portfolio grid
│   │   ├── Navbar.tsx               # Responsive glassmorphic navigation
│   │   ├── Pricing.tsx              # Pricing cards and packages
│   │   ├── SaaSResults.tsx          # Real-time ROI simulation dashboard
│   │   ├── ServicesGrid.tsx         # Capabilities display
│   │   ├── TestimonialsSlider.tsx   # Slider for client reviews
│   │   ├── ThreeCanvas.tsx          # Three.js WebGL canvas background
│   │   └── WhatsAppButton.tsx      # Floating click-to-chat action
│   └── proxy.ts         # Middleware-level security and bot-blocking rules
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
└── tailwind.config.js   # Tailwind configurations (if applicable)
```

---

## ⚙️ Local Setup and Installation

### Prerequisites

Ensure you have [Node.js (v18.x or later)](https://nodejs.org/) and `npm` installed.

### 1. Clone the Repository

```bash
git clone https://github.com/AdityaPal-Tech/SEOWebAgency.git
cd SEOWebAgency
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🌐 Deployment Guidelines

This project is fully ready for zero-configuration deployments.

### Deploying to Vercel (Recommended)

The easiest way to deploy this Next.js project is via Vercel:

1. Push your repository to GitHub.
2. Visit the [Vercel Dashboard](https://vercel.com/new).
3. Import the `SEOWebAgency` repository.
4. Click **Deploy**. Vercel will automatically detect Next.js and configure the build settings.

### Custom VPS / Server Deployment

To run this on a Node.js-enabled VPS (such as Hostinger, DigitalOcean, or AWS EC2):

1. Clone the repository on the server.
2. Install dependencies: `npm install --production`.
3. Build the Next.js bundle: `npm run build`.
4. Run the production server using a process manager like [PM2](https://pm2.keymetrics.io/):
   ```bash
   pm2 start npm --name "seo-web-agency" -- run start
   ```

---

## 🔒 Security and Environment Variables

Do **not** commit API keys or credentials directly to the repository. 
* Use a `.env.local` file for local development.
* Configure environment variables in Vercel under **Project Settings > Environment Variables**.
* `.env*` files are ignored globally via `.gitignore`.
