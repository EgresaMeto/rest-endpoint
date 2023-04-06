import sqlite3 from 'sqlite3'

// Connect to the database file, or create it if it doesn't exist
const database = new sqlite3.Database('starwarss.db')

// Create the persons table if it doesn't exist
database.run(
  `
   CREATE TABLE IF NOT EXISTS analytics (
    endpoint TEXT PRIMARY KEY,
    count INTEGER
  )
`,
  (err: Error | null) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log('Table "analytics" created successfully')
    }
  }
)

// Close the database connection when the Node.js process exits
process.on('exit', () => {
  database.close()
})

export default database
