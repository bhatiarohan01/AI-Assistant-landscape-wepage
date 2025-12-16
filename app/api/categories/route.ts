import { NextResponse } from 'next/server';
import { getConnection } from '../../../lib/db';

export async function GET() {
  try {
    const pool = await getConnection();
    
    const categoriesResult = await pool.query(`
      SELECT c.*, 
             COUNT(t.id) as tool_count
      FROM categories c
      LEFT JOIN tools t ON c.key = t.category_key
      GROUP BY c.id, c.key, c.name, c.icon, c.color, c.description, c.created_at, c.updated_at
      ORDER BY c.name
    `);
    
    const toolsResult = await pool.query(`
      SELECT * FROM tools ORDER BY name
    `);
    
    // Group tools by category
    const toolsByCategory = toolsResult.rows.reduce((acc, tool) => {
      if (!acc[tool.category_key]) {
        acc[tool.category_key] = [];
      }
      acc[tool.category_key].push(tool);
      return acc;
    }, {} as Record<string, any[]>);
    
    // Combine categories with their tools
    const categoriesWithTools = categoriesResult.rows.reduce((acc, category) => {
      acc[category.key] = {
        ...category,
        tools: toolsByCategory[category.key] || []
      };
      return acc;
    }, {} as Record<string, any>);
    
    return NextResponse.json(categoriesWithTools);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}