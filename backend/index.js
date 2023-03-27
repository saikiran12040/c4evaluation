const express=require("express")
const cors=require('cors')
const {connection}=require("./config/db")
const {authenticator}=require("./middleware/authentication")
const {postRouter}=require("./routes/post");
const {userRouter}=require("./routes/user");


const app=express()
app.use(express.json())
app.use(cors());


app.use("/users",userRouter);
app.use("/posts",authenticator);
app.use("/posts",postRouter);



const PORT=process.env.PORT || 8080
app.listen(PORT,async()=>{
    try{
        await connection
        console.log("Connected to db at port 8080")
    } catch (error) {
        console.log(error.message)
    } 
})

