const signupservice=require('../../services/userSignupService/signupService');

const controller = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        if (!name || !email || !password || !address) {
            return res.status(400).json({
                error: "Please fill all the fields"
            });
        }

        const response = await signupservice({ name, email, password, address });
        return res.status(201).json(response);

    } catch (er) {
        console.log(er)
        return res.status(500).json({
            error: er.message || 'Signup Failed',
        });
    }
};

module.exports = { controller };
