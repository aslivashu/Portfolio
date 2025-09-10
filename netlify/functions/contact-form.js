import { neon } from '@netlify/neon';

export default async (request, context) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validate required fields
    if (!name || !email || !message) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Connect to database
    const sql = neon(process.env.DATABASE_URL);
    
    // Create contacts table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Insert the contact message
    const result = await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id, created_at
    `;

    console.log('Contact form submission saved:', result[0]);

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      id: result[0].id
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Error saving contact form:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to save message. Please try again.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
