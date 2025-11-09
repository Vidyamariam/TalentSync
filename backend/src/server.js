import express from "express";
import { ENV } from "./lib/env.js";

const app = express(); 

console.log(ENV.DB_URL);
console.log(ENV.PORT);

app.get('/home',(req,res)=> {
    res.status(200).json({msg: "response from api."});
});


app.listen(ENV.PORT, ()=> {
    console.log("server started on port:", ENV.PORT);
});





