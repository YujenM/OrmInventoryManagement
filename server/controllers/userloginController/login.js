const loginService = require('../../services/userLoginservice/login');
const { ValidationError }=require('../../errors');
const jwt = require('jsonwebtoken');

const Logincontroller = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
           throw new ValidationError("Please fill all the fields",400);
        }

        const response = await loginService({ email, password });

        
        
        const token = jwt.sign(
            {
                id: response.id,
                email: email,
            },
            process.env.SECRET,
            { expiresIn: '1h' }
        );


        return res.status(200).json({
            message : 'success',
            user : response,
        token});

    } catch (err) {
        next(err);
    }
};

module.exports = { Logincontroller };
