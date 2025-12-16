'use client';

import React, { useState, useEffect } from 'react';
import { Code, Globe, Terminal, Laptop, Zap, Cloud, FileCode, Bot, Sparkles } from 'lucide-react';

interface Tool {
  id: number;
  name: string;
  description: string;
  pricing: string;
  popularity: string;
  category_key: string;
}

interface Category {
  key: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  tool_count: number;
  tools: Tool[];
}

const iconMap = {
  Laptop,
  Code,
  Globe,
  Terminal,
  Bot,
  Sparkles,
  Zap,
  FileCode,
  Cloud
};

const AICodeToolsLandscape = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading AI Tools Landscape...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  const filteredCategories = selectedCategory === 'all'
    ? Object.entries(categories)
    : Object.entries(categories).filter(([key]) => key === selectedCategory);

  const totalTools = Object.values(categories).reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            AI Coding Tools Landscape
          </h1>
          <p className="text-xl text-gray-300 mb-2">Comprehensive Industry Overview 2024-2025</p>
          <p className="text-sm text-gray-400">{totalTools}+ Tools Across {Object.keys(categories).length} Categories</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-white text-purple-900 shadow-lg scale-105'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            All Categories
          </button>
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === key
                    ? 'bg-white text-purple-900 shadow-lg scale-105'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              >
                {IconComponent && <IconComponent size={16} />}
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="space-y-8">
          {filteredCategories.map(([key, category]) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <div key={key} className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${category.color} p-3 rounded-xl`}>
                    {IconComponent && <IconComponent size={28} className="text-white" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                  <div className="ml-auto bg-slate-700 px-3 py-1 rounded-full text-sm text-gray-300">
                    {category.tools.length} tools
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-white text-lg">{tool.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          tool.popularity === 'Very High' ? 'bg-green-500/20 text-green-300' :
                          tool.popularity === 'High' ? 'bg-blue-500/20 text-blue-300' :
                          tool.popularity === 'Growing' ? 'bg-yellow-500/20 text-yellow-300' :
                          tool.popularity === 'Medium' ? 'bg-purple-500/20 text-purple-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {tool.popularity}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{tool.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-mono">{tool.pricing}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-blue-400">{Object.keys(categories).length}</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-purple-400">{totalTools}+</div>
            <div className="text-sm text-gray-400">Total Tools</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-pink-400">$0-500</div>
            <div className="text-sm text-gray-400">Price Range/mo</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-green-400">2024-25</div>
            <div className="text-sm text-gray-400">Latest Data</div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Key Industry Insights</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <div className="text-blue-400 mt-1">●</div>
              <p><strong>IDE Revolution:</strong> Cursor ($29.3B valuation) and Windsurf lead AI-first development environments</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="text-purple-400 mt-1">●</div>
              <p><strong>Web Platforms:</strong> Bolt.new, Lovable, and v0 enable rapid prototyping with instant deployment</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="text-green-400 mt-1">●</div>
              <p><strong>Autonomous Agents:</strong> Devin AI and OpenHands push toward fully autonomous development</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="text-orange-400 mt-1">●</div>
              <p><strong>Price Range:</strong> Free open-source to $500/mo enterprise tools serve all segments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICodeToolsLandscape;