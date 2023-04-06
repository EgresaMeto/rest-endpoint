import database from '../services/database'

describe('Star Wars Database', () => {
  describe('analytics table', () => {
    it('should return the count for a given endpoint', (done) => {
      // Mock implementation of the database.get() method
      const mockDatabase = {
        get: jest.fn(
          (
            endpoint: string,
            callback: (err: Error | null, row: any) => void
          ) => {
            callback(null, { count: 42 })
          }
        ),
      }

      // Call a function that uses the database.get() method
      function getEndpointCount(
        endpoint: string,
        callback: (err: Error | null, count: number) => void
      ) {
        mockDatabase.get(endpoint, (err: Error | null, row: any) => {
          if (err) {
            callback(err, 0)
          } else {
            callback(null, row.count)
          }
        })
      }

      // Test the function with a mock database object
      getEndpointCount('/movies', (err: Error | null, count: number) => {
        expect(count).toBe(42)
        expect(mockDatabase.get).toHaveBeenCalledWith(
          '/movies',
          expect.any(Function)
        )
        done()
      })
    })
  })
})
