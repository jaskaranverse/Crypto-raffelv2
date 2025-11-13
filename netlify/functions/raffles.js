// Netlify serverless function for raffles
// This uses Netlify's built-in database or can connect to MongoDB

const faunadb = require('faunadb');
const q = faunadb.query;

// You'll need to set FAUNADB_SECRET in Netlify environment variables
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET || 'your-fauna-secret-here'
});

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace('/.netlify/functions/raffles', '');
  const method = event.httpMethod;

  try {
    // GET all raffles
    if (method === 'GET' && path === '') {
      const result = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('raffles'))),
          q.Lambda(x => q.Get(x))
        )
      );
      const raffles = result.data.map(item => ({ id: item.ref.id, ...item.data }));
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(raffles)
      };
    }

    // GET active raffles
    if (method === 'GET' && path === '/active') {
      const result = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('raffles'))),
          q.Lambda(x => q.Get(x))
        )
      );
      const now = Date.now();
      const activeRaffles = result.data
        .map(item => ({ id: item.ref.id, ...item.data }))
        .filter(r => r.endTime > now && r.status === 'active');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(activeRaffles)
      };
    }

    // POST create raffle
    if (method === 'POST' && path === '') {
      const data = JSON.parse(event.body);
      const result = await client.query(
        q.Create(q.Collection('raffles'), { data })
      );
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ id: result.ref.id, ...result.data })
      };
    }

    // GET single raffle
    if (method === 'GET' && path.startsWith('/')) {
      const id = path.substring(1);
      const result = await client.query(
        q.Get(q.Ref(q.Collection('raffles'), id))
      );
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ id: result.ref.id, ...result.data })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};