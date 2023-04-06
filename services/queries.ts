import database from './database'

function incrementAnalytics(endpoint: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Query the "analytics" table in the database for the count of the given endpoint
    database.get<{ count: number }>(
      `SELECT count FROM analytics WHERE endpoint = ?`,
      [endpoint],
      (error: Error | null, row: { count: number } | null) => {
        if (error) {
          console.error(error)
          reject(error)
        } else {
          if (!row) {
            // If the endpoint does not exist in the "analytics" table, insert a new row with a count of 1
            database.run(
              `INSERT INTO analytics (endpoint, count) VALUES (?, ?)`,
              [endpoint, 1],
              (error: Error | null) => {
                if (error) {
                  console.error(error)
                  reject(error)
                } else {
                  resolve()
                }
              }
            )
          } else {
            // If the endpoint exists in the "analytics" table, update the count by 1
            const count = row.count + 1
            database.run(
              `UPDATE analytics SET count = ? WHERE endpoint = ?`,
              [count, endpoint],
              (error: Error | null) => {
                if (error) {
                  console.error(error)
                  reject(error)
                } else {
                  resolve()
                }
              }
            )
          }
        }
      }
    )
  })
}

export { incrementAnalytics }
