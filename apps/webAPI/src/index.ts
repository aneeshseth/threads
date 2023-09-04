import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors());
import { WebSocketServer } from 'ws';


const port = 8021;
const wss = new WebSocketServer({ port });
const roomConnections = new Map();

wss.on('connection', (ws) => {
    console.log(`Connected to ${ws}`);
  
    ws.on('message', (message: string) => {
      const data = JSON.parse(message);
      console.log(data)
      try {
          if (data.action) {
              if (data.action === "joinRoom") {
                const { room } = data;
                if (!roomConnections.has(room)) {
                  roomConnections.set(room, new Set());
                }
                roomConnections.get(room).add(ws);
                console.log(`WebSocket joined room: ${room}`);
              } else if (data.action === "sendMessage") {
                  const { room, text } = data;
                  if (roomConnections.has(room)) {
                      const roomClients = roomConnections.get(room);
                      console.log(roomClients)
                      for (const client of roomClients) {
                          console.log('number')
                          client.send(JSON.stringify({user: "aneesh", msg: text}));
                      }
                      console.log(`Message sent to room ${room}: ${JSON.stringify({user: "aneesh", msg: text})}`);
                  } else {
                      console.log(`Room ${room} not found.`);
                  }
                }
            } 
      } catch (error) {
        console.error('Error handling message:', error);
      }
    });
  
    ws.on('close', () => {
      roomConnections.forEach((connections, room) => {
        if (connections.has(ws)) {
          connections.delete(ws);
        }
        if (connections.size === 0) {
          roomConnections.delete(room);
        }
      });
    });
  });





import { ensureDbConnected } from './lib/db';
ensureDbConnected()

import userRoutes from './Routes/userRoutes'
import threadRoutes from './Routes/threadRoutes'
import chatRoutes from './Routes/chatRoutes'

app.use("/", userRoutes)
app.use("/", threadRoutes)
app.use("/", chatRoutes)


import multer from 'multer'
import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const s3 = new S3Client({
    credentials: {
        accessKeyId: "AKIA35VTPTMRCBRBML64",
        secretAccessKey: "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"
    },
    region: "us-east-1"
})



app.post("/api/posts",upload.single('image'), async (req,res) => {
    const params = {
        Bucket: "my-bucket-next",
        Key: req.file?.originalname,
        Body: req.file?.buffer,
        ContentType: req.file?.mimetype
    }
    const command = new PutObjectCommand(params)
    await s3.send(command)
    console.log(command)
    const getObjectParams = {
        Bucket: "my-bucket-next",
        Key: req.file?.originalname,
    }
    const command2 = new GetObjectCommand(getObjectParams)
    console.log(command2)
    const url = await getSignedUrl(s3, command2, {expiresIn: 3700})
    console.log(url)
    return res.status(200).json({image: url})
})

app.listen(3010, () => {
    console.log(`app listening on port 3010`)
})