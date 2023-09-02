import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors());


const port = 3010



import { ensureDbConnected } from './lib/db';
ensureDbConnected()

import userRoutes from './Routes/userRoutes'

app.use("/", userRoutes)


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})