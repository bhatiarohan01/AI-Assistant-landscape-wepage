import { getConnection } from '../lib/db';
import * as fs from 'fs';
import * as path from 'path';

const categories = {
  'ide': {
    name: 'AI-Powered IDEs',
    icon: 'Laptop',
    color: 'bg-blue-500',
    description: 'Full development environments with AI capabilities',
    tools: [
      { name: 'Cursor', description: 'VS Code fork with AI-first features', pricing: '$20/mo', popularity: 'Very High' },
      { name: 'Windsurf', description: 'Codeium IDE with Cascade AI agent', pricing: 'Free-$15/mo', popularity: 'High' },
      { name: 'Zed', description: 'High-performance collaborative IDE', pricing: 'Free', popularity: 'Growing' },
      { name: 'Void Editor', description: 'Open-source Cursor alternative', pricing: 'Waitlist', popularity: 'New' },
      { name: 'Xcode 16 AI', description: 'Apple\'s AI for Swift/SwiftUI', pricing: 'Free', popularity: 'Medium' }
    ]
  },
  'extensions': {
    name: 'IDE Extensions & Assistants',
    icon: 'Code',
    color: 'bg-purple-500',
    description: 'AI assistants that integrate with existing editors',
    tools: [
      { name: 'GitHub Copilot', description: 'OpenAI-powered code completion', pricing: '$10-39/mo', popularity: 'Very High' },
      { name: 'Codeium', description: 'Free AI code completion', pricing: 'Free-$12/mo', popularity: 'High' },
      { name: 'Tabnine', description: 'Privacy-focused AI completion', pricing: 'Free-$12/mo', popularity: 'High' },
      { name: 'Continue', description: 'Open-source autopilot', pricing: 'Free', popularity: 'Medium' },
      { name: 'Cline (fka Claude Dev)', description: 'VS Code AI agent extension', pricing: 'BYOK', popularity: 'Growing' },
      { name: 'Amazon Q Developer', description: 'AWS coding assistant', pricing: 'Free-$19/mo', popularity: 'Medium' },
      { name: 'Gemini Code Assist', description: 'Google\'s AI assistant', pricing: 'Free tier', popularity: 'Growing' },
      { name: 'JetBrains AI Assistant', description: 'AI for JetBrains IDEs', pricing: '$10/mo', popularity: 'Medium' },
      { name: 'Pieces for Developers', description: 'AI workflow assistant', pricing: 'Free', popularity: 'Medium' },
      { name: 'Supermaven', description: 'Fast AI completion (merged w/Cursor)', pricing: 'Merged', popularity: 'Medium' }
    ]
  },
  'web': {
    name: 'Web-Based AI Platforms',
    icon: 'Globe',
    color: 'bg-green-500',
    description: 'Cloud-based development with AI generation',
    tools: [
      { name: 'Replit', description: 'Cloud IDE with AI Agent', pricing: 'Free-$40/mo', popularity: 'Very High' },
      { name: 'Bolt.new', description: 'StackBlitz AI full-stack generator', pricing: '$20/mo', popularity: 'Very High' },
      { name: 'Lovable', description: 'AI app builder (Supabase)', pricing: '$25-30/mo', popularity: 'Very High' },
      { name: 'v0 by Vercel', description: 'React component generator', pricing: 'Free-$20/mo', popularity: 'Very High' },
      { name: 'CodeSandbox', description: 'Browser IDE with AI features', pricing: 'Free tier', popularity: 'High' },
      { name: 'Vitara', description: 'AI web app builder', pricing: 'Free tier', popularity: 'New' },
      { name: 'Softgen', description: 'AI code generation platform', pricing: 'Various', popularity: 'New' },
      { name: 'Hostinger Horizons', description: 'AI website builder', pricing: 'Varies', popularity: 'Medium' },
      { name: 'Create.xyz', description: 'AI web app creation', pricing: 'Free tier', popularity: 'Medium' }
    ]
  },
  'terminal': {
    name: 'Terminal & CLI Agents',
    icon: 'Terminal',
    color: 'bg-orange-500',
    description: 'Command-line AI coding assistants',
    tools: [
      { name: 'Claude Code', description: 'Anthropic terminal coding tool', pricing: '$20-200/mo', popularity: 'Growing' },
      { name: 'Aider', description: 'CLI AI pair programmer', pricing: 'BYOK', popularity: 'High' },
      { name: 'Goose', description: 'Flexible terminal agent', pricing: 'Open-source', popularity: 'Medium' },
      { name: 'GitHub Copilot CLI', description: 'Terminal Copilot', pricing: 'Included', popularity: 'Medium' }
    ]
  },
  'autonomous': {
    name: 'Autonomous Agents',
    icon: 'Bot',
    color: 'bg-red-500',
    description: 'Full autonomy for complete project execution',
    tools: [
      { name: 'Devin AI', description: 'First AI software engineer', pricing: '$500/mo', popularity: 'High' },
      { name: 'OpenHands (OpenDevin)', description: 'Open-source autonomous agent', pricing: 'Open-source', popularity: 'High' },
      { name: 'Replit Agent', description: 'Autonomous app builder', pricing: 'Included', popularity: 'Very High' },
      { name: 'Devika', description: 'Open-source Devin alternative', pricing: 'Open-source', popularity: 'Medium' },
      { name: 'SWE-Agent', description: 'GitHub issue resolver', pricing: 'Open-source', popularity: 'Medium' },
      { name: 'Smol Developer', description: 'Minimal AI codebase generator', pricing: 'Open-source', popularity: 'Medium' },
      { name: 'GPT Pilot (Pythagora)', description: 'App development via chat', pricing: 'Various', popularity: 'Medium' },
      { name: 'MetaGPT', description: 'Multi-agent framework', pricing: 'Open-source', popularity: 'Research' },
      { name: 'ChatDev', description: 'Multi-agent dev team simulation', pricing: 'Open-source', popularity: 'Research' }
    ]
  },
  'specialized': {
    name: 'Specialized Tools',
    icon: 'Sparkles',
    color: 'bg-pink-500',
    description: 'Focused on specific development tasks',
    tools: [
      { name: 'Qodo (Codium AI)', description: 'Test generation & code review', pricing: 'Free tier', popularity: 'High' },
      { name: 'Sourcery', description: 'Code refactoring & review', pricing: 'Free-$30/mo', popularity: 'Medium' },
      { name: 'CodeRabbit', description: 'AI code reviewer', pricing: 'Free-$15/mo', popularity: 'Growing' },
      { name: 'WhatTheDiff', description: 'PR summary generator', pricing: 'Paid', popularity: 'Medium' },
      { name: 'Mintlify Writer', description: 'Auto documentation', pricing: 'Free tier', popularity: 'Medium' },
      { name: 'Codiga', description: 'Code quality & security', pricing: 'Varies', popularity: 'Medium' },
      { name: 'Grit.io', description: 'Code migration & refactoring', pricing: 'Varies', popularity: 'Medium' },
      { name: 'AIXcoder', description: 'Enterprise AI coding', pricing: 'Enterprise', popularity: 'Medium' },
      { name: 'Mutable AI', description: 'AI-powered refactoring', pricing: 'Various', popularity: 'Medium' },
      { name: 'Bugasura', description: 'AI bug tracking', pricing: 'Free tier', popularity: 'Medium' }
    ]
  },
  'platforms': {
    name: 'Chat & Desktop Apps',
    icon: 'Zap',
    color: 'bg-indigo-500',
    description: 'Conversational AI for coding assistance',
    tools: [
      { name: 'ChatGPT/GPT-4o', description: 'General AI with coding', pricing: '$20/mo', popularity: 'Very High' },
      { name: 'Claude 3.5 Sonnet', description: 'Anthropic AI (top coding)', pricing: '$20-200/mo', popularity: 'Very High' },
      { name: 'Claude Desktop', description: 'Desktop app with MCP', pricing: '$20-200/mo', popularity: 'High' },
      { name: 'Perplexity Pro', description: 'AI search for code help', pricing: '$20/mo', popularity: 'Medium' },
      { name: 'Gemini Advanced', description: 'Google AI assistant', pricing: '$20/mo', popularity: 'High' }
    ]
  },
  'nocode': {
    name: 'No-Code/Low-Code AI',
    icon: 'FileCode',
    color: 'bg-teal-500',
    description: 'Visual development with AI assistance',
    tools: [
      { name: 'Bubble', description: 'No-code with AI generator', pricing: 'Free-$349/mo', popularity: 'Very High' },
      { name: 'ToolJet', description: 'Internal tools builder', pricing: 'Open-source', popularity: 'Growing' },
      { name: 'UI Bakery', description: 'AI internal app builder', pricing: 'Free tier', popularity: 'Medium' },
      { name: 'Magic Patterns', description: 'AI UI generation', pricing: 'Various', popularity: 'New' },
      { name: 'Webflow AI', description: 'Visual web builder with AI', pricing: 'Various', popularity: 'High' }
    ]
  },
  'ml': {
    name: 'ML/Data Science Focused',
    icon: 'Cloud',
    color: 'bg-yellow-500',
    description: 'AI tools for ML and data engineering',
    tools: [
      { name: 'Amazon SageMaker', description: 'ML development platform', pricing: 'Pay-per-use', popularity: 'High' },
      { name: 'Jupyter AI', description: 'AI in Jupyter notebooks', pricing: 'Open-source', popularity: 'Medium' },
      { name: 'DataRobot', description: 'AutoML platform', pricing: 'Enterprise', popularity: 'High' }
    ]
  }
};

async function seed() {
  try {
    const pool = await getConnection();
    
    // Read and execute schema
    const schemaPath = path.join(process.cwd(), 'lib', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await pool.query(schema);
    
    console.log('Schema created successfully');
    
    // Clear existing data
    await pool.query('DELETE FROM tools');
    await pool.query('DELETE FROM categories');
    
    console.log('Existing data cleared');
    
    // Insert categories and tools
    for (const [key, category] of Object.entries(categories)) {
      // Insert category
      await pool.query(
        'INSERT INTO categories (key, name, icon, color, description) VALUES ($1, $2, $3, $4, $5)',
        [key, category.name, category.icon, category.color, category.description]
      );
      
      // Insert tools for this category
      for (const tool of category.tools) {
        await pool.query(
          'INSERT INTO tools (category_key, name, description, pricing, popularity) VALUES ($1, $2, $3, $4, $5)',
          [key, tool.name, tool.description, tool.pricing, tool.popularity]
        );
      }
      
      console.log(`Seeded category: ${category.name} with ${category.tools.length} tools`);
    }
    
    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

if (require.main === module) {
  seed().catch(console.error);
}

export { seed };