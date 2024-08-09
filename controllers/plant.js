import Plant from "../models/Plant.js"


const postPlant =async (req,res)=>{
    
    const newPlant=new Plant({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        description:req.body.description
    })

    const savedPlant= await newPlant.save();

    res.json({
        success:true,
        data:savedPlant,
        message:"New plant added successfully ",
    })
}
const getallPlants=async(req,res)=>{
    const allPlants= await Plant.find().sort({createdAt:-1}); 

    res.json({
        success:true,
        data:allPlants,
        message:"this is true"        
})   
}
const getPlantId=async (req,res)=>{
    const{ID}=req.params
    
    const plant=await Plant.findOne({
        _id:ID
    })

    res.json({
        success:plant ? true : false,
        data:plant || null,
        message:plant ? "Plant fetched successfully" : "Plant not found",
    })      
}
const updatePlant=async (req,res)=>{
    const{ID}=req.params

    const updatedResult=await Plant.updateOne({_id:ID},{

        $set:{
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        description:req.body.description
    }
    })

    const updatedPlant= await Plant.findOne({_id:ID})

    res.json({
        success:true,
        message:"Plant updated successfully",
        data:updatedPlant
    })
}
const deletePlant= async(req,res)=>{
    const{ID}=req.params

    const deletePlant=await Plant.deleteOne({_id:ID})

    res.json({
        success:true,
        message:"plant deleted successfully"
    })
}

export {postPlant,getallPlants,getPlantId,updatePlant,deletePlant}