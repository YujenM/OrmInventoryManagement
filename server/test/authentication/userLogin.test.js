require("dotenv").config();
const request = require("supertest");
const { faker } = require("@faker-js/faker");
const baseUrl = process.env.BASE_URL; 
const path=require("path");
const filepath=path.join(__dirname,'authToken.json');
const fs=require('fs');
const saveAuthToken=(token)=>{
    try{
        const  tokendata={
            authToken:token,
            timeStamp:Date.now()
        }
        fs.writeFileSync(filepath,JSON.stringify(tokendata,null,2));
        console.log("Authtoken Saved Succesfully");

    }catch(err){
        console.log(err)
    }
}
const isTokenExpired=(tokenData)=>{
    const tokenage=Date.now()-tokenData.timeStamp;
    const onehour=60*60*1000;
    return tokenage>onehour;
}
describe("Check user authentication with valid email and password", () => {
test("/user/login should authenticate user with proper email and password", async () => {
    const loginResponse = await request(baseUrl)
    .post("/user/login")
    .send({
        email: "maharjanyuzen@gmail.com",
        password: "Iambatman@123",
    });

    expect(loginResponse.status).toBe(200); 
    expect(loginResponse.body).toHaveProperty("token");
    const token=loginResponse.body.token;
    console.log(token);
    if(fs.existsSync(filepath)){
        const existingTokenData=JSON.parse(fs.readFileSync(filepath,'utf-8'));
        if(isTokenExpired(existingTokenData)){
            console.log("Token expired Saving new token");
            saveAuthToken(token);
        }else{
            console.log("Exisiting valid token found");
        }
    }else{
        saveAuthToken(token)
    }
});
});
describe('Check user authentication with invalid email and password',()=>{
    test("/user/login should not authenticate user with invalid email and password",async()=>{
        const loginResponse=await request(baseUrl).post("/user/login").send({
            email:faker.internet.email(),
            password:"Iambatman@123"

        });
        expect(loginResponse.status).toBe(401);
    })
})
describe('Check user authentication with unauthorized acess',()=>{
    test("/user/login should not authorized admin or superadmin email",async()=>{
        const loginresponse=await request(baseUrl).post("/user/login").send({
            email:"wyanebruce@gmail.com",
            password:"Iambatman@123"
        });
        expect(loginresponse.status).toBe(403);
    })
})