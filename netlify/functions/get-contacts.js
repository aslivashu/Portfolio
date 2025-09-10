import { neon } from '@neondatabase/serverless';

export default async (request, context) => {
  try {
    // Connect to database
    const sql = neon(process.env.DATABASE_URL);
    
    // Get all contact messages, newest first
    const contacts = await sql`
      SELECT id, name, email, message, created_at
      FROM contacts 
      ORDER BY created_at DESC
    `;

    return new Response(JSON.stringify({
      success: true,
      contacts: contacts,
      total: contacts.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch contacts'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
