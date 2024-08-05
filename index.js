import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import { postPlant ,getallPlants,getPlantId,updatePlant,deletePlant} from "./controllers/plant.js";
import {health} from "./controllers/health.js"
import { errorNotFound } from "./controllers/errors.js";

const server=express()
server.use(express.json());

const dbConnection= async()=>{
    const conn= await mongoose.connect(process.env.MongoDB_URL)

    if(conn){
        console.log("MongoDB is Connected 📦")
    }else{
        console.log("MongoDB is not connected ❌")
    }

}
dbConnection();

server.get("/health",health)

server.post("/plants",postPlant)

server.get("/plants",getallPlants)

server.get("/plants/:ID",getPlantId)

server.put("/plants/:ID",updatePlant)

server.delete("/plants/:ID",deletePlant)

server.use("*",errorNotFound)

const PORT=process.env.PORT || 5000

server.listen(PORT,()=>{
    console.log(`server is running `)
})