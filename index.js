const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
const { postRouter } = require("./routes/post.route")
const { auth } = require("./middleware/auth.middle")
require("dotenv").config()


const app = express()
app.use(express.json())

// app.get("/",(req,res)=>{
//     res.status(200).send("")
// })

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log("Not able to connect")
        console.log(err)
    }
    console.log(`server is running on port ${process.env.port}`)
})