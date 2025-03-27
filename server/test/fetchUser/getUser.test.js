require('dotenv').config();
const request = require("supertest");
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.BASE_URL;
const filepath = path.join(__dirname, 'authToken.json');

const getAuthToken = () => {
    try {
        if (fs.existsSync(filepath)) {
            const tokenData = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
            if (tokenData.authToken) {
                // console.log("thiss------>"+tokenData.authToken);
                return `Bearer ${tokenData.authToken}`;
            }
        }
    } catch (err) {
        console.log("Error reading auth token:", err);
    }
    return null;
};

describe("Check if fetch data with user and roles", () => {
    test('/fetchuser/getUser fetches user data successfully', async () => {
        const authToken = getAuthToken();
        // console.log("getuser--->"+authToken)
        if (!authToken) {
            console.log("Auth token not found. Run login test first.");
            return;
        }

        console.log("Using Auth Token:", authToken);

        const getUser = await request(baseUrl)
            .get('/fetchuser/getUser')
            .set('Authorization', authToken)
            .send();

        console.log("Response:", getUser.body);

        expect(getUser.status).toBe(200);
    });
});
