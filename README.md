# AI Coding Tools Landscape

A comprehensive Next.js application showcasing the landscape of AI coding tools and platforms, powered by PostgreSQL database.

## Features

- 🎯 **100+ AI Tools** across 9 categories
- 🔍 **Category Filtering** for easy navigation
- 📊 **Real-time Statistics** and insights
- 🎨 **Modern UI** with Tailwind CSS
- 🗄️ **PostgreSQL Database** with AWS RDS integration
- ⚡ **Next.js 14** with App Router

## Categories

- **AI-Powered IDEs** - Full development environments
- **IDE Extensions & Assistants** - Code completion tools
- **Web-Based AI Platforms** - Cloud development
- **Terminal & CLI Agents** - Command-line assistants
- **Autonomous Agents** - Full project automation
- **Specialized Tools** - Focused development tasks
- **Chat & Desktop Apps** - Conversational AI
- **No-Code/Low-Code AI** - Visual development
- **ML/Data Science Focused** - Machine learning tools

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (AWS Aurora recommended)
- AWS credentials configured

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Configure your `.env.local` with your database credentials

5. Seed the database:
   ```bash
   npm run db:seed
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Schema

The application uses two main tables:

- **categories** - Tool categories with metadata
- **tools** - Individual tools with descriptions and pricing

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Setup

The application is configured to work with AWS Aurora PostgreSQL with IAM authentication. Make sure to:

1. Create an Aurora PostgreSQL cluster
2. Configure IAM role for database access
3. Set up proper security groups and VPC settings

## API Endpoints

- `GET /api/categories` - Fetch all categories with tools
- `GET /api/tools` - Fetch tools with optional filtering

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details