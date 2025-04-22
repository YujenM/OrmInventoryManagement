const express=require('express');
const router=express.Router();

router.get('/googleauth',(req,res)=>{
    res.status(200).json({
        message:"Google Auth contected"
    })
})

module.exports=router;