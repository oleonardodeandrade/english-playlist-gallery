import express from 'express'
import { Request, Response } from 'express'
import https from 'https'
import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config()

const app = express()
const port = 3000

const MONGO_URI = process.env.MONGODB_URI || "";

mongoose.connect(MONGO_URI)
  .then(() => console.warn("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/list', (req: Request, res: Response) => {
  const apiKey = process.env.YOUTUBE_API_KEY
  
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing YOUTUBE_API_KEY in environment variables' })
  }
  
  const playlistId = process.env.PLAYLIST_ID || 'PLcetZ6gSk968DQPgqGfu6GOJ4yEoQAu4h'
  
  const numberOfVideos = process.env.NUMBER_OF_VIDEOS || 10
  
  const options = {
    hostname: 'www.googleapis.com',
    port: 443,
    path: `/youtube/v3/playlistItems?playlistId=${playlistId}&key=${apiKey}&part=snippet,contentDetails&maxResults=${numberOfVideos}`,
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
