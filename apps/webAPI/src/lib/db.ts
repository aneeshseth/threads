let alreadyDone = false;
import mongoose from 'mongoose'

export async function ensureDbConnected() {
    if (alreadyDone) return;
    await mongoose.connect("mongodb+srv://user123:pass2123@cluster0.8dhddrv.mongodb.net/").then(() => {
        console.log("done!")
    })
    alreadyDone = true;
}