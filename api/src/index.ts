import express from 'express'
import { Request, Response } from 'express'
import https from 'https'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/list', (req: Request, res: Response) => {
  const apiKey = process.env.YOUTUBE_API_KEY
  
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing YOUTUBE_API_KEY in environment variables' })
  }
  
  const playlistId = process.env.PLAYLIST_ID || 'PLcetZ6gSk968DQPgqGfu6GOJ4yEoQAu4h'
  
  const options = {
    hostname: 'www.googleapis.com',
    port: 443,
    path: `/youtube/v3/playlistItems?playlistId=${playlistId}&key=${apiKey}&part=snippet,contentDetails&maxResults=10`,
    method: 'GET'
  }

  const reqHttp = https.request(options, (resp) => {
    let data = ''

    resp.on('data', (chunk) => {
      data += chunk
    })

    resp.on('end', () => {
      res.setHeader('Content-Type', 'application/json')
      res.status(resp.statusCode || 200).send(data)
    })
  })

  reqHttp.on('error', (err) => {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch data from YouTube API' })
  })

  reqHttp.end()
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
