import express from "express"
import Blog from "../models/Blog.js";
const router=express.Router();

router.get("/",async(req,res)=>{

    try {
        const blogs=await Blog.find({}).sort({createdAt:-1});
    // if(!blogs){
    //     res.json("error in fetching the blogs");
    // }
    res.status(200).json(blogs);
        
    } catch (error) {

        console.log("erro in fetching",error);
        res.status(500).json({message:"internal serve error"})
        
    }
});


router.post("/",async(req,res)=>{
   try {

     const {title,description}=req.body;
    if(!title || !description){
       return res.status(400).json("all fields are required");
    }
    const newBlog=new Blog({title,description});
    await newBlog.save();
    res.status(201).json(newBlog);
    
   } catch (error) {

     console.log("erro in creating",error);
        res.status(500).json({message:"internal serve error"})
    
   }
    // res.status(200).json(blogs);
})

//delete k liye routes hai bhai ye 
router.delete("/:id",async(req,res)=>{
    try {
        const post=await Blog.findByIdAndDelete(req.params.id);
        if(!post){
            return res.status(400).json({message:"blog is not exist"});
        }
        res.json({message:"blog deletd successfully"})
    } catch (error) {

        console.log("error in the deleting of the blogs",error);
        res.status(500).json({message:"internal server error"});
        
    }
})

router.put("/:id",async(req,res)=>{
    try {

       const blog=await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true,});
       if(!blog){
        return res.status(400).json({message:"blog not found"});
       }
       res.json({
        message:"blog updated successfully",
        updatedBlog:blog

       });

    } catch (error) {
        
        console.log("error in the updating of the blogs",error);
        res.status(500).json({message:"internal server error"});

        
    }
})

export default router;

//sab sahi hai just keep in mind use try catch alsway and if me return imp hai


