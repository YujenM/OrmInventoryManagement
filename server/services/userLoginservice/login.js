const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Role } = require('../../models');

const loginService = async (userData) => {
    const existingUser = await User.findOne({
        where: { email: userData.email },
        include: [{
            model: Role,
            through: 'userRole',
            attributes: ['name']
        }]
    });

    if (!existingUser) {
        throw new Error("Invalid Email or Password");
    }

    const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error("Invalid Email or Password");
    }

    const roles = existingUser.Roles.map(role => role.name);
    

    if (!roles.includes("user")) {
        throw new Error("Access denied.Only User is allowed to Log In.");
    }

    const token = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
    );

    const { password, ...userWithoutPassword } = existingUser.toJSON();
    return {
        message: "Login Successful",
        user: {
            ...userWithoutPassword,
            Roles:roles,
        },
        token
    };
};

module.exports = loginService;
