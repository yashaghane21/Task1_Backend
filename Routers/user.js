const express =require("express");
const usermodel = require("../Models/User");
const router = express.Router();


router.get("/userprofile/:id",async(req,res)=>{
    try {
        const {id} =req.params
        const user = await usermodel.findById(id)
        return res.status(200).send({
            success:true,
            message:"fetched succesfully"
            ,user
        })
    } catch (error) {
        
    }
})

router.put("/update-profile/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const {name,email,password,phone}=req.body
        const updatedprofile= await usermodel.findByIdAndUpdate(id,
            {name,email,password,phone},
            { new:true }
            )
            return res.status(200).send({
                success:true,
                message:"updated succefully",
                updatedprofile
            })
    } catch (error) {
        console.log(error)
    }
})

module.exports=router