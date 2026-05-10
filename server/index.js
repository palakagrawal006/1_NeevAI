import express from "express"  
import dotenv from "dotenv" 
import connectDB from "./utils/connectDB.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from './routes/user.route.js';
import notesRouter from './routes/generate.route.js';
import pdfRouter from './routes/pdf.route.js';
import creditRouter from './routes/credits.route.js';
import {stripeWebhook} from "./controllers/credits.controller.js"

dotenv.config()


const PORT = process.env.PORT || 5000 
const app = express() 

app.use(cors(
    {origin : process.env.CLIENT_URL, //urls by which request comes -- frontend can only request to server api  else error
        credentials : true , //allow cookies 
        methods : ["GET" , "POST" , "PUT" , "DELETE" , "OPTIONS"] //method allowed

    }
))

app.post("/api/credits/webhook" , 
    express.raw({type: "application/json"}),
    stripeWebhook
)


app.use(express.json())
app.use(cookieParser()) //token in cookie - correctly

app.get("/", (req, res)=>{
    res.json({message: "ExamNotes AI Backend Running "})
})

app.use("/api/auth" , authRouter) 
app.use("/api/user" , userRouter) 
app.use("/api/notes" , notesRouter) 
app.use("/api/pdf" , pdfRouter) 
app.use("/api/credit" , creditRouter) 

app.listen(PORT , ()=>{
    console.log(`Server running in port : ${PORT}`)
    connectDB()
})