const {Item}=require('../../models');
const getallitems=async()=>{
    const fetchItem= await Item.findAll({
        attributes:['id','name','description','price','stock','itemImage']
    });
    return fetchItem;
}

module.exports=getallitems;