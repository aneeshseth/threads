import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors());


const port = 3010



import { ensureDbConnected } from './lib/db';
ensureDbConnected()

import userRoutes from './Routes/userRoutes'
import threadRoutes from './Routes/threadRoutes'

app.use("/", userRoutes)
app.use("/", threadRoutes)


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

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})