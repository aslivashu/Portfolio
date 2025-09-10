// Example Netlify function using Drizzle ORM
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { posts } from '../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async (request, context) => {
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  try {
    // Get all published blog posts
    const allPosts = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.published))
      .limit(10);

    return new Response(JSON.stringify({
      success: true,
      posts: allPosts
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch posts'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
