const express = require("express");

const port= 3001;
const app= express();

app.get("/",(req,res)=>{
    res.send("hello JS");
})




app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
});

