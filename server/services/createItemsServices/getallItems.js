const {Item}=require('../../models');
const getallitems=async()=>{
    const fetchItem= await Item.findAll({
        attributes:['id','name','description','price','stock']
    });
    return fetchItem;
}

module.exports=getallitems;