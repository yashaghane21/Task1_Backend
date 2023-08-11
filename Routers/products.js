const express =require("express");
const productmodel = require("../Models/Product");
const router = express.Router();


router.post("/create-product",async(req,res)=>{
 try {
    const {name,price,desc,img}=req.body
    const product= new productmodel({name,price,desc,img})
    await product.save();
    return res.status(200).send({
        success:true,
        message:"Product created succesfully"
    })
 } catch (error) {
    console.log(error)
 }
})


router.get("/all-products",async(req,res)=>{
    try {
        const products =await productmodel.find({})
        return res.status(200).send({
            success:true,
            message:"Product fetched succesfully",
            products
        })
    } catch (error) {
        
    }
});


router.get("/product/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const product=await productmodel.findById(id);
        return res.status(200).send({
            success:true,
            message:"Product fetched sucesfully",
            product
        })
    } catch (error) {
        
    }
})


router.put("/uproduct/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const {name,price,desc,img}=req.body
        const updatedProduct = await productmodel.findByIdAndUpdate(
            id,
            { name, price, desc, img },
            { new: true } 
          );
          return res.status(200).send({
            success:true,
            message:"updated succesfully",
            updatedProduct
          })
    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete-product/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const product = await productmodel.findByIdAndDelete(id)
        return res.status(200).send({
            success:true,
            message:"deleted succesfully"
            ,product
        })
    } catch (error) {
        
    }
})
module.exports=router
