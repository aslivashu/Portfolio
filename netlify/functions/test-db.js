// Example function to test your database connection
import pkg from 'pg';
const { Client } = pkg;

export default async (request, context) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    
    // Test query
    const result = await client.query('SELECT NOW() as current_time');
    
    await client.end();

    return new Response(JSON.stringify({
      success: true,
      message: 'Database connected successfully!',
      timestamp: result.rows[0].current_time
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('Database error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
