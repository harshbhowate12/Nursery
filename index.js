import express from "express";
import dotenv from "dotenv";
dotenv.config();

const server=express()
server.use(express.json());

const plants = [
    {
        "Id": 5,
        "name": "rose",
        "price": 800,
        "image": "https://rukminim2.flixcart.com/image/850/1000/kf0087k0/plant-sapling/9/e/y/floribunda-roses-1-arlo-original-imafvjdjvsgtprse.jpeg?q=90&crop=false",
        "description": "this is a rose plant"
    },
    {
        "Id": 7,
        "name": "bamboo",
        "price": 800,
        "image": "https://rukminim2.flixcart.com/image/850/1000/kf0087k0/plant-sapling/9/e/y/floribunda-roses-1-arlo-original-imafvjdjvsgtprse.jpeg?q=90&crop=false",
        "description": "this is a bamboo plant"
    },
    {
        "Id": 8,
        "name": "sunflower",
        "price": 800,
        "image": "https://rukminim2.flixcart.com/image/850/1000/kf0087k0/plant-sapling/9/e/y/floribunda-roses-1-arlo-original-imafvjdjvsgtprse.jpeg?q=90&crop=false",
        "description": "this is a sunflower plant"
    }
]

server.post("/plants",(req,res)=>{
    const{name,price,image,description}=req.body

    if(!name){
        return res.json({
            success:false,
            data:null,
            message:"name is required..."       
        })
    }
    if(!price){
        return res.json({
            success:false,
            data:null,
            message:"price is required..."       
        })
    }
    if(!image){
        return res.json({
            success:false,
            data:null,
            message:"image is required..."       
        })
    }
    if(!description){
        return res.json({
            success:false,
            data:null,
            message:"description is required..."       
        })
    }
    const randomID=Math.round(Math.random()*10000)

    const newPlant={
        Id:randomID,
        name:name,
        price:price,
        image:image,
        description:description
    }

    plants.push(newPlant);

    res.json({
        success:true,
        data:newPlant,
        message:"new plant successfully created",
    })
})

server.get("/plants",(req,res)=>{
          res.json({
              success:true,
              data:plants,
              message:"this is true"        
      })   
})

server.get("/plants/:ID",(req,res)=>{
    const{ID}=req.params
    
    const plant=plants.find((p)=>p.Id==ID)

    res.json({
        success:plant ? true : false,
        data:plant || null,
        message:plant ? "Plant fetched successfully" : "Plant not found",
    })      
})

server.put("/plants/:ID",(req,res)=>{
    const{ID}=req.params

    let Index=-1;

    plants.forEach((plant,i)=>{
        if(plant.Id==ID){
            Index=i;
        }
    })

    const newUpdatedObj={
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        description:req.body.description
    }
    
    if(Index==-1){
        return res.json({
            success:false,
            message:"Plant not found",
            data:null
        })
    }else{
        plants[Index]=newUpdatedObj;
        return res.json({
            success:true,
            message:"Plant updated successfully",
            data:newUpdatedObj
        })
    }
})

server.delete("/plants/:ID",(req,res)=>{
    const{ID}=req.params

    let Index=-1;

    plants.forEach((plant,i)=>{
        if(plant.Id==ID){
            Index=i;
        }
    })

    if(Index==-1){
        return res.json({
             success:false,
             message:`Plant not found at this index ${Index}`
        })
    }

    plants.splice(Index,1)

    res.json({
        success:true,
        message:"plant deleted successfully"
    })
})

server.use("*",(req,res)=>{
    res.send(
        `<div>
        <h1 style="text-align:center;">404 Not Found</h1>
        </div>`
    )
})

const PORT=process.env.PORT

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})