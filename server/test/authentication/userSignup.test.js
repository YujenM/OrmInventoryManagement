require('dotenv').config();
const request=require("supertest");
const {faker}=require("@faker-js/faker");
const baseUrl=process.env.BASE_URL

describe("test route to succesfully add data to the database",()=>{
    test("/user/signup should resgister and send status of 200", async()=>{
        const signupResponse=await request(baseUrl)
        .post('/user/signup')
        .send({
            name:faker.person.fullName(),
            email:faker.internet.email(),
            password:faker.internet.password(),
            address:faker.location.state()
        });
        expect(signupResponse.status).toBe(201)
    });
})

describe('check if the user name is already created and avoid entering duplicate values',()=>{
    test('/user/signup should not create duplicate value', async()=>{
        const signupResponse=await request(baseUrl).post('/user/signup').send({
            name:"Yujen Maharjan",
            email:'maharjanyuzen@gmail.com',
            password:"Iambatman@123",
            address:"Pulchowk"
        });
        expect(signupResponse.status).toBe(409)
    });
});


