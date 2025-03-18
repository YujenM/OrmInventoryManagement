const {Item}=require('../../models');
const getallitems=async()=>{
    const fetchItem= await Item.findAll();
    return fetchItem;
}

module.exports=getallitems;