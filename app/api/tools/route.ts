import { NextResponse } from 'next/server';
import { getConnection } from '../../../lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const popularity = searchParams.get('popularity');
    
    const pool = await getConnection();
    
    let query = `
      SELECT t.*, c.name as category_name, c.color as category_color
      FROM tools t
      JOIN categories c ON t.category_key = c.key
      WHERE 1=1
    `;
    
    const params: any[] = [];
    let paramCount = 0;
    
    if (category && category !== 'all') {
      paramCount++;
      query += ` AND t.category_key = $${paramCount}`;
      params.push(category);
    }
    
    if (popularity) {
      paramCount++;
      query += ` AND t.popularity = $${paramCount}`;
      params.push(popularity);
    }
    
    query += ' ORDER BY t.name';
    
    const result = await pool.query(query, params);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}