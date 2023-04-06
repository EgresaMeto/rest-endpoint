import express, { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import { incrementAnalytics } from './services/queries'

interface IPerson {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
  id: number
}

export const app = express()
const port = 3000

const swapi = axios.create({
  baseURL: 'https://swapi.dev/api/',
})

// Search characters by name
app.get('/persons', async (req: Request, res: Response) => {
  const query = req.query.q as string
  try {
    incrementAnalytics('persons_search')
    const response: AxiosResponse<{ results: IPerson[] }> = await swapi.get(
      `people/?search=${query}`
    )

    if (response.data.results.length === 0) {
      res.status(404).send({ message: 'Not Found' })
    } else {
      res.json(response.data.results)
    }
  } catch (error) {
    console.error(error)
    res.status(404).send({ message: 'Not Found' })
  }
})

// Get character by id
app.get('/persons/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    incrementAnalytics('persons_id')
    const response: AxiosResponse<IPerson> = await swapi.get(`people/${id}/`)
    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(404).send({ message: 'Not Found' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
