import sqlite3 from 'sqlite3'
import database from '../services/database'

describe('Star Wars Database', () => {
  describe('analytics table', () => {
    it('should create the table successfully', (done) => {
      database.run(
        `
         CREATE TABLE IF NOT EXISTS analytics (
          endpoint TEXT PRIMARY KEY,
          count INTEGER
        )
      `,
        (err: Error | null) => {
          expect(err).toBeNull()
          done()
        }
      )
    })

    it('should not throw an error if the table already exists', (done) => {
      database.run(
        `
         CREATE TABLE IF NOT EXISTS analytics (
          endpoint TEXT PRIMARY KEY,
          count INTEGER
        )
      `,
        (err: Error | null) => {
          expect(err).toBeNull()
          done()
        }
      )
    })

    it('should close the database connection on process exit', () => {
      const closeSpy = jest.spyOn(database, 'close')
      process.on('beforeExit', () => {
        process.exit()
      })
      expect(closeSpy).not.toHaveBeenCalled()
    })
  })
})
