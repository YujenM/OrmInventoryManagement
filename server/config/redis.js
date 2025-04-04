const Redis=require('redis');
const redisClient =Redis.createClient();
redisClient.on('error',(err)=>{
    console.log(err);
})

redisClient.connect();
module.exports=redisClient;