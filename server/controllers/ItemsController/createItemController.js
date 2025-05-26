const createItemService=require('../../services/createItemsServices/index');

const createItemcontroller=async(req,res)=>{
    try{
        const userId=req.decoded.id;
        const{name,description,price,stock}=req.body;
        const image=req.file?.path || undefined;
        console.log("this is cloudinary"+image);
        if(!name||!description||!price||!stock){
            res.status(400).json({
                Error:"Please Fill all the fields"
            });
        }

        const response=await createItemService({name,description,price,stock,userId,image});
        return res.status(200).json({
            success:true,
            response:response
        });
    }catch(err){
        return res.status(500).json({
            Error:err.message
        })
    }
}

module.exports={createItemcontroller};