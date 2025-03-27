require('dotenv').config();
const { faker } = require('@faker-js/faker');
const request = require('supertest');
const path = require('path');
const filepath = path.join(__dirname, '../authentication/authToken.json');
const authtoken = process.env.AUTH_TOKEN;
const baseUrl = process.env.BASE_URL;
const fs =require('fs')


const getAuthToken = () => {
    try {
        if (fs.existsSync(filepath)) {
            const tokenData = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
            if (tokenData.authToken) {
                return `Bearer ${tokenData.authToken}`; 
            }
        }
    } catch (err) {
        console.error("Error reading auth token:", err);
    }
    return null;
};



describe("Check if admin can add products into the database", () => {
    test("Check if /adminCrud/createItem can create item in database and return 200 status", async () => {
        const response = await request(baseUrl)
            .post("/adminCrud/createItem")
            .set('Authorization', `Bearer ${authtoken}`) 
            .send({
                name: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                stock: 10
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
    });
});
describe("Check if only admin can add products to the database, not a user", () => {
    test('Check /adminCrud/createItem only lets admin create product', async () => {
        const token = getAuthToken();

        console.log("Auth Token Being Used:", token); 

        const response = await request(baseUrl)
            .post('/adminCrud/createItem')
            .set('Authorization', `Bearer ${token}`) 
            .send({
                name: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                stock: 10
            });

        console.log("Response Status:", response.status);
        console.log("Response Body:", response.body);

        expect(response.status).toBe(403); 
    });
});


describe("check if user can check all items",()=>{
    test("test /Items/getItems are return items data ",async()=>{
        const response= await request(baseUrl).get('/Items/getItems').set('Authorization', `Bearer ${authtoken}`) .send()
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success",true);
    })
})

describe("check if admin can update its password",()=>{
    test('/adminCrud/updateItem routes update product details',async()=>{
        const response=await request(baseUrl).put('/adminCrud/updateItem/20').set(
            'Authorization', `Bearer ${authtoken}`
        ).send({
            "name": "pen",
            "description": "A pen ",
            "price": 2.99,
            "stock": 10
        })
        expect(response.status).toBe(200);
    });
})

describe('check if admin can delete the products',()=>{
    test('/adminCrud/deleteItem routes can delete the product',async()=>{
        const response =await request(baseUrl).delete("/adminCrud/deleteItem/20").set(
            'Authorization', `Bearer ${authtoken}`
        ).send()
        expect(response.status).toBe(200)
    })
})