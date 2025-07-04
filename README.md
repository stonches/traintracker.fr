# Train Tracker France

**Professional, bilingual (French/English) train delay and strike tracker** built with Next.js 14+ for deployment via GitHub to Cloudflare Pages.

🚂 **Live Demo**: [traintracker.fr](https://traintracker.fr)

## Project Overview

Train Tracker France is a comprehensive real-time train tracking application that aggregates data from multiple French transport APIs to provide accurate, up-to-date information about:

- **Real-time train delays and departures**
- **Current and upcoming SNCF strikes**
- **Service disruptions and alternatives**
- **Regional transport integration (TER, Transilien)**
- **Journey planning with real-time calculations**

## Features

### 🌍 **Bilingual Support**
- **French (default)**: Root domain serves French content
- **English**: Available at `/en/` routes
- SEO-optimized with proper hreflang implementation
- Professional translation infrastructure

### 🚄 **Real-time Data Integration**
- **SNCF API**: Live departures, delays, disruptions
- **transport.data.gouv.fr**: Regional transport datasets discovery
- **Smart caching**: 30s real-time, 5min static data
- **Fallback mechanisms** for API failures

### 📱 **Professional UI/UX**
- **Mobile-first responsive design**
- **SNCF brand colors** (Blue #0088ce, Red #e60012)
- **Accessibility compliant** (WCAG 2.1 AA)
- **Progressive Web App** capabilities
- **Dark mode support** (optional)

### 🔍 **SEO Optimized**
- **Complete meta tags** for all pages
- **Structured data** (JSON-LD) for train schedules
- **Open Graph** and Twitter Card tags
- **Canonical URLs** and sitemap generation
- **Core Web Vitals** optimized (< 2s load time)

### 📊 **Analytics & Privacy**
- **Google Analytics 4** integration (G-44S086500V)
- **GDPR compliant** implementation
- **Privacy-friendly** analytics approach

## Technical Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form for user interactions
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Cloudflare Pages with Functions
- **Analytics**: Google Analytics 4

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - French: http://localhost:3000
   - English: http://localhost:3000/en

### Development Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run build:pages  # Build for Cloudflare Pages
npm run start        # Start production server
npm run lint         # Run ESLint
npm run preview      # Preview with Wrangler
npm run deploy       # Deploy to Cloudflare Pages
```

## Environment Variables

The application requires these environment variables:

```bash
# API Keys
SNCF_API_KEY=90a4c9a1-87e5-4b16-bbe4-45abed49b951
TRANSPORT_GOUV_API_URL=https://transport.data.gouv.fr/api

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://traintracker.fr
NEXT_PUBLIC_SITE_NAME="Train Tracker France"
NEXT_PUBLIC_DEFAULT_LANGUAGE=fr
NEXT_PUBLIC_SUPPORTED_LANGUAGES=fr,en

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-44S086500V

# Features
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## Deployment

### Cloudflare Pages Deployment

1. **Connect GitHub Repository**
   - Go to Cloudflare Pages dashboard
   - Connect your GitHub repository
   - Select the `traintracker-france` repository

2. **Configure Build Settings**
   - **Framework preset**: Next.js
   - **Build command**: `npm run build:pages`
   - **Build output directory**: `dist`
   - **Root directory**: `/`

3. **Environment Variables**
   Set all environment variables in Cloudflare Pages dashboard

4. **Custom Domain**
   - Add `traintracker.fr` as custom domain
   - Configure DNS records as instructed

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy using Wrangler CLI
npm run deploy
```

## Project Structure

```
traintracker-fr/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # French homepage (root)
│   │   ├── en/                       # English routes
│   │   ├── gare/[slug]/              # French station pages
│   │   ├── greves/                   # French strikes page
│   │   └── ...
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   ├── sections/                 # Page sections
│   │   ├── layout/                   # Layout components
│   │   └── seo/                      # SEO components
│   ├── lib/
│   │   ├── api/                      # API integration layer
│   │   ├── i18n/                     # Internationalization
│   │   └── utils/                    # Utility functions
│   └── data/                         # Static data files
├── functions/                        # Cloudflare Functions
├── public/                           # Static assets
├── tailwind.config.ts                # Tailwind CSS configuration
├── next.config.ts                    # Next.js configuration
├── wrangler.toml                     # Cloudflare Pages config
└── package.json                      # Dependencies and scripts
```

## API Integration

### SNCF API
- **API Key**: `90a4c9a1-87e5-4b16-bbe4-45abed49b951`
- **Base URL**: `https://api.sncf.com/v1/coverage/sncf`
- **Rate Limit**: 5,000 requests/day

### Transport.data.gouv.fr
- **Base URL**: `https://transport.data.gouv.fr/api/`
- **Authentication**: None required (open data)
- **Purpose**: Regional transport datasets discovery

## Legal Compliance

### Disclaimers
All pages include clear disclaimers:
> **Disclaimer**: Train Tracker France is an independent service and is NOT affiliated with SNCF, the French government, or any official transport authority in France.

### GDPR Compliance
- **Privacy Policy**: Transparent data collection practices
- **Cookie Policy**: Clear explanation of cookie usage
- **User Rights**: Easy access to data management
- **Data Minimization**: Only collect necessary data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Email**: contact@traintracker.fr
- **Issues**: [GitHub Issues](https://github.com/your-username/traintracker-france/issues)
- **Documentation**: This README file

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Train Tracker France** - Professional French train tracking service built with Next.js 14+ and deployed on Cloudflare Pages.
