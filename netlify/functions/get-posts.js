import { neon } from '@netlify/neon';

export default async (request, context) => {
  // Initialize the database connection
  const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL
  
  try {
    // Example: Get all posts
    const posts = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
    
    return new Response(JSON.stringify({
      success: true,
      data: posts
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch data'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
