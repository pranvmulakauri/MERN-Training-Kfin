//postgresql://postgres:QkQxZogyO4upU6bo@db.ifoszpqfwofrhamombdt.supabase.co:5432/postgres
const { Client } = require('pg')

const client = new Client({
  host: 'aws-0-ap-south-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.ifoszpqfwofrhamombdt',
  password: 'QkQxZogyO4upU6bo',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
})

async function run() {
  await client.connect()

  const res = await client.query('SELECT * FROM profiles;')
  console.log(res.rows)

  await client.end()
}

run()