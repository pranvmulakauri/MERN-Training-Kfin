//postgresql://postgres:QkQxZogyO4upU6bo@db.ifoszpqfwofrhamombdt.supabase.co:5432/postgres
import { Pool } from 'pg'
export const client = new Pool({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.wpvspurgbqohzirfsikd',
  password: 'MVRnlMGwsTToQgy6',
  database: 'postgres',
  max: 1,
  ssl: {
    rejectUnauthorized: false
  }
})

async function run() {
  await client.connect()

  const res = await client.query('SELECT * FROM investor;')
  console.log(res.rows)

 // await client.end()
}

run()